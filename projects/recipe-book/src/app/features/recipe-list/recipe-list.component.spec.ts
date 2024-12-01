import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';

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
  let fixture: ComponentFixture<RecipeListComponent>;
  let component: RecipeListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecipeListComponent],
      providers: [
        {
          provide: RecipeService,
          useValue: jasmine.createSpyObj<RecipeService>('RecipeService', {
            getRecipes: scheduled([[RECIPE1, RECIPE2]], asyncScheduler),
          }),
        },
      ],
    });
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(fakeAsync(() => {
    fixture.detectChanges(); // Call ngOnInit()
    tick(); // Flush the observable from getRecipes
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render a card per recipe', () => {
    fixture.detectChanges(); // Update the bindings
    const cardEls = (<HTMLElement>fixture.nativeElement).querySelectorAll(
      '.card'
    );
    expect(cardEls).withContext('Card count').toHaveSize(2);
    expect(cardEls[0].textContent)
      .withContext('First recipe')
      .toContain('Recipe 1');
    expect(cardEls[1].textContent)
      .withContext('Second recipe')
      .toContain('Recipe 2');
  });
});
