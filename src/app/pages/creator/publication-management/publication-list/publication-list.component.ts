import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSearchService } from '../../../../core/services/user-search.service';
import { AuthService } from '../../../../core/services/auth.service';

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
    MatCardContent,
    MatCard,
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
  private userSearchService = inject(UserSearchService);
  private authService = inject(AuthService);
  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(pageIndex: number = 0, pageSize: number = 5): void {
    // Obtiene el ID del usuario actual
    const userId = this.authService.getUser()?.id;

    if (userId) {
      // Obtiene el creatorId correspondiente al userId
      this.userSearchService.getCreatorId(userId).subscribe({
        next: (creatorId) => {
          // Llama al servicio para obtener las publicaciones solo de ese creatorId
          this.publicationService.getPublicationsByCreator(creatorId).subscribe({
            next: (response: PublicationDetailsResponse[]) => {
              // Aplica la paginación en el frontend
              const start = pageIndex * pageSize;
              const end = start + pageSize;

              this.publications = response.slice(start, end);
              this.filteredPublications = this.publications;

              this.totalElements = response.length;
              this.pageSize = pageSize;
              this.pageIndex = pageIndex;

              console.log(this.publications);
            },
            error: () => this.showSnackBar('Error al cargar la lista de publicaciones del creador')
          });
        },
        error: () => this.showSnackBar('Error al obtener el ID del creador')
      });
    }
  }


  editPublication(publicationId: number): void {
    this.router.navigate(['/creator/publications/edit', publicationId]);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPublications(this.pageIndex, this.pageSize);
  }

  deletePublication(publicationId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.publicationService.deletePublication(publicationId).subscribe({
        next: () => {
          this.showSnackBar('Publicación eliminado exitosamente');
          this.loadPublications(this.pageIndex, this.pageSize);
        },
        error: () => this.showSnackBar('Error al eliminar la publicación'),
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
