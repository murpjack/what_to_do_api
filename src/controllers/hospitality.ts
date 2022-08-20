import Airtable from 'airtable';
// import {
//   // notValid,
//   notReturned,
//   notFound,
//   // notUpdated,
//   // idAlreadyExists
//  } from "./setupControllers";
// TODO: Define types
// TODO: Test CRUD operations
// TODO: Write helpers for error handling, common messages, etc.

const BASE = process.env.AIRTABLE_BASE || '';

export const getVenues = (_: any, res: any) => {
  const base = Airtable.base(BASE);
  base('hospitality')
    .select({
      maxRecords: 10,
      view: 'Grid view',
    })
    .eachPage(page, done);
  function page(records: any, fetchNextPage: any) {
    // This function (`page`) will get called for each page of records.
    let data: any = [];
    records.forEach((record: any) => {
      console.log('Retrieved', record.get('id'));
      data = [...data, record.get('id')];
    });
    return res.status(200).json({
      success: true,
      data,
    });
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    // fetchNextPage();
  }
  // TODO Error handling
  function done(err: any) {
    if (err) {
      console.error(err);
      return;
    }
  }
};

export const getVenueById = (req: any, res: any) => {
  const base = Airtable.base(BASE);
  // TODO Replace value in generator with resource name
  base('hospitality').find(req.params.id, (err: any, record: any) => {
    if (err) {
      console.error(err);
      return;
    }
    return res.status(200).json({
      success: true,
      record: { id: record.getId(), ...record.fields },
    });
  });
};

export const createVenue = (req: any, res: any) => {
  const base = Airtable.base(BASE);
  console.log({ body: req.body });
  base('hospitality').create(
    [{ fields: req.body }],
    (err: any, records: any) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record: any) => {
        console.log(record.getId());
      });
    },
  );

  return res
    .status(201)
    .json({ success: true, data: 'Venue created' });
};

export const updateVenue = (req: any, res: any) => {
  const base = Airtable.base(BASE);
  const { id, ...fields } = req.body;

  base('hospitality').update(
    [{ id, fields }],
    (err: any, records: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(records[0].fields);
    },
  );

  return res
    .status(200)
    .json({ success: true, data: 'venue updated' });
};

export const deleteVenue = (req: any, res: any) => {
  const base = Airtable.base(BASE);
  base('hospitality').destroy(
    [req.params.id],
    (err: any, deletedRecords: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted', deletedRecords.length, 'records');
    },
  );

  return res
    .status(410)
    .json({ success: true, data: 'venue deleted' });
};
