const { faker } = require('@faker-js/faker');
// Todo: Import Recipe model
// https://fakerjs.dev/guide/usage.html#create-complex-objects
// https://www.youtube.com/watch?v=yq0S2f3k9zY

function createRandomRecipe(index) {
  const title = faker.food.dish();
  // Random image from https://loremflickr.com. Defaults to picture of cat
  // https://github.com/MastaBaba/LoremFlickr-2/issues/9
  // const imageUrl = faker.image.urlLoremFlickr({ category: 'food' });
  // Random image from https://via.placeholder.com. Service no longer exists :(
  // const imageUrl = faker.image.urlPlaceholder({ text: title });
  // Random image from https://picsum.photos.
  const imageUrl = faker.image.urlPicsumPhotos();
  return {
    id: index,
    title,
    imageUrl,
    prepTime: faker.helpers.maybe(() =>
      faker.number.int({ min: 5, max: 25, multipleOf: 5 })
    ),
    cookTime: faker.helpers.maybe(() =>
      faker.number.int({ min: 5, max: 25, multipleOf: 5 })
    ),
    servings: faker.number.int({ min: 1, max: 4 }),
    ingredients: faker.helpers.multiple(
      () => capitalize(faker.food.ingredient()),
      { count: { min: 2, max: 6 } }
    ),
    steps: faker.helpers.multiple(() => faker.lorem.sentence(), {
      count: {
        min: 2,
        max: 6,
      },
    }),
    rating: faker.helpers.maybe(() => faker.number.int({ min: 1, max: 5 })),
    category: faker.helpers.maybe(() => faker.food.ethnicCategory()),
  };
}

// Capitalize the first character in a word
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = () => {
  // Generate 10 random recipes.
  const recipes = new Array(10)
    .fill(0)
    .map((_value, index) => createRandomRecipe(index + 1));
  return { recipes };
};
