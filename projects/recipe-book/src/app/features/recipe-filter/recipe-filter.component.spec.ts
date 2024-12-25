import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';

import { RecipeService } from '@recipe-book/core/services';
import { RecipeFilterComponent } from './recipe-filter.component';

describe('RecipeFilterComponent', () => {
  beforeEach(() =>
    MockBuilder(RecipeFilterComponent)
      .keep(ReactiveFormsModule)
      .mock(RecipeService)
      .provide(FormBuilder)
  );

  it('renders', () => {
    const fixture = MockRender(RecipeFilterComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('disables "Apply" button when empty', () => {
    // Arrange
    const fixture = MockRender(RecipeFilterComponent);
    const keywordInput = ngMocks.find(fixture, '#keyword');
    const maxPrepTimeInput = ngMocks.find(fixture, '#max-prep-time');
    const applyButton = ngMocks.find(fixture, '.btn-primary');
    // Act not needed
    // Assert - Verify inputs empty & button disabled
    expect(keywordInput.properties['value'])
      .withContext('Keyword input')
      .toBe('');
    expect(maxPrepTimeInput.properties['value'])
      .withContext('Max prep time input')
      .toBe('');
    expect(applyButton.properties['disabled'])
      .withContext('Button disabled')
      .toBeTrue();
  });

  it('updates filter on submit', () => {
    // Arrange
    const updateSpy = MockInstance(
      RecipeService,
      'updateRecipeFilter',
      jasmine.createSpy('updateRecipeFilter')
    );
    const fixture = MockRender(RecipeFilterComponent);
    // Act - Enter values into filter & submit form
    ngMocks.change('#keyword', 'Keyword');
    ngMocks.change('#max-prep-time', 10);
    fixture.detectChanges();
    ngMocks.trigger('form[role=search]', 'submit');
    // Assert - Verify update filter spy called
    expect(updateSpy).toHaveBeenCalledWith({
      keyword: 'Keyword',
      maxPrepTime: 10,
    });
  });

  it('resets filter on clear', () => {
    // Arrange - Enter values into filter
    const updateSpy = MockInstance(
      RecipeService,
      'updateRecipeFilter',
      jasmine.createSpy('updateRecipeFilter')
    );
    const fixture = MockRender(RecipeFilterComponent);
    const keywordInput = ngMocks.find(fixture, '#keyword');
    const maxPrepTimeInput = ngMocks.find(fixture, '#max-prep-time');
    ngMocks.change(keywordInput, 'Keyword');
    ngMocks.change(maxPrepTimeInput, 10);
    expect(keywordInput.properties['value'])
      .withContext('After filling keyword')
      .toBe('Keyword');
    expect(maxPrepTimeInput.properties['value'])
      .withContext('After filling max prep time')
      .toBe(10);
    // Act - Click the "Clear" button
    ngMocks.click('button:not(.btn-primary)');
    // Assert - Verify inputs empty & update filter spy called
    expect(keywordInput.properties['value'])
      .withContext('Keyword after clearing')
      .toBe('');
    expect(maxPrepTimeInput.properties['value'])
      .withContext('Max prep time after clearing')
      .toBe('');
    expect(updateSpy)
      .withContext('Update recipe filter')
      .toHaveBeenCalledWith({ keyword: '', maxPrepTime: null });
  });
});
