// See tutorial: https://www.youtube.com/watch?v=yq0S2f3k9zY
// https://github.com/typicode/json-server/tree/78ea71375666d49145734689c097654c54f90686?tab=readme-ov-file#module
// https://nodejs.org/en/learn/typescript/run#running-typescript-code-with-tsx
import jsonServer from 'json-server';

import { RECIPES } from './recipes';

const server = jsonServer.create();
const router = jsonServer.router({ recipes: RECIPES });
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON server is running at http://localhost:3000');
});
