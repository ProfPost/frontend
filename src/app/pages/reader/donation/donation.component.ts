import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DecimalPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DonationService} from '../../../core/services/donation.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    NgIf
  ],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent implements OnInit {
  userName: string = '';
  userId: number = 0;
  creatorId: number = 0;
  donationAmount: number = 1;  // Amount entered by the user
  isPopupVisible: boolean = false;
  totalPrice: number | undefined;
  isConfirmationPopupVisible: boolean = false;

  @Output() popupClosed = new EventEmitter<void>();
  @Output() redirect = new EventEmitter<void>();

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');
    const authUser = JSON.parse(localStorage.getItem('profpost_auth') || '{}');

    this.creatorId = selectedUser.userId;
    this.userName = selectedUser.userName;
    this.userId = authUser.id;
  }

  openPopup(): void {
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    localStorage.removeItem('selectedPlan');
    this.popupClosed.emit();
  }

  // Handle donation process
  processDonation(): void {
    this.isPopupVisible = false;
    this.isConfirmationPopupVisible = true;

    const donationData = {
      creatorId: this.creatorId,
      amount: this.donationAmount,
    };

    localStorage.setItem('donationData', JSON.stringify(donationData));
  }

  calculateTotalPrice(): void {
    this.totalPrice;
    if (this.donationAmount < 1) {
      this.showSnackBar('Ingresa un monto válido para la donación');
      return;
    }
  }

  goToPayPal(): void {
    this.redirect.emit();
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
