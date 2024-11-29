import {Component, inject, OnInit} from '@angular/core';
import {SubscribeService} from '../../../core/services/subscription.service';
import {PurchaseService} from '../../../core/services/purchase.service';
import {CheckoutService} from '../../../core/services/checkout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionResponse} from '../../models/subscription-response.model';
import {PurchaseResponse} from '../../models/purchase-response.model';
import {environment} from '../../../../environments/environment';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DonationService} from '../../../core/services/donation.service';
import {DonationResponse} from '../../models/donation-response.model';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent implements OnInit{
  private subscriptionService = inject(SubscribeService);
  private donationService = inject(DonationService);
  private purchaseService = inject(PurchaseService);
  private checkoutService = inject(CheckoutService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading: boolean = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderId = params['token'];
      if (orderId) {
        this.captureOrder(orderId);
      } else {
        if (localStorage.getItem('subscriptionData')){
          this.initiateSubscription();
        } else{
          if (localStorage.getItem('donationData')){
            this.initiateDonation();
          }
        }
      }
    });
  }

  private initiateSubscription(): void {
    const subscriptionData = JSON.parse(localStorage.getItem('subscriptionData') || '{}');

    this.subscriptionService.subscribe(subscriptionData).subscribe({
      next: (response: SubscriptionResponse) => {
        localStorage.setItem('subscriptionResponse', JSON.stringify(response));
        this.createPurchase(response.subscriptionId, response.userId, subscriptionData.months);
      },
      error: () => {
        this.loading = false;
        this.showSnackBar('Error en la suscripción');
        this.clearlocalstorage();
      },
    });
  }

  private initiateDonation(): void {
    const donationData = JSON.parse(localStorage.getItem('donationData') || '{}');
    const user = JSON.parse(localStorage.getItem('profpost_auth') || '{}');

    const user_id = user.id;

    this.donationService.createDonation(donationData).subscribe({
      next: (response: DonationResponse) => {
        localStorage.setItem('donationResponse', JSON.stringify(response));
        this.createDonation(response.id, user_id);
      }
    });
  }

  private createPurchase(subscriptionId: number, userId: number, months: number): void {
    this.purchaseService.createPurchase({ user_id: userId, subscription_id: subscriptionId, months:months }).subscribe({
      next: (purchaseResponse: PurchaseResponse) => {
        localStorage.setItem('purchaseResponse', JSON.stringify(purchaseResponse));
        this.createCheckout(purchaseResponse.id);
      },
      error: () => {
        this.loading = false;
        this.showSnackBar('Error al redirigir al crear la compra');
        this.clearlocalstorage();
      },
    });
  }

  private createDonation(donationId: number, userId: number): void {
    this.purchaseService.initiatePurchase({ user_id: userId, donation_id: donationId }).subscribe({
      next: (purchaseResponse: PurchaseResponse) => {
        localStorage.setItem('purchaseResponse', JSON.stringify(purchaseResponse));
        this.createCheckout(purchaseResponse.id);
      },
      error: () => {
        this.loading = false;
        this.showSnackBar('Error al redirigir al crear la compra');
        this.clearlocalstorage();
      },
    });
  }

  private createCheckout(purchaseId: number): void {
    const returnUrl = environment.paypalReturnUrl;
    const cancelUrl = environment.paypalReturnUrl;

    this.checkoutService.createCheckout(purchaseId, returnUrl, cancelUrl).subscribe({
      next: (checkoutResponse) => {
        window.location.href = checkoutResponse.paypalUrl;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showSnackBar('Error al redirigir a PayPal');
        this.clearlocalstorage();
      },
    });
  }

  private captureOrder(orderId: string): void {
    const user = JSON.parse(localStorage.getItem('profpost_auth') || '{}');

    const user_id = user.id;
    this.checkoutService.captureOrder(orderId).subscribe({
      next: (response) => {
        if (response.completed) {
          this.clearlocalstorage();
          this.router.navigate(['/reader/order/' + user_id]);
          this.showSnackBar('Felicidades! Gracias por tu compra <3');
        } else {
          this.router.navigate(['/reader/search']);
          this.clearlocalstorage();
          this.showSnackBar('Lo sentimos, no pudiste terminar la compra');
        }
      },
      error: () => {
        this.router.navigate(['/reader/search']);
        this.showSnackBar('Error al capturar la compra');
        this.showSnackBar('Lo sentimos, no pudiste terminar la compra');
        this.clearlocalstorage();
      }
    })
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  clearlocalstorage(): void {
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('selectedPlan');
    localStorage.removeItem('subscriptionData');
    localStorage.removeItem('purchaseResponse');
    localStorage.removeItem('subscriptionResponse');
  }
}
