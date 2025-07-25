//import { unmarshallOutput } from "@aws-sdk/lib-dynamodb/dist-types/commands/utils";
import { Meal } from "../models/entity-objects";
import { MealData, Author, UserGoal, Nutrition } from "../models/helper-objects";
import { dynamoDB } from "./dynamo-db";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import KSUID from 'ksuid';

export async function createMeal(data: MealData, author: Author): Promise<string | undefined> {
    if (author && data) {
        const mealId = KSUID.randomSync().string;

        const mealName = data.name.toLowerCase()

        const currentDtTm = new Date().toISOString();
        
        const pk = `M#${mealId}`;
        const sk = `M#${mealId}`;

        const gsi1pk = `U#${author.id}`;
        const gsi1sk = `M#${mealId}`;

        const gsi2pk = `UG#${UserGoal}`;
        const gsi2sk = `M#${mealId}`;

        const gsi3pk = `UFM#U#${author.id}`;
        const gsi3sk = `M#${mealId}`;

        const gsi4pk = `MNAME#${mealName}`
        const gsi4sk = `M#${mealId}`;

        const meal: Meal = {
            PK: pk,
            SK: sk,
            GSI1PK: gsi1pk,
            GSI1SK: gsi1sk,
            GSI2PK: gsi2pk,
            GSI2SK: gsi2sk,
            GSI3PK: gsi3pk,
            GSI3SK: gsi3sk,
            GSI4PK: gsi4pk,
            GSI4SK: gsi4sk,
            mealId: mealId,
            name: mealName,
            description: data.description,
            tags: data.tags,
            ingredients: data.ingredients,
            nutrition: data.nutrition,
            prepTimeMins: data.prepTimeMins,
            status: data.status,
            mealType: data.type,
            crById: author.id,
            crByName: author.name,
            crDtTm: currentDtTm,
            updById: author.id,
            updByName: author.name,
            updDtTm: currentDtTm,
            source: data.source,
            entityType: 'M'

        }
        try {
            await dynamoDB.put({
              TableName: process.env.TABLE_NAME,
              Item: meal,
              ConditionExpression: 'attribute_not_exists(PK)'
            });

            // check if tags exists and it is an array
            if (data.tags && Array.isArray(data.tags)) {
              if (data.tags.length > 3) {
                throw new Error("A maximum of 3 tags are allowed.");
              }
              for (const tag of data.tags) {
                await createMealTag(mealId, tag.toLowerCase());
              }
            }

            // Return new meal that was just inserted
            return pk;
          } catch (error) {
            console.error(`Error creating meal: ${data.name}`, error);
            return undefined;      
          }
    }
    return undefined;
}

export async function createMealTag(id: string, tag: string): Promise<string | undefined> {
  if (id && tag) {

    tag = tag.toLowerCase();

    const pk = `M#${id}`;
    const sk = `MT#${tag}`;

    const gsi1pk = `MT#${tag}`;
    const gsi1sk = `M#${id}`;

    const currentDtTm = new Date().toISOString();

    const mealTag = {
      PK: pk,
      SK: sk,
      GSI1PK: gsi1pk,
      GSI1SK: gsi1sk,
      // GSI2PK: string;
      // GSI2SK: string;
      // GSI3PK: string;
      // GSI3SK: string;
      // GSI4PK: string;
      // GSI4SK: string;
      mealId: id,
      tag: tag,
      crDtTm: currentDtTm,
      entityType: "MT"
    }
    try {
      await dynamoDB.put({
        TableName: process.env.TABLE_NAME,
        Item: mealTag,
        ConditionExpression: 'attribute_not_exists(PK)'
      });

      // Return new meal that was just inserted
      return pk;
    } catch (error) {
      console.error(`Error creating tag: ${mealTag}`, error);
      return undefined;      
    }
  }
  return undefined
}

export async function getMealIdByName(name: string): Promise<string | undefined> {
  if (name) {
    // name of meal
    const nameKey = `MNAME#${name.toLowerCase()}`;
  
    try {
      const result = await dynamoDB.send(new QueryCommand({
        TableName: process.env.TABLE_NAME,
        // using 4th GSI
        IndexName: "GSI4",
        // querying the table where GSI4 is pk
        KeyConditionExpression: "GSI4PK = :pk",
        ExpressionAttributeValues: {
          // nameKey is a String Value (S)
          ":pk": { S: nameKey }
        },
        // we only return 1 mealIdByName
        Limit: 1
      }));
      
      //console.log("Raw DynamoDB result:", JSON.stringify(result, null, 2));
      
      // if result exists and has items, then convert it to a usable item, 
      // and get the first item (should only be one) and return it
      if (result.Items && result.Items.length > 0) {
        const item = unmarshall(result.Items[0]);
        //console.log("Unmarshalled item:", item);
        return item.mealId;
      }
      //console.log("Skips if condition");
    }
    catch (error) {
      console.error(`Error querying meal by name: ${nameKey}`, error);
    }
    return undefined;
  }

  return undefined;
}

export async function getMealsByTag(tag: string): Promise<string[] | undefined> {
  if (tag) {
    const tagKey = `MT#${tag.toLowerCase()}`;
    try {
      const result = await dynamoDB.send(new QueryCommand({
        TableName: process.env.TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: {
          ":pk": { S: tagKey }
        },
      }));
      
      // if there are no meals with the tag, return nothing
      if (!result.Items || result.Items.length === 0) {
        return [];
      }

      // extract the meal IDs from each item, and put it in a string set
      const mealIds = result.Items.map(item => unmarshall(item).mealId) as string[];
      return mealIds;

    }
    catch (error) {
      console.error(`Error querying meal by name: ${tagKey}`, error);
    }
    return undefined;
  }
  return undefined;
}

// async function testGetMealsByTag() {
//   const tag = "natural"; // must match whatever is in DynamoDB
//   const mealIds = await getMealsByTag(tag);

//   if (mealIds && mealIds.length > 0) {
//     console.log(`Found ${mealIds.length} meals with tag "${tag}":`);
//     console.log(mealIds);
//   } else if (mealIds && mealIds.length === 0) {
//     console.log(`No meals found with tag "${tag}".`);
//   } else {
//     console.error("Query failed or tag is invalid.");
//   }
// }

// testGetMealsByTag();
