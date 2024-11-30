import { Routes } from '@angular/router';

import { CreatorLayoutComponent } from './creator-layout/creator-layout.component';
import PublicationFormComponent from './publication-management/publication-form/publication-form.component';
import { CategoryFormComponent } from './category-management/category-form/category-form.component';
import { CategoryListComponent } from './category-management/category-list/category-list.component';
import {DonationComponent} from './donation/donation.component';
import { PublicationListComponent } from './publication-management/publication-list/publication-list.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { HomeComponent } from '../home/home.component';
import { SearcherComponent } from '../reader/searcher/searcher.component';
import { PlaylistComponent } from '../reader/playlist/playlist-list.component';
import {PlaylistFormComponent} from '../reader/playlist/playlist-form/playlist-form.component';
import {
  ListPublicationsaddedComponent
} from '../reader/playlist/list-publicationsadded/list-publicationsadded.component';

export const creatorroutes: Routes = [
  {
    path: '',
    component: CreatorLayoutComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },
      { path: 'publications-catalog', component: HomeComponent },
      { path: 'publications/new', component: PublicationFormComponent },
      { path: 'publications/list', component: PublicationListComponent },
      { path: 'playlist', component: PlaylistComponent },
      { path: 'playlist/create', component: PlaylistFormComponent },
      { path: 'playlist/edit/:id', component: PlaylistFormComponent },
      { path: 'playlist/:id/publications', component: ListPublicationsaddedComponent },
      { path: 'donations', component: DonationComponent },
      { path: 'publications/edit/:id', component: PublicationFormComponent },
      { path: 'category/new', component: CategoryFormComponent },
      { path: 'category/edit/:id', component: CategoryFormComponent },
      { path: 'category/list', component: CategoryListComponent },
      { path: 'search', component: SearcherComponent },

      {
        path: 'profile',
        component: UserProfileComponent,
        children: [{ path: 'list', component: PublicationListComponent }],
      },
    ],
  },
];
