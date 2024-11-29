import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../core/services/home.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { PublicationDetailsResponse } from '../../shared/models/publication-details-response.model';
import { PlaylistResponse } from '../../shared/models/playlist.response.model';
import { ApiImgPipe } from '../../core/pipes/api-img.pipe';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ApiImgPipe,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  recentPublications: PublicationDetailsResponse[] = [];
  filteredPublications: PublicationDetailsResponse[] = [];
  searchQuery: string = '';

  playlists: PlaylistResponse[] = [];
  selectedPlaylistId!: number;

  private snackBar = inject(MatSnackBar);
  private publicationService = inject(HomeService);
  private playlistService = inject(PlaylistService);

  ngOnInit(): void {
    this.publicationService.getRecentPublications().subscribe({
      next: (publications) => {
        this.recentPublications = publications;
        this.filteredPublications = publications;
      },
      error: (error) =>
        console.error('Error al cargar las publicaciones recientes', error),
    });

    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
      },
      error: (error) => {
        console.error('Error al cargar las playlists', error);
      },
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPublications = this.recentPublications.filter(
      (publication) =>
        publication.title.toLowerCase().includes(query) ||
        publication.creatorname.toLowerCase().includes(query)
    );
  }

  addPublicationToPlaylist(publicationId: number, playlistId: number): void {
    if (playlistId) {
      this.playlistService
        .addPublicationToPlaylist(playlistId, publicationId)
        .subscribe(
          (response) => {
            console.log('Publicación agregada a la playlist', response);
            this.snackBar.open('Publicación agregada a la playlist', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (error) => {
            console.error(
              'Error al agregar la publicación a la playlist',
              error
            );
            this.snackBar.open('Error al agregar la publicación', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
    } else {
      console.error('Por favor selecciona una playlist');
      this.snackBar.open('Por favor selecciona una playlist', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
