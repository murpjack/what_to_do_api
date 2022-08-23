import Airtable from 'airtable';
import { notValid, notFound, notUpdated } from '../db/errors';
import { map, fork, node } from 'fluture';

// TODO: Define types
// TODO: Test CRUD operations

const BASE = process.env.AIRTABLE_BASE || '';
const baseTable = Airtable.base(BASE)('hospitality');

const reshapeData = (r: any) => ({
  id: r.getId(),
  ...r.fields,
});

export const getVenues = (_: any, res: any) => {
  node(
    baseTable.select({
      maxRecords: 5,
      view: 'Grid view',
    }).all,
  )
    .pipe(map((records) => records.map(reshapeData)))
    .pipe(
      fork((error) =>
        res.status(400).json({
          success: false,
          error,
          message:
            'The selected document, or collection could not be returned!',
        }),
      )((data) => {
        res.status(200).json({
          success: true,
          data,
        });
      }),
    );
};

export const getVenueById = (req: any, res: any) => {
  // TODO Replace value in generator with resource name
  baseTable.find(req.params.id, (error: any, record: any) => {
    if (error) {
      res.status(400).json({
        success: false,
        error,
        message:
          'The selected document, or collection could not be returned!',
      });
    }
    return res.status(200).json({
      success: true,
      data: reshapeData(record),
    });
  });
};

export const createVenue = (req: any, res: any) => {
  const venues: any = [...req.body.venues].map((doc) => ({
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
