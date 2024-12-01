import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { Recipe } from '@recipe-book/core/models';
import { RecipeService } from './recipe.service';

const RECIPE: Recipe = {
  id: '1',
  title: 'Recipe',
  imageUrl: '/resources/recipe.jpg',
  servings: 2,
  ingredients: ['Ingredient 1'],
  steps: ['Step 1'],
};

describe('RecipeService', () => {
  let httpTesting: HttpTestingController;
  let recipeService: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    recipeService = TestBed.inject(RecipeService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('#getRecipes should return recipes', async () => {
    const recipes = firstValueFrom(recipeService.getRecipes());
    const req = httpTesting.expectOne(
      '/api/recipes',
      'Request to fetch recipes'
    );
    expect(req.request.method).withContext('Request method').toBe('GET');
    req.flush([RECIPE]);
    await expectAsync(recipes)
      .withContext('Recipes fetched')
      .toBeResolvedTo([RECIPE]);
  });
});
