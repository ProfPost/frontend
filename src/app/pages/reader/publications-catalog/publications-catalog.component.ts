import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { PublicationDetailsResponse } from '../../../shared/models/publication-details-response.model';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-publications-catalog',
  standalone: true,
  imports: [    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule, ApiImgPipe],
  templateUrl: './publications-catalog.component.html',
  styleUrl: './publications-catalog.component.css'
})
export class PublicationsCatalogComponent {
  recentPublications: PublicationDetailsResponse[] = [];
  filteredPublications: PublicationDetailsResponse[] = [];
  searchQuery: string = '';

  private publicationService = inject(HomeService);

  ngOnInit(): void {
    this.publicationService.getRecentPublications().subscribe({
      next: (publications) => {
        this.recentPublications = publications;
        this.filteredPublications = publications;
      },
      error: (error) =>
        console.error('Error al cargar las publciaciones recientes', error),
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPublications = this.recentPublications.filter(
      (publications) =>
        publications.title.toLowerCase().includes(query) ||
        publications.creatorname.toLowerCase().includes(query)
    );
  }
}
