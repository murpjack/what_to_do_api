import express from 'express';
import * as controllers from '../controllers/';
import corsOptions from '../cross-origin';
export const router = express.Router();

router.use(corsOptions);

/**
 File structure: 
 
 |___controllers
 |   |   # index.ts contains all controllers to be added to the route.      
 |   |   # Importing controllers this way seems simplest.
 |   |   index.tx       
 |   |   
 |   |   someController{.ts}
 |   |       ["verb::nameOfRequestHandler"] : (request, response) => # Something exciting
 |   |       ["verb::nameOfRequestHandler"] : (request, response) => # Something exciting
 |   |       ...   
 |   |   
 |   |   entertainmentController{.ts}
 |   ...
 
 note. index.ts and any controller files return a 'default' export object, which is seen below.
 */

const validMethod = (method: string) =>
  ['get', 'post', 'put', 'delete'].includes(method) ? method : 'use';

// TODO: controllerName is currently also used as a tableName,
// though this ought to change
Object.keys(controllers.default).map((controllerName) => {
  Object.keys(controllers.default[controllerName].default).forEach(
    (routeHandlerFileName) => {
      const [method, handlerName] = routeHandlerFileName.split('::');

      router[validMethod(method)](
        `/${controllerName}/${handlerName}`,
        controllers.default[controllerName].default[
          routeHandlerFileName
        ],
      )(controllerName);
    },
  );
});

export default router;
