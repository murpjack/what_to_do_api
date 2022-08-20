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
  superagent
    .get(`http://localhost:${port}/api/hospitality/venues`)
    .catch(console.error)
    .then((response) => {
      res.send({ response });
    })
    .then(console.log);
});

app.use('/api', router);
app.listen(port, () =>
  console.log(`Server on http://localhost:${port}/`),
);
