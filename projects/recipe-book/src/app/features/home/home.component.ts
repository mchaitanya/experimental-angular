import { Component } from '@angular/core';

import { RecipeFilterComponent } from '@recipe-book/features/recipe-filter/recipe-filter.component';
import { RecipeListComponent } from '@recipe-book/features/recipe-list/recipe-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeFilterComponent, RecipeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
