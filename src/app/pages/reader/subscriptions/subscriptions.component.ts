import {Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {Subscription} from 'rxjs';
import {SubscribeService} from '../../../core/services/subscription.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SubscriptionsResponseModel} from '../../../shared/models/subscriptions-response.model';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DatePipe,
    NgIf
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit{
  subscriptions: SubscriptionsResponseModel[] = [];
  displayedColumns: string[] = ['creatorName', 'startDate', 'endDate', 'planName', 'state', 'actions'];
  private subscriptionService = inject(SubscribeService);
  private snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    const userAuth = localStorage.getItem('profpost_auth');
    const parsedAuth = JSON.parse(<string>userAuth);

    const userId = parsedAuth.id;
    this.subscriptionService.getActiveSubscriptions(userId).subscribe({
      next: (data) => {
        this.subscriptions = data;
      },
      error: (error) => {
        this.snackbar.open('Error al cargar las suscripciones', 'Cerrar', { duration: 3000 });
      },
    });
  }

  unsuscribe(subscriptionId: number): void {
    this.subscriptionService.unsuscribe(subscriptionId).subscribe({
      next: () => {
        this.snackbar.open('Te has desuscrito con éxito, los cambios se verán cuando llegues a la fecha de fin', 'Cerrar', { duration: 5000 });
        this.loadSubscriptions();
      },
      error: () => {
        this.snackbar.open('Error al desuscribirse', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
