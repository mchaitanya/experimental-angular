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
