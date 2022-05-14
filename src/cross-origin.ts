import cors from 'cors';

//  TODO: Whitelist stored as a JSON string in env.
export const whitelist = {
  app: 'http://localhost:1234',
  app2: 'http://localhost:4000',
};

/** Whitelist is parsed into an object and added to our CORS exceptions.*/
const whitelistArray = Object.keys(whitelist).map(
  (o: string) => whitelist[o],
);

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  // origin: '*',
  origin: (origin, callback) => {
    /** When on the api project, the origin is undefined. */
    if (whitelistArray.indexOf(origin) > -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  preflightContinue: false,
};

export default cors(options);
