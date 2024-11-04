import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '../../shared/models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseURL = `${environment.baseURL}/user/profile`;

  private http = inject(HttpClient);

  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseURL}/${userId}`).pipe(
      tap((data) => console.log('Datos recibidos del backend:', data)) // Para verificar que llegan los datos
    );
  }

  updateUserProfile(
    userId: number,
    profileData: UserProfile
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseURL}/${userId}`, profileData);
  }
}
