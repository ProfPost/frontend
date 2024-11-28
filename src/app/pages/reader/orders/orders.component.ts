import {Component, inject, OnInit} from '@angular/core';
import {HistoryOrderModel} from '../../../shared/models/history-order.model';
import {PurchaseService} from '../../../core/services/purchase.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    CurrencyPipe,
    DatePipe,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  history: HistoryOrderModel[] = [];
  displayedColumns: string[] = ['id', 'total', 'paymentStatus', 'createdAt', 'subscriptionId', 'donationId'];

  private purchaseService = inject(PurchaseService);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const authData = this.authService.getUser();
    const id = authData?.id;
    this.loadHistoryOrders(id);
  }

  loadHistoryOrders(id: number | undefined): void {
    this.purchaseService.getPurchaseHistoryByUserId(id).subscribe(
      (data: HistoryOrderModel[]) => {
        this.history = data;
      },
      (error) => {
        this.showSnackBar("Error al mostrar el historial")
      })
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
