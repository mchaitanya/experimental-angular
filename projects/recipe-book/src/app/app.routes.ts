import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { RecipeAddEditComponent } from './features/recipe-add-edit/recipe-add-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: RecipeAddEditComponent },
];
