import { Routes } from '@angular/router';
import { ReaderLayoutComponent } from './reader-layout/reader-layout.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PurchasesComponent } from '../../shared/components/purchases/purchases.component';
import {SearcherComponent} from './searcher/searcher.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {ShowPlansComponent} from '../../shared/components/show-plans/show-plans.component';
import {HomeComponent} from '../home/home.component';
import {OrdersComponent} from './orders/orders.component';

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
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'subscription', component: ShowPlansComponent },
      { path: 'subscription/checkout', component: PurchasesComponent },
      { path: 'donation/checkout', component: PurchasesComponent },
      { path: 'order/:id', component: OrdersComponent },
      { path: 'search', component: SearcherComponent }
    ],
  },
];
