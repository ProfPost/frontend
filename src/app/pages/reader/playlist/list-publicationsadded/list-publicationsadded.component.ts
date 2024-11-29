import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationInPlaylist } from '../../../../shared/models/publicationinplaylist.model';
import { PlaylistService } from '../../../../core/services/playlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';

@Component({
  selector: 'app-list-publicationsadded',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardModule, ApiImgPipe],
  templateUrl: './list-publicationsadded.component.html',
  styleUrls: ['./list-publicationsadded.component.css'],
})
export class ListPublicationsaddedComponent implements OnInit {
  playlistId!: number;
  publications: PublicationInPlaylist[] = [];

  private playlistService = inject(PlaylistService);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.playlistId = +params['id'];
      this.loadPublications();
    });
  }

  loadPublications(): void {
    this.playlistService.getPublicationsByPlaylistId(this.playlistId).subscribe(
      (data: PublicationInPlaylist[]) => {
        this.publications = data;
      },
      (error) => {
        this.snackBar.open('Error al cargar las publicaciones', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al cargar las publicaciones:', error);
      }
    );
  }

  removePublication(publicationId: number) {
    this.playlistService
      .removePublicationFromPlaylist(this.playlistId, publicationId)
      .subscribe(
        () => {
          this.publications = this.publications.filter(
            (pub) => pub.id !== publicationId
          );
        },
        (error) => {
          console.error('Error al eliminar la publicación:', error);
        }
      );
  }
}
