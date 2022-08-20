require('dotenv').config();
import app from './app';
// import db from "./db";
import router from './routes';
import superagent from 'superagent';
import Airtable from 'airtable';

const port = process.env.PORT || 1234;

// DATABASE
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
if (!!AIRTABLE_API_KEY) {
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_API_KEY,
  });
}

app.get('/', (req, res) => {
  // TODO To be removed
  const id = 'recNeuuzSNQWCMHdy';
  superagent
    .delete(`http://localhost:${port}/api/hospitality/venues/${id}`)
    .catch((err: any) => {
      res.send(err);
    })
    .then((response: any) => {
      res.send(response);
    });
});

app.use('/api', router);
app.listen(port, () =>
  console.log(`Server on http://localhost:${port}/`),
);
