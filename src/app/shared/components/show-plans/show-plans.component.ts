import {Component, inject, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf} from '@angular/common';
import {ShowPlan} from '../../models/show-plan.model';
import {ShowPlanService} from '../../../core/services/show-plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-plans',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './show-plans.component.html',
  styleUrl: './show-plans.component.css'
})
export class ShowPlansComponent implements OnInit{
  plans: ShowPlan[] = [];

  private snackBar = inject(MatSnackBar);
  private showPlanService = inject(ShowPlanService);

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
  subscribeToPlan(planId: number): void {
    this.showSnackBar('Funciona!');
  }
}
