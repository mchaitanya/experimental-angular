const { faker } = require('@faker-js/faker');
// Todo: Import Recipe model
// https://fakerjs.dev/guide/usage.html#create-complex-objects

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
    prepTime: 10,
    cookTime: 10,
    servings: faker.number.int({ min: 1, max: 4 }),
    ingredients: faker.helpers.multiple(() => faker.food.ingredient()),
    steps: [],
    rating: faker.number.int({ min: 1, max: 5 }),
    tags: [],
  };
}

module.exports = () => {
  // Generate 4 random recipes.
  const recipes = new Array(4)
    .fill(0)
    .map(index => createRandomRecipe(index + 1));
  return { recipes };
};
