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
  category?: string;
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
  withImageUrl(imageUrl: string): RecipeBuilder {
    this.recipe.imageUrl = imageUrl;
    return this;
  }
  withPrepTime(prepTime: number): RecipeBuilder {
    this.recipe.prepTime = prepTime;
    return this;
  }
  withIngredient(ingredient: string): RecipeBuilder {
    this.recipe.ingredients.push(ingredient);
    return this;
  }
  withStep(step: string): RecipeBuilder {
    this.recipe.steps.push(step);
    return this;
  }
  build(): Readonly<Recipe> {
    return Object.freeze(this.recipe);
  }
}
