import { applyFilter } from './recipe-filter.model';
import { RecipeBuilder } from './recipe.model';

describe('applyFilter', () => {
  describe('on keyword', () => {
    it('returns true if not specified', () => {
      const recipe = new RecipeBuilder()
        .withTitle('Recipe')
        .withPrepTime(10)
        .build();
      const filter = { keyword: '', maxPrepTime: 20 };
      expect(applyFilter(recipe, filter)).toBeTrue();
    });

    it('returns true if found in title', () => {
      const recipe = new RecipeBuilder().withTitle('Xyz keyword').build();
      const filter = { keyword: 'keyword', maxPrepTime: null };
      expect(applyFilter(recipe, filter)).toBeTrue();
    });

    it('returns true if found in an ingredient', () => {
      const recipe = new RecipeBuilder()
        .withIngredients(['2 spoons of keyword'])
        .build();
      const filter = { keyword: 'keyword', maxPrepTime: null };
      expect(applyFilter(recipe, filter)).toBeTrue();
    });

    it('returns true if found in a step', () => {
      const recipe = new RecipeBuilder().withSteps(['Do keyword']).build();
      const filter = { keyword: 'keyword', maxPrepTime: null };
      expect(applyFilter(recipe, filter)).toBeTrue();
    });

    it('return false if not found in either title, ingredients or steps', () => {
      const recipe = new RecipeBuilder()
        .withTitle('Something')
        .withIngredients(['Some ingredient'])
        .withSteps(['Do something'])
        .build();
      const filter = { keyword: 'keyword', maxPrepTime: null };
      expect(applyFilter(recipe, filter)).toBeFalse();
    });
  });

  describe('on prep time', () => {
    it('returns true if max not specified', () => {
      const recipe = new RecipeBuilder()
        .withTitle('Recipe')
        .withPrepTime(10)
        .build();
      const filter = { keyword: 'Recipe', maxPrepTime: null };
      expect(applyFilter(recipe, filter)).toBeTrue();
    });

    it('returns false if prep time undefined', () => {
      const recipe = new RecipeBuilder().build();
      const filter = { keyword: '', maxPrepTime: 10 };
      expect(applyFilter(recipe, filter)).toBeFalse();
    });

    it('returns true if less than max', () => {
      const recipe = new RecipeBuilder().withPrepTime(5).build();
      const filter = { keyword: '', maxPrepTime: 10 };
      expect(applyFilter(recipe, filter)).toBeTrue();
    });

    it('returns false if more than max', () => {
      const recipe = new RecipeBuilder().withPrepTime(15).build();
      const filter = { keyword: '', maxPrepTime: 10 };
      expect(applyFilter(recipe, filter)).toBeFalse();
    });
  });
});
