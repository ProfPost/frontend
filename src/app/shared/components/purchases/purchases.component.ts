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
  private purchaseService = inject(PurchaseService);
  private checkoutService = inject(CheckoutService);
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
        this.initiateSubscription();
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
        alert('Error en la suscripción')
        this.clearlocalstorage();
      },
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
        alert('Error al crear la compra');
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
        alert('Error al redirigir a PayPal');
        this.clearlocalstorage();
      },
    });
  }

  private captureOrder(orderId: string): void {
    this.checkoutService.captureOrder(orderId).subscribe({
      next: (response) => {
        if (response.completed) {
          this.clearlocalstorage();
          this.router.navigate(['/reader/subscriptions']);
          this.showSnackBar('Felicidades! Estás suscrito');
        } else {
          this.router.navigate(['/reader/search']);
          this.clearlocalstorage();
          this.showSnackBar('Lo sentimos, no pudiste suscribirte :c');
        }
      },
      error: () => {
        this.router.navigate(['/reader/search']);
        alert('Error al capturar el pedido')
        this.showSnackBar('Lo sentimos, no pudiste suscribirte :c');
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
