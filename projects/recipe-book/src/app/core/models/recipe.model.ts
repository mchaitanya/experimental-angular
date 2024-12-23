export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  prepTime?: number;
  cookTime?: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  rating?: number;
  tags?: string[];
}

export class RecipeBuilder {
  private recipe: Recipe = {
    id: 'id',
    title: 'Recipe',
    imageUrl: '/resources/recipe.jpg',
    servings: 2,
    ingredients: [],
    steps: [],
  };
  withTitle(title: string): RecipeBuilder {
    this.recipe.title = title;
    return this;
  }
  withIngredient(ingredient: string): RecipeBuilder {
    this.recipe.ingredients.push(ingredient);
    return this;
  }
  build(): Readonly<Recipe> {
    return Object.freeze(this.recipe);
  }
}
