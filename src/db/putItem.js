import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {ddbDocClient} from "../libs/ddbDocClient.js";

export const putItem = async () => {
	// Set the parameters.
	const params = {
		TableName: "TABLE_NAME",
		Item: {
			primaryKey: "VALUE_1",
			sortKey: "VALUE_2",
		},
	};
	try {
		const data = await ddbDocClient.send(new PutCommand(params));
		console.log("Success - item added or updated", data);
	} catch (err) {
		console.log("Error", err.stack);
	}
};
putItem();
