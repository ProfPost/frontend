import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PublicationDetailsResponse} from '../../shared/models/publication-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseURL = `${environment.baseURL}/publications`;

constructor(private http: HttpClient) { }

getRecentPublications(): Observable<PublicationDetailsResponse[]> {
  return this.http.get<PublicationDetailsResponse[]>(`${this.baseURL}/recent`)
}

}
