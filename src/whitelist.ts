export const whitelist = {
  app: 'http://localhost:124',
  app2: 'http://localhost:4000',
};

export default {
  whitelist,
};

// import cors from 'cors';

// /**
//  *
//  * Whitelist is stored as a JSON string in env.
//  *
//  * Whitelist is parsed into an object and added to our CORS exceptions.
//  * @todo comment this properly.
//  */

// export const whitelist = {
//   app: 'http://localhost:124',
//   app2: 'http://localhost:4000',
// };

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

// // Handle whitelist in a method to be called before cors.
// export default cors(options);
