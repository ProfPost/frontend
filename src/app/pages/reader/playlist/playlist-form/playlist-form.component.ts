import { Component, inject, OnInit } from '@angular/core';
import { PlaylistRequest } from '../../../../shared/models/playlistrequest.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../../../core/services/playlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';  // Inyectar ActivatedRoute para obtener parámetros

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css'],
})
export class PlaylistFormComponent implements OnInit {
  playlist: PlaylistRequest = {
    name: '',
  };
  playlistId: number | null = null;  // ID de la playlist, si estamos editando

  private playlistService = inject(PlaylistService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);  // Inyectamos ActivatedRoute para obtener los parámetros de la URL

  constructor() {}

  ngOnInit(): void {
    // Verificar si hay un parámetro 'id' en la URL
    this.activatedRoute.params.subscribe((params) => {
      this.playlistId = params['id'];  // Asignar el ID de la playlist si está presente
      if (this.playlistId) {
        this.loadPlaylist();
      }
    });
  }

  loadPlaylist(): void {
    // Si tenemos un ID, cargar los datos de la playlist para editarla
    if (this.playlistId) {
      this.playlistService.getPlaylistById(this.playlistId).subscribe({
        next: (data) => {
          this.playlist.name = data.name;
        },
        error: (err) => {
          console.error('Error al cargar la playlist:', err);
          this.showSnackBar('Error al cargar la playlist');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.playlist.name) {
      if (this.playlistId) {
        // Si tenemos un ID, se actualiza la playlist
        this.playlistService.updatePlaylist(this.playlistId, this.playlist).subscribe({
          next: (response) => {
            this.showSnackBar('Playlist actualizada exitosamente');
            this.router.navigate(['/reader/playlist']);
          },
          error: (error) => {
            console.error('Error al actualizar la playlist:', error);
            this.showSnackBar('No se pudo actualizar la playlist. Intenta de nuevo.');
          },
        });
      } else {
        // Si no tenemos un ID, se crea una nueva playlist
        this.playlistService.createPlaylist(this.playlist).subscribe({
          next: (response) => {
            this.showSnackBar('Playlist creada exitosamente');
            this.router.navigate(['/reader/playlist']);
          },
          error: (error) => {
            console.error('Error al crear la playlist:', error);
            this.showSnackBar('No se pudo crear la playlist. Intenta de nuevo.');
          },
        });
      }
    } else {
      this.showSnackBar('El nombre de la playlist es obligatorio');
    }
  }

  cancel(): void {
    this.router.navigate(['/reader/playlist']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
