import {Component, inject, OnInit} from '@angular/core';
import {DonationService} from '../../../core/services/donation.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent implements OnInit {
  donors: any[] = []; // Array para almacenar la lista de donantes
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string | null = null; // Mensaje de error en caso de fallo

  private donationService = inject(DonationService);

  ngOnInit(): void {
    this.loadDonors();
  }

  loadDonors(): void {
    // Obtener el ID del usuario desde el localStorage
    const userId = JSON.parse(localStorage.getItem('profpost_auth') || '{}').id;

    if (userId) {
      this.donationService.getDonationAmount(userId).subscribe(
        (data) => {
          this.donors = data; // Asignar los datos de los donantes a la variable
          this.isLoading = false; // Cambiar el indicador de carga
        },
        (error) => {
          this.errorMessage = 'Error al cargar los donantes'; // Mostrar mensaje de error
          this.isLoading = false; // Cambiar el indicador de carga
        }
      );
    }
  }
}
