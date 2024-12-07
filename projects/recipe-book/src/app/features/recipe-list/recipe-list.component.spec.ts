import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsyncSubject, Subject } from 'rxjs';

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
  let recipe$: Subject<Recipe[]>;

  beforeEach(() => {
    recipe$ = new AsyncSubject<Recipe[]>();
    TestBed.configureTestingModule({
      imports: [RecipeListComponent],
      providers: [
        {
          provide: RecipeService,
          useValue: jasmine.createSpyObj<RecipeService>('RecipeService', {
            getRecipes: recipe$.asObservable(),
          }),
        },
      ],
    });
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Call ngOnInit()
  });

  // beforeEach(fakeAsync(() => {
  //   fixture.detectChanges(); // Call ngOnInit()
  //   tick(); // Flush the observable from getRecipes if it emits asychronously
  // }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render a card per recipe', () => {
    recipe$.next([RECIPE1, RECIPE2]);
    recipe$.complete();
    fixture.detectChanges(); // Update the bindings
    const cardDes = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardDes).withContext('Card count').toHaveSize(2);
    expect(cardDes[0].nativeElement.textContent)
      .withContext('First recipe')
      .toContain('Recipe 1');
    expect(cardDes[1].nativeElement.textContent)
      .withContext('Second recipe')
      .toContain('Recipe 2');
  });

  it('should render message if there arent any recipes', () => {
    recipe$.next([]);
    recipe$.complete();
    fixture.detectChanges();
    const cardDes = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardDes).withContext('Card count').toHaveSize(0);
    expect((<HTMLElement>fixture.nativeElement).textContent)
      .withContext('Empty message')
      .toContain("aren't any recipes");
  });
});
