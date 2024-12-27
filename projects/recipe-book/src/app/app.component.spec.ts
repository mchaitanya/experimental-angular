import { TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockComponent(HomeComponent)],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`has title 'Recipe Book'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Recipe Book');
  });
});
