import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserSearchRequest} from '../../shared/models/user-search-request.models';
import {UserSearchResponse} from '../../shared/models/user-search-response.models';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private baseURL = `${environment.baseURL}/user/search`;

  private http = inject(HttpClient);

  searchUsers(search: UserSearchRequest): Observable<UserSearchResponse[]> {
    return this.http.get<UserSearchResponse[]>(`${this.baseURL}/${search.search}`);
  }
}
