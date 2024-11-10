import { Component } from '@angular/core';
import {UserSearchResponse} from '../../../shared/models/user-search-response.models';
import {UserSearchService} from '../../../core/services/user-search.service';
import {UserSearchRequest} from '../../../shared/models/user-search-request.models';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css'
})
export class SearcherComponent {
  search: string = '';
  results: UserSearchResponse[] = [];

  constructor(private userSearchService: UserSearchService, private router: Router) {}

  onSearch() {
    if (this.search.trim()){
      const request: UserSearchRequest = { search: this.search };
      this.userSearchService.searchUsers(request).subscribe(
        (data: UserSearchResponse[]) => {
          this.results = data;
        },
        (error) => {
          console.log(error);
          this.results = [];
        }
      );
    } else {
      this.results = [];
    }
  }
  viewUserProfile(userId: number): void {
    this.router.navigate(['/user/profile', userId]);
  }
}
