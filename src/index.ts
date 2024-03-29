require('dotenv').config();
import app from './app';
// import db from "./db";
import router from './routes';
// import superagent from 'superagent';
import Airtable from 'airtable';

const port = process.env.PORT || 1234;
export const url = `http://localhost:${port}`;

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
  res.send('<h1>API</h1>');
  // const id = 'reczvRjYJ315dXba1';
  // superagent
  //   .delete(url + `/api/hospitality/venues${id}`)
  //   .catch((err: any) => {
  //     res.send(err);
  //   })
  //   .then((response: any) => {
  //     res.send(response);
  //   });

  // superagent
  //   .post(`http://localhost:${port}/api/hospitality/venues`)
  //   .send({
  //     venues: [
  //       {
  //         approvalStatus: 'APPROVED',
  //         costOfCokeOrSimilar: 5.79,
  //         description:
  //           'A family run speciality coffee shop in the heart of Coventry city centre.',
  //         email: 'go@on.in',
  //         foodMenuUrl: 'site.com/url',
  //         hasGlutenFreeOptions: true,
  //         hasVeganOptions: true,
  //         hasWheelchairAccess: true,
  //         hasBabyChangingFacilities: true,
  //         locationHash: 'gcqfjs7ee',
  //         telephone: '01234567890',
  //         venueName: 'Bean and Leaf',
  //       },
  //     ],
  //   })
  //   .catch((err: any) => {
  //     res.send(err);
  //   })
  //   .then((response: any) => {
  //     res.send(response);
  //   });
});

app.use('/api', router);
app.listen(port, () => console.log(`Server on ${url}`));
