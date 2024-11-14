import { Routes } from '@angular/router';
import { ReaderLayoutComponent } from './reader-layout/reader-layout.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PublicationsCatalogComponent } from './publications-catalog/publications-catalog.component';

export const readerroutes: Routes = [
  {
    path: '',
    component: ReaderLayoutComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'publications-catalog', component: PublicationsCatalogComponent },
      { path: 'playlist', component: PlaylistComponent },
      { path: 'purchases', component: PurchasesComponent },
    ],
  },
];
