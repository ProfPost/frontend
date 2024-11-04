import { Routes } from '@angular/router';
import { ReaderLayoutComponent } from './reader-layout/reader-layout.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PublicationsCatalogComponent } from './publications-catalog/publications-catalog.component';

export const readerroutes: Routes = [
  {
    path: '',
    component: ReaderLayoutComponent,
    children: [
      { path: 'publications-catalog', component: PublicationsCatalogComponent },
      { path: 'playlist', component: PlaylistComponent },
      { path: 'purchases', component: PurchasesComponent },
    ],
  },
];
