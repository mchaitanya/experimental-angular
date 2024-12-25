import { MockBuilder, MockRender } from 'ng-mocks';

import { RecipeBuilder } from '@recipe-book/core/models';
import { RecipeCardComponent } from './recipe-card.component';

describe('RecipeCardComponent', () => {
  beforeEach(() => MockBuilder(RecipeCardComponent));

  it('renders', () => {
    const fixture = MockRender(RecipeCardComponent, {
      recipe: new RecipeBuilder().build(),
    });
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
