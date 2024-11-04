import { Routes } from '@angular/router';
import { ReaderLayoutComponent } from './reader-layout/reader-layout.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';

export const readerroutes: Routes = [
  {
    path: '',
    component: ReaderLayoutComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },
    ],
  },
];
