import { faker } from '@faker-js/faker';

import { Recipe, RecipeBuilder } from '../src/app/core/models';

function createRecipe(index: number): Recipe {
  // Other options for images -
  // https://loremflickr.com. Defaults to picture of cat
  // https://github.com/MastaBaba/LoremFlickr-2/issues/9
  // const imageUrl = faker.image.urlLoremFlickr({ category: 'food' });
  // https://via.placeholder.com. Service no longer exists :(
  // const imageUrl = faker.image.urlPlaceholder({ text: title });
  return new RecipeBuilder()
    .withId(index)
    .withTitle(faker.food.dish())
    .withImageUrl(faker.image.urlPicsumPhotos()) // Random image from https://picsum.photos
    .withPrepTime(
      faker.helpers.maybe(() =>
        faker.number.int({ min: 5, max: 25, multipleOf: 5 })
      )
    )
    .withCookTime(
      faker.helpers.maybe(() =>
        faker.number.int({ min: 5, max: 25, multipleOf: 5 })
      )
    )
    .withServings(faker.number.int({ min: 1, max: 4 }))
    .withIngredients(
      faker.helpers.multiple(() => capitalize(faker.food.ingredient()), {
        count: { min: 2, max: 6 },
      })
    )
    .withSteps(
      faker.helpers.multiple(() => faker.lorem.sentence(), {
        count: {
          min: 2,
          max: 6,
        },
      })
    )
    .withRating(faker.helpers.maybe(() => faker.number.int({ min: 1, max: 5 })))
    .withCategory(faker.helpers.maybe(() => faker.food.ethnicCategory()))
    .build();
}

// Capitalize the first character in a word
function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export const RECIPES = faker.helpers.multiple(
  (_: unknown, index: number) => createRecipe(index + 1),
  { count: { min: 10, max: 40 } }
);
