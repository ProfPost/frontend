import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserSearchRequest} from '../../shared/models/user-search-request.model';
import {UserSearchResponse} from '../../shared/models/user-search-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private baseURL = `${environment.baseURL}/user/search`;

  private http = inject(HttpClient);

  searchUsers(search: UserSearchRequest): Observable<UserSearchResponse[]> {
    return this.http.get<UserSearchResponse[]>(`${this.baseURL}/${search.search}`);
  }

  getCreatorId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/creator-id`, { params: { userId: userId.toString() } });
  }
}
