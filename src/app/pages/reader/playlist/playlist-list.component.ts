import { Component, OnInit } from '@angular/core';
import { PlaylistResponse } from '../../../shared/models/playlist.response.model';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlists: PlaylistResponse[] = [];

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe({
      next: (data) => {
        this.playlists = data;
      },
      error: (err) => {
        console.error('Error al obtener las playlists:', err);
        this.showSnackBar('Error al cargar las playlists');
      },
    });
  }

  goToCreatePlaylist(): void {
    this.router.navigate(['reader/playlist/create']);
  }

  editPlaylist(playlistId: number): void {
    this.router.navigate([`/reader/playlist/edit/${playlistId}`]);
  }

  deletePlaylist(playlistId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta playlist?')) {
      this.playlistService.deletePlaylist(playlistId).subscribe({
        next: () => {
          this.playlists = this.playlists.filter(
            (playlist) => playlist.id !== playlistId
          );
          this.showSnackBar('Playlist eliminada exitosamente');
        },
        error: (error) => {
          this.showSnackBar('No se pudo eliminar la playlist');
        },
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  goToPublications(playlistId: number): void {
    this.router.navigate(['reader/playlist', playlistId, 'publications']);
  }
}
