import { Routes } from '@angular/router';
import { ReaderLayoutComponent } from './reader-layout/reader-layout.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';

import { PurchasesComponent } from '../../shared/components/purchases/purchases.component';
import { SearcherComponent } from './searcher/searcher.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ShowPlansComponent } from '../../shared/components/show-plans/show-plans.component';
import { HomeComponent } from '../home/home.component';
import { PlaylistComponent } from './playlist/playlist-list.component';
import { PlaylistFormComponent } from './playlist/playlist-form/playlist-form.component';

export const readerroutes: Routes = [
  {
    path: '',
    component: ReaderLayoutComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'publications-catalog', component: HomeComponent },
      { path: 'playlist', component: PlaylistComponent },
      { path: 'playlist/create', component: PlaylistFormComponent },
      { path: 'playlist/edit/:id', component: PlaylistFormComponent }, 
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'subscription', component: ShowPlansComponent },
      { path: 'subscription/checkout', component: PurchasesComponent },
      { path: 'search', component: SearcherComponent },
    ],
  },
];
