import Airtable from 'airtable';
import {
  notValid,
  notReturned,
  notFound,
  notUpdated,
} from 'db/errors';

// TODO: Define types
// TODO: Test CRUD operations

const BASE = process.env.AIRTABLE_BASE || '';
const baseTable = Airtable.base(BASE)('hospitality');

export const getVenues = (_: any, res: any) => {
  baseTable
    .select({
      maxRecords: 10,
      view: 'Grid view',
    })
    .eachPage(page, done);

  function page(records: any[], fetchNextPage: any) {
    // This function (`page`) will get called for each page of records.
    return res.status(200).json({
      success: true,
      data: records.map((record) => ({
        ...record.fields,
        id: record.getId(),
      })),
    });
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    // fetchNextPage();
  }
  // TODO Error handling
  function done(err: any) {
    if (err) {
      return notReturned(err, res);
    }
  }
};

export const getVenueById = (req: any, res: any) => {
  // TODO Replace value in generator with resource name
  baseTable.find(req.params.id, (err: any, record: any) => {
    if (err) {
      return notReturned(err, res);
    }
    return res.status(200).json({
      success: true,
      data: { id: record.getId(), ...record.fields },
    });
  });
};

export const createVenue = (req: any, res: any) => {
  const venues = [...req.body.venues].map((doc) => ({
    fields: {
      ...doc,
      venueId: 'HOS' + Date.now() + Math.floor(Math.random()),
    },
  }));

  baseTable.create(venues, (err: any, _: any) => {
    if (err) {
      return notValid(err, res);
    }

    return res.status(201).json({
      success: true,
      data: `Success! Venues created`,
    });
  });
};

export const updateVenue = (req: any, res: any) => {
  const { id, ...fields } = req.body;

  baseTable.update([{ id, fields }], (err: any, _: any) => {
    if (err) {
      return notUpdated(err, res);
    }
    return res
      .status(200)
      .json({ success: true, data: 'Success! Venue updated' });
  });
};

export const deleteVenue = (req: any, res: any) => {
  baseTable.destroy([req.params.id], (err: any, _: any) => {
    if (err) {
      return notFound(err, res);
    }
    return res
      .status(204)
      .json({ success: true, data: 'Venue deleted' });
  });
};
