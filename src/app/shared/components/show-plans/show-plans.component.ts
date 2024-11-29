import {Component, inject, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ShowPlan} from '../../models/show-plan.model';
import {ShowPlanService} from '../../../core/services/show-plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SubscriptionComponent} from '../subscription/subscription.component';
import {SubscribeService} from '../../../core/services/subscription.service';

@Component({
  selector: 'app-show-plans',
  standalone: true,
  imports: [
    NgForOf,
    SubscriptionComponent,
    NgIf
  ],
  templateUrl: './show-plans.component.html',
  styleUrl: './show-plans.component.css'
})
export class ShowPlansComponent implements OnInit{
  plans: ShowPlan[] = [];
  isPopupVisible: boolean = false;
  selectedPlan!: ShowPlan;
  isSubscribed: boolean = false;

  private snackBar = inject(MatSnackBar);
  private showPlanService = inject(ShowPlanService);
  private subscriptionService = inject(SubscribeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchPlans();
    const authUser = JSON.parse(localStorage.getItem('profpost_auth')||'{}');
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser')||'{}');

    this.checkSubscriptionStatus(authUser.id, selectedUser.userId);
  }
  fetchPlans(): void {
    this.showPlanService.getPlans().subscribe(
      (data) => {
        this.plans = data;
      },
      (error) => {
        this.showSnackBar('Error al cargar los planes');
      }
    )
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  subscribeToPlan(plan: ShowPlan): void {
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    this.selectedPlan = plan;
    this.isPopupVisible = true;
  }

  startPaymentProcess(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/reader/subscription/checkout']);
  }
  checkSubscriptionStatus(userId: number, creatorId: number): void {
    this.subscriptionService.isUserSubscribedToCreator(userId, creatorId).subscribe({
      next: (isSubscribed) => {
        this.isSubscribed = isSubscribed;
        if (!this.isSubscribed) {
          this.fetchPlans();
        } else {
          this.showSnackBar('Ya estás suscrito a este creador');
        }
      },
      error: () => {
        this.showSnackBar('Error al verificar suscripción');
      },
    });
  }
}
