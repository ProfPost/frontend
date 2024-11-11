import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShowPlan} from '../../models/show-plan.model';
import {SubscribeService} from '../../../core/services/subscription.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{
  private snackBar = inject(MatSnackBar);
  private subscriptionService = inject(SubscribeService);

  userName: string = '';
  userId: number = 0;
  creatorId: number = 0;
  planName: string = '';
  planPrice: number = 0;
  planId: number = 0;
  selectedMonths: number = 1;
  totalPrice: number = 0;

  @Output() popupClosed = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadSubscriptionData();
    this.calculateTotalPrice();
  }

  loadSubscriptionData(): void {
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}') as ShowPlan;
    const authUser = JSON.parse(localStorage.getItem('profpost_auth') || '{}');

    this.creatorId = selectedUser.userId;
    this.userName = selectedUser.userName;
    this.userId = authUser.id;
    this.planName = selectedPlan.name;
    this.planId = selectedPlan.id;
    this.planPrice = selectedPlan.price;

    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.selectedMonths * this.planPrice;
  }

  confirmSubscription(): void {
    const subscriptionData = {
      user_id: this.userId,
      creator_id: this.creatorId,
      plan_id: this.planId,
      months: this.selectedMonths,
    };

    this.subscriptionService.subscribe(subscriptionData).subscribe({
      next: () => {
        this.snackBar.open('¡Suscripción completada!', 'Cerrar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error al suscribirse', 'Cerrar', { duration: 3000 });
      },
    });
  }
  closePopup(): void {
    this.popupClosed.emit();
  }
}
