import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { RecipeService } from '@recipe-book/core/services';
import { RecipeListComponent } from './recipe-list.component';

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
            getRecipes: of([]),
          }),
        },
      ],
    });
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain div.clr-row', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const divDe: DebugElement = debugEl.query(By.css('div.clr-row'));
    expect(divDe).toBeDefined();
  });
});
