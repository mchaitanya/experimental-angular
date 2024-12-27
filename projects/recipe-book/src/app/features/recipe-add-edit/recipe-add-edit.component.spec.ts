import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';

import { RecipeAddEditComponent } from './recipe-add-edit.component';

describe('RecipeAddEditComponent', () => {
  beforeEach(() =>
    MockBuilder(RecipeAddEditComponent)
      .keep(ReactiveFormsModule)
      .provide(FormBuilder)
  );

  it('renders', () => {
    const fixture = MockRender(RecipeAddEditComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
