import { Routes } from '@angular/router';

import { CreatorLayoutComponent } from './creator-layout/creator-layout.component';
import PublicationFormComponent from './publication-management/publication-form/publication-form.component';
import { CategoryFormComponent } from './category-management/category-form/category-form.component';
import { CategoryListComponent } from './category-management/category-list/category-list.component';
import {PublicationListComponent} from './publication-management/publication-list/publication-list.component';
import {UserProfileComponent} from '../../shared/components/user-profile/user-profile.component';
import {UpdateProfileComponent} from '../../shared/components/update-profile/update-profile.component';
import {PublicationsCatalogComponent} from '../reader/publications-catalog/publications-catalog.component';
export const creatorroutes: Routes = [
  {
    path: '',
    component: CreatorLayoutComponent,
    children: [

      //{ path: 'profile', component: UserProfileComponent },
      { path: 'profile/update', component: UpdateProfileComponent },

      { path: 'publications-catalog', component: PublicationsCatalogComponent },
      //{ path: 'profile/list', component: PublicationListComponent },

      { path: 'publications/new', component: PublicationFormComponent },
      { path: 'publications/edit/:id', component: PublicationFormComponent },

      { path: 'category/new', component: CategoryFormComponent },
      { path: 'category/edit/:id', component: CategoryFormComponent },
      { path: 'category/list', component: CategoryListComponent },

      { path: 'profile', component: UserProfileComponent,
        children: [
          { path: 'list', component: PublicationListComponent },
        ]
      },


],
  },
];
