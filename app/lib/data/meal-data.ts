import { Meal } from "../models/entity-objects";
import { MealData, Author, UserGoal, Nutrition } from "../models/helper-objects";
import { dynamoDB } from "./dynamo-db";
import KSUID from 'ksuid';

export async function createMeal(data: MealData, author: Author, nutrition: Nutrition): Promise<String | undefined> {
    if (author && data) {
        const mealId = KSUID.randomSync().string;

        const currentDtTm = new Date().toISOString();
        
        const pk = `M#${mealId}`;
        const sk = `M#${mealId}`;

        const gsi1pk = `U#${author.id}`;
        const gsi1sk = `M#${mealId}`;

        // const gsi2pk = `UG#${UserGoal}`;
        // const gsi2sk = `M#${mealId}`;

        // const gsi3pk = 
        // const gsi3sk = mealId;

        const meal: Meal = {
            PK: pk,
            SK: sk,
            GSI1PK: gsi1pk,
            GSI1SK: gsi1sk,
            // GSI2PK: gsi2pk,
            // GSI2SK: gsi2sk,
            // GSI3PK:
            // GSI3SK:
            mealId: mealId,
            name: data.name,
            ingredients: data.ingredients,
            nutrition: nutrition,
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
            // Return new meal that was just inserted
            return pk;
          } catch (error) {
            console.error(`Error creating meal: ${data.name}`, error);
            return undefined;      
          }
    }
    return undefined;
}