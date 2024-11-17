import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '../../shared/models/user-profile.model';
import {PublicationDetailsResponse} from '../../shared/models/publication-details-response.model';
import {PublicationCreateRequest} from '../../shared/models/publication-create-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private baseURL = `${environment.baseURL}/publications`;
  private http = inject(HttpClient);

  createPublication(publication: PublicationCreateRequest): Observable<PublicationDetailsResponse> {
    return this.http.post<PublicationDetailsResponse>(`${this.baseURL}/creators`, publication);
  }

  getPublicationDetailsById(id: number): Observable<PublicationDetailsResponse> {
    return this.http.get<PublicationDetailsResponse>(`${this.baseURL}/${id}`);
  }

  updatePublication(id: number, publication: PublicationCreateRequest): Observable<PublicationDetailsResponse> {
    return this.http.put<PublicationDetailsResponse>(`${this.baseURL}/creators/${id}`, publication);
  }
}
