import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { asyncScheduler, firstValueFrom, scheduled } from 'rxjs';

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
  let service: RecipeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj<HttpClient>('HttpClient', {
            // scheduled creates an async observable that emits an array with one recipe.
            get: scheduled([[RECIPE]], asyncScheduler),
          }),
        },
      ],
    });
    service = TestBed.inject(RecipeService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('#getRecipes should return recipes', async () => {
    const recipes = firstValueFrom(service.getRecipes());
    await expectAsync(recipes)
      .withContext('Recipes fetched')
      .toBeResolvedTo([RECIPE]);
    expect(httpClientSpy.get)
      .withContext('One GET request')
      .toHaveBeenCalledTimes(1);
  });
});
