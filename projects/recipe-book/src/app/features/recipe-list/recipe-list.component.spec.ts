import { AsyncPipe } from '@angular/common';
import { ClrSpinner } from '@clr/angular';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { AsyncSubject, of } from 'rxjs';

import { Recipe } from '@recipe-book/core/models';
import { RecipeService } from '@recipe-book/core/services';
import { RecipeListComponent } from './recipe-list.component';

const RECIPE1: Recipe = {
  id: '1',
  title: 'Recipe 1',
  imageUrl: '/resources/recipe1.jpg',
  servings: 2,
  ingredients: ['Ingredient 1'],
  steps: ['Step 1'],
};

const RECIPE2: Recipe = {
  id: '2',
  title: 'Recipe 2',
  imageUrl: '/resources/recipe2.jpg',
  servings: 2,
  ingredients: ['Ingredient 1'],
  steps: ['Step 1'],
};

describe('RecipeListComponent', () => {
  MockInstance.scope(); // Creates a scope to reset customizations after each test

  beforeEach(() => {
    return MockBuilder(RecipeListComponent).mock(RecipeService).keep(AsyncPipe);
  });

  it('renders', () => {
    const fixture = MockRender(RecipeListComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('renders spinner while fetching recipes', () => {
    const recipes$ = new AsyncSubject<Recipe[]>();
    MockInstance(RecipeService, 'getRecipes', () => recipes$.asObservable());
    const fixture = MockRender(RecipeListComponent);
    const spinnerBefore = ngMocks.find(fixture, ClrSpinner, undefined);
    expect(spinnerBefore).withContext('While fetching recipes').toBeDefined();
    recipes$.next([]);
    recipes$.complete();
    fixture.detectChanges();
    const spinnerAfter = ngMocks.find(fixture, ClrSpinner, undefined);
    expect(spinnerAfter).withContext('After fetching recipes').toBeUndefined();
  });

  it('renders a card per recipe', () => {
    MockInstance(RecipeService, 'getRecipes', () => of([RECIPE1, RECIPE2]));
    const fixture = MockRender(RecipeListComponent); // By default, MockRender triggers fixture.detectChanges()
    const cards = ngMocks.findAll(fixture, '.card');
    expect(cards).withContext('Card count').toHaveSize(2);
    expect(ngMocks.formatText(cards[0]))
      .withContext('First recipe')
      .toContain('Recipe 1');
    expect(ngMocks.formatText(cards[1]))
      .withContext('Second recipe')
      .toContain('Recipe 2');
  });

  it('renders message if there arent any recipes', () => {
    MockInstance(RecipeService, 'getRecipes', () => of([]));
    const fixture = MockRender(RecipeListComponent);
    const cards = ngMocks.findAll(fixture, '.card');
    expect(cards).withContext('Card count').toHaveSize(0);
    expect(ngMocks.formatText(fixture))
      .withContext('Empty message')
      .toContain("aren't any recipes");
  });
});
