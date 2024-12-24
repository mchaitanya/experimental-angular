import { MockBuilder, MockRender } from 'ng-mocks';

import { RecipeFilterComponent } from './recipe-filter.component';

describe('RecipeFilterComponent', () => {
  beforeEach(() => MockBuilder(RecipeFilterComponent));

  it('renders', () => {
    const fixture = MockRender(RecipeFilterComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
