import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '@recipe-book/core/models';
import { RecipeService } from '@recipe-book/core/services';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
