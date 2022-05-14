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

// TODO: define types
export const getAllVenues = async (_: any, res: any) => {
  return res
    .status(200)
    .json({ success: true, data: [{ a: 'boo', b: 'bah' }] });
};

export default {
  ['get::getAllVenues']: getAllVenues,
  ['post::postAllVenues']: () => {},
  ['delete::deleteAllVenues']: () => {},
};
