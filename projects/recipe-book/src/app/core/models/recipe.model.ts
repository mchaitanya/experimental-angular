export interface Recipe {
  id: number;
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
    id: 1,
    title: 'Recipe',
    imageUrl: '/resources/recipe.jpg',
    servings: 2,
    ingredients: [],
    steps: [],
  };

  withId(id: number): RecipeBuilder {
    this.recipe.id = id;
    return this;
  }

  withTitle(title: string): RecipeBuilder {
    this.recipe.title = title;
    return this;
  }

  withImageUrl(imageUrl: string): RecipeBuilder {
    this.recipe.imageUrl = imageUrl;
    return this;
  }

  withPrepTime(prepTime: number | undefined): RecipeBuilder {
    this.recipe.prepTime = prepTime;
    return this;
  }

  withCookTime(cookTime: number | undefined): RecipeBuilder {
    this.recipe.cookTime = cookTime;
    return this;
  }

  withServings(servings: number): RecipeBuilder {
    this.recipe.servings = servings;
    return this;
  }

  withIngredients(ingredients: string[]): RecipeBuilder {
    this.recipe.ingredients = ingredients;
    return this;
  }

  withSteps(steps: string[]): RecipeBuilder {
    this.recipe.steps = steps;
    return this;
  }

  withRating(rating: number | undefined): RecipeBuilder {
    this.recipe.rating = rating;
    return this;
  }

  withCategory(category: string | undefined): RecipeBuilder {
    this.recipe.category = category;
    return this;
  }

  build(): Readonly<Recipe> {
    return Object.freeze(this.recipe);
  }
}
