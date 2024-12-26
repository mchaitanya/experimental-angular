import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

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

  it('renders image', () => {
    const fixture = MockRender(RecipeCardComponent, {
      recipe: new RecipeBuilder()
        .withTitle('Some recipe')
        .withImageUrl('/some-recipe.jpg')
        .build(),
    });
    const img = ngMocks.find(fixture, 'img');
    expect(img.properties['src'])
      .withContext('Image source')
      .toBe('/some-recipe.jpg');
    expect(img.properties['alt'])
      .withContext('Image alt text')
      .toBe('Some recipe');
  });

  it('renders title', () => {
    const fixture = MockRender(RecipeCardComponent, {
      recipe: new RecipeBuilder().withTitle('Some recipe').build(),
    });
    expect(ngMocks.formatText(fixture)).toContain('Some recipe');
  });

  it('renders prep time', () => {
    const fixture = MockRender(RecipeCardComponent, {
      recipe: new RecipeBuilder().withPrepTime(10).build(),
    });
    expect(ngMocks.formatText(fixture)).toContain('Prep time - 10 min');
  });
});
