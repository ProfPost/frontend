import {Component, inject, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ShowPlan} from '../../models/show-plan.model';
import {ShowPlanService} from '../../../core/services/show-plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SubscriptionComponent} from '../subscription/subscription.component';

@Component({
  selector: 'app-show-plans',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe,
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

  private snackBar = inject(MatSnackBar);
  private showPlanService = inject(ShowPlanService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchPlans();
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
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');

    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    this.selectedPlan = plan;
    this.isPopupVisible = true;
  }

  handlePopupClosed(): void {
    this.isPopupVisible = false;
  }

  startPaymentProcess(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/reader/subscription/checkout']);
  }
}
