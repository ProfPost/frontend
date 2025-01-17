import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PlaylistResponse } from '../../shared/models/playlist.response.model';
import { PlaylistRequest } from '../../shared/models/playlistrequest.model';
import { PublicationInPlaylist } from '../../shared/models/publicationinplaylist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private baseURL = `${environment.baseURL}/playlist`;
  private http = inject(HttpClient);

  constructor() {}

  getAllPlaylists(): Observable<PlaylistResponse[]> {
    return this.http.get<PlaylistResponse[]>(`${this.baseURL}/my-playlists`);
  }

  getPlaylistById(id: number): Observable<PlaylistResponse> {
    return this.http.get<PlaylistResponse>(`${this.baseURL}/${id}`);
  }

  createPlaylist(playlist: PlaylistRequest): Observable<PlaylistResponse> {
    return this.http.post<PlaylistResponse>(this.baseURL, playlist);
  }

  updatePlaylist(
    id: number,
    playlist: PlaylistRequest
  ): Observable<PlaylistResponse> {
    return this.http.put<PlaylistResponse>(`${this.baseURL}/${id}`, playlist);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

  getPublicationsByPlaylistId(
    playlistId: number
  ): Observable<PublicationInPlaylist[]> {
    return this.http.get<PublicationInPlaylist[]>(
      `${this.baseURL}/${playlistId}/publications`
    );
  }

  addPublicationToPlaylist(
    playlistId: number,
    publicationId: number
  ): Observable<any> {
    return this.http.post(
      `${this.baseURL}/add/publication?playlistId=${playlistId}&publicationId=${publicationId}`,
      {}
    );
  }

  removePublicationFromPlaylist(
    playlistId: number,
    publicationId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseURL}/${playlistId}/publications/${publicationId}`
    );
  }
}
