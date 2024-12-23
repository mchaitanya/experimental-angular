import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { RecipeBuilder } from '@recipe-book/core/models';
import { RecipeService } from './recipe.service';

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

  describe('#getRecipes', () => {
    it('fetches recipes', async () => {
      const RECIPE = new RecipeBuilder().build();
      const recipes = firstValueFrom(recipeService.getRecipes());
      const req = httpTesting.expectOne(
        {
          method: 'GET',
          url: '/api/recipes',
        },
        'GET request for recipes'
      );
      req.flush([RECIPE]);
      await expectAsync(recipes)
        .withContext('Recipes fetched')
        .toBeResolvedTo([RECIPE]);
    });

    it('falls back to empty array on error', async () => {
      const recipes = firstValueFrom(recipeService.getRecipes());
      const req = httpTesting.expectOne({
        method: 'GET',
        url: '/api/recipes',
      });
      req.flush('Error occurred', {
        status: 500,
        statusText: 'Internal Server Error',
      });
      await expectAsync(recipes)
        .withContext('Fallback for recipes')
        .toBeResolvedTo([]);
    });
  });
});
