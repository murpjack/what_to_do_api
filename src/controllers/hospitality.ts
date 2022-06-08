import { putItem } from '../db/putItem.js';
// import userModel from "../models/user";
// import {
//   // notValid,
//   notReturned,
//   notFound,
//   // notUpdated,
//   // idAlreadyExists
//  } from "./setupControllers";
// TODO: Write simple CRUD operations
// TODO: Write helpers for error handling, common messages, etc.
// TODO: Test CRUD operations
// TODO: Decide and Hook up DB

// TODO: define types
export const getAllVenues = async (_: any, res: any) => {
  putItem();
  return res
    .status(200)
    .json({ success: true, data: [{ a: 'boo', b: 'bah' }] });
};

export const createVenue = async (_: any, res: any) => {
  putItem();
  return res
    .status(201)
    .json({ success: true, data: 'Venue created' });
};

export const updateVenue = async (_: any, res: any) => {
  return res
    .status(200)
    .json({ success: true, data: 'venue updated' });
};

export const requestDeleteVenue = async (_: any, res: any) => {
  return res.status(202).json({
    success: true,
    data: 'Request submitted. Pending approval',
  });
};

export const deleteVenue = async (_: any, res: any) => {
  // TODO: Should this have a code 410 or 200?
  // 410 = resource gone; 200 = success
  return res
    .status(410)
    .json({ success: true, data: 'venue deleted' });
};

// TODO: Dynamically generate export expression
// TODO: Could return each callback in one obj?
// TODO: Could create a file - given a config - using plop and handlebars?

export default {
  ['get::getAllVenues']: getAllVenues,
  ['post::createVenue']: createVenue,
  ['put::updateVenue']: updateVenue,
  ['get::requestDeleteVenue']: requestDeleteVenue,
  ['delete::deleteVenue']: deleteVenue,
};
