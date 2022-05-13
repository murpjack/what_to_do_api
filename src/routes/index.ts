import express from 'express';
import * as controllers from '../controllers/';
// import cors from 'cors';
// import { whitelist } from '../whitelist';
export const router = express.Router();

// const whitelistArray = Object.keys(whitelist)?.map(
//   (o: string) => whitelist[o],
// );

// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     'Origin',
//     'X-Requested-With',
//     'Content-Type',
//     'Accept',
//     'X-Access-Token',
//   ],
//   credentials: true,
//   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//   // origin: '*',
//   origin: (origin, callback) => {
//     /** When on the api project, the origin is undefined. */
//     if (whitelistArray.indexOf(origin) > -1 || origin === undefined) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   preflightContinue: false,
// };

// Handle whitelist in a method to be called before cors.
// router.use(cors(options));

// This is a test route!!
// router.get('/test', (req: any, res: any) => {
//   res.json({ message: 'pass!' });
// });

const validMethod = (method: string): string => {
  switch (method) {
    case 'get':
      return 'get';

    case 'post':
      return 'post';

    case 'put':
      return 'put';

    case 'delete':
      return 'delete';

    default:
      return 'use';
  }
};

// TODO: comment this code?
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
Object.keys(controllers.default).map((controllerName, i) => {
  Object.keys(controllers.default[controllerName].default).forEach(
    (routeHandlerFileName) => {
      const [method, handlerName] = routeHandlerFileName.split('::');

      router[validMethod(method)](
        `/${controllerName}/${handlerName}`,
        controllers.default[controllerName].default[
          routeHandlerFileName
        ],
      );
    },
  );
});

export default router;
