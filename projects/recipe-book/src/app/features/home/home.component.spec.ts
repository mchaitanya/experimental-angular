import { MockBuilder, MockRender } from 'ng-mocks';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  // Under the hood, ng-mocks marks a standalone component as kept & mocks all its imports.
  // https://ng-mocks.sudo.eu/guides/component-standalone/
  beforeEach(() => MockBuilder(HomeComponent));

  it('renders', () => {
    const fixture = MockRender(HomeComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
