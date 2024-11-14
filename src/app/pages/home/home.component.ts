import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../core/services/home.service';
import { ApiImgPipe } from '../../core/pipes/api-img.pipe';
import {PublicationDetailsResponse} from '../../shared/models/publication-details-response.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule, ApiImgPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
