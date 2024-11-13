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
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';

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
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardActions,
  ],
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
})

export class PublicationListComponent implements OnInit{
  publications: PublicationDetailsResponse[] = [];
  filteredPublications: PublicationDetailsResponse[] = [];
  filterText = '';

  displayedColumns: string[] = [
    'creatorname',
    'title',
    'content',
    'video_url',
    'actions',
  ];

  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  private snackBar = inject(MatSnackBar);
  private publicationService = inject(PublicationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(pageIndex: number = 0, pageSize: number = 5): void {
    this.publicationService.getPublicationDetails().subscribe({
      next: (response: PublicationDetailsResponse[]) => {
        // Paginación en el frontend
        const start = pageIndex * pageSize;
        const end = start + pageSize;

        this.publications = response.slice(start, end);
        this.filteredPublications = this.publications;

        this.totalElements = response.length;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;

        console.log(this.publications);
      },
      error: () => this.showSnackBar('Error al cargar la lista de libros'),
    });
  }

  editPublication(publicationId: number): void {
    this.router.navigate(['/creator/publications/edit', publicationId]);
  }

  deletePublication(publicationId: number): void {
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
