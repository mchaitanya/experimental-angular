import { AsyncPipe } from '@angular/common';
import { ClrSpinner } from '@clr/angular';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';
import { AsyncSubject, EMPTY, of } from 'rxjs';

import { EMPTY_FILTER, Recipe, RecipeBuilder } from '@recipe-book/core/models';
import { RecipeService } from '@recipe-book/core/services';
import { RecipeCardComponent } from '@recipe-book/features/recipe-card/recipe-card.component';
import { RecipeListComponent } from './recipe-list.component';

describe('RecipeListComponent', () => {
  MockInstance.scope(); // Creates a scope to reset customizations after each test

  beforeEach(() =>
    MockBuilder(RecipeListComponent)
      .mock(RecipeService, {
        getRecipes: () => EMPTY,
        recipeFilter$: of(EMPTY_FILTER),
      })
      .keep(AsyncPipe)
  );

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
    MockInstance(RecipeService, 'getRecipes', () =>
      of([
        new RecipeBuilder().withTitle('Recipe 1').build(),
        new RecipeBuilder().withTitle('Recipe 2').build(),
      ])
    );
    const fixture = MockRender(RecipeListComponent); // By default, MockRender triggers fixture.detectChanges()
    const recipeCards = ngMocks.findInstances(fixture, RecipeCardComponent);
    expect(recipeCards).withContext('Card count').toHaveSize(2);
    expect(recipeCards[0].recipe.title)
      .withContext('First recipe')
      .toBe('Recipe 1');
    expect(recipeCards[1].recipe.title)
      .withContext('Second recipe')
      .toBe('Recipe 2');
  });

  it('renders message if there arent any recipes', () => {
    MockInstance(RecipeService, 'getRecipes', () => of([]));
    const fixture = MockRender(RecipeListComponent);
    const recipeCards = ngMocks.findInstances(fixture, RecipeCardComponent);
    expect(recipeCards).withContext('Card count').toHaveSize(0);
    expect(ngMocks.formatText(fixture))
      .withContext('Empty message')
      .toContain("aren't any recipes");
  });

  it('filters recipes', () => {
    MockInstance(RecipeService, () => ({
      getRecipes: () =>
        of([
          new RecipeBuilder().withTitle('Xyz keyword').build(),
          new RecipeBuilder().withTitle('Something else').build(),
        ]),
      recipeFilter$: of({ keyword: 'keyword', maxPrepTime: null }),
    }));
    const fixture = MockRender(RecipeListComponent); // By default, MockRender triggers fixture.detectChanges()
    const recipeCards = ngMocks.findInstances(fixture, RecipeCardComponent);
    expect(recipeCards).withContext('Card count').toHaveSize(1);
    expect(recipeCards[0].recipe.title)
      .withContext('Filtered recipe')
      .toBe('Xyz keyword');
  });
});
