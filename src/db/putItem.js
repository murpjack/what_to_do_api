import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../libs/ddbDocClient.js';

export const putItem = async () => {
  // Set the parameters.
  const params = {
    TableName: 'TABLE_NAME',
    Item: {
      primaryKey: 'VALUE_1',
      sortKey: 'VALUE_2',
    },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log('Success - item added or updated', data);
  } catch (err) {
    console.log('Error', err.stack);
  }
};

//import { ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
//import { ddbDocClient } from '../libs/ddbDocClient.js';

///*
// TODO: script to parse body object as parameter TYPE: values
//*/
//
//export const createItem = (tableName) => async (req, res) => {
//  const item = JSON.stringify(req.body);
//
//  const params = {
//    Statement: `INSERT INTO  ${tableName}  value  ${item}`,
//    Parameters: [{ S: item.movieTitle1 }, { N: item.movieYear1 }],
//  };
//  /*
//    TODO: Use Futures here
//  */
//  try {
//    await ddbDocClient.send(new ExecuteStatementCommand(params));
//    // TODO: Return a message - `Successfully added one item to ${tableName}!`
//    console.log('Success. Item added.');
//    return 'Run successfully'; // For unit tests.
//  } catch (err) {
//    console.error(err);
//    // TODO: DuplicateItemException, handle duplicates in DB
//    // TODO: handle Error response
//    return res.status(400).json({ success: false, message: 'err' });
//  }
//};
//
//const toDdbType = (value, obj1) => {
//  switch (value) {
//    case typeof value === 'string':
//      return 'S';
//    case typeof value === 'number':
//    case typeof value === 'bigint':
//      return 'N';
//    case typeof value === 'boolean':
//      return 'Bool';
//    // TODO: This may need to facilitate nested object schema.
//    case typeof value === 'object':
//      return 'Object';
//    case Array.isArray(value):
//      return 'List';
//    default:
//    // code block
//  }
//};
