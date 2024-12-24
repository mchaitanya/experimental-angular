import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';

import { RecipeFilterComponent } from './recipe-filter.component';

describe('RecipeFilterComponent', () => {
  beforeEach(() =>
    MockBuilder(RecipeFilterComponent)
      .keep(ReactiveFormsModule)
      .provide(FormBuilder)
  );

  it('renders', () => {
    const fixture = MockRender(RecipeFilterComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
