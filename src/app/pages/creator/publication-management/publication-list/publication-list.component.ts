import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import {PublicationDetailsResponse} from '../../../../shared/models/publication-details-response.model';
import {PublicationService} from '../../../../core/services/publication.service';

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ApiImgPipe,
  ],
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
})
export class PublicationListComponent implements OnInit{
  publications: PublicationDetailsResponse[] = [];

  private snackBar = inject(MatSnackBar);
  private publicationService = inject(PublicationService);
  private router = inject(Router);

  ngOnInit(): void {
  }

  editPublication(publicationId: number): void {
    this.router.navigate(['/creator/publications/edit', publicationId]);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
