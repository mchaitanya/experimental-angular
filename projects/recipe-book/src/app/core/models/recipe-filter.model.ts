import { Recipe } from './recipe.model';

export interface RecipeFilter {
  keyword: string;
  maxPrepTime: number | null;
}

export const EMPTY_FILTER: RecipeFilter = {
  keyword: '',
  maxPrepTime: null,
};

function containsKeyword(recipe: Recipe, keyword: string): boolean {
  if (!keyword) {
    return true;
  }
  // Search for keyword in the title, ingredients, & steps.
  const text = [recipe.title, ...recipe.ingredients, ...recipe.steps].join(' ');
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function prepTimeLessThan(recipe: Recipe, maxPrepTime: number | null): boolean {
  if (!maxPrepTime || typeof maxPrepTime !== 'number') {
    return true;
  }
  if (!recipe.prepTime) {
    return false;
  }
  return recipe.prepTime <= maxPrepTime;
}

export function applyFilter(recipe: Recipe, filter: RecipeFilter): boolean {
  return (
    containsKeyword(recipe, filter.keyword) &&
    prepTimeLessThan(recipe, filter.maxPrepTime)
  );
}
