import { User, UserFoodPreference } from "../models/entity-objects";
import { Author, FoodPreference, MealData, PreferenceData, UserData } from "../models/helper-objects";
import { getMealIdByName } from "./meal-data";
import { dynamoDB } from "./dynamo-db";
import KSUID from 'ksuid';

/**
 * Create user
 * @param userData 
 * @returns 
 */
export async function createUser(userData: UserData, author: Author): Promise<string | undefined> {
  // If a valid user and author provided 
  if (userData && author) {    
    const userId = KSUID.randomSync().string;
    // Set PK and SK based on userId
    const userKey = `U#${userId}`;
    // Set GSI1 keys based on email
    const userEmailKey = `U#${userData.email}`;
    // Set GSI2 keys based on username
    const usernameKey = `U#${userData.username}`;
    // Set GSI3 keys based on role
    const userRoleKey = `U#${userData.role}`;
    // Create date & time
    const currentDtTm = new Date().toISOString();
    // User entity
    const user: User = {
      PK: userKey,    
      SK: userKey,
      GSI1PK: userEmailKey,
      GSI1SK: userEmailKey,
      GSI2PK: usernameKey,
      GSI2SK: usernameKey,
      GSI3PK: userRoleKey,
      GSI3SK: usernameKey,
      // GSI4PK:
      // GSI4SK:
      userId: userId,
      username: userData.username,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      crById: author.id,
      crByName: author.name,
      crDtTm: currentDtTm,
      updById: author.id,
      updByName: author.name,
      updDtTm: currentDtTm,
      entityType: 'U',      
    }
    try {
      await dynamoDB.put({
        TableName: process.env.TABLE_NAME,
        Item: user,
        ConditionExpression: 'attribute_not_exists(PK)'
      }); 
      // Return new user that was just inserted
      return userKey;
    } catch (error) {
      console.error(`Error creating user: ${userData.email}`, error);
      return undefined;      
    }
  }
  // UserData or Author not provided
  return undefined;
}

export async function createUserFoodPreference(data: PreferenceData, author: Author): Promise<string | undefined> {
  // If valid user, mealId, and preference provided
  if (author && data) {
    // Create date & time
    const currentDtTm = new Date().toISOString();
    // Create food preference id
    const foodPreferenceId = KSUID.randomSync().string;

    const name = data.mealData.name.toLowerCase();
    const mealId = await getMealIdByName(name);

    if (!mealId) {
      console.error(`Meal ID not found for name: ${name}`);
      return undefined;
    }

    const pk = `U#${author.id}`;
    const sk = `UFP#${foodPreferenceId}`;

    const gsi1pk = `M#${mealId}`;
    const gsi1sk = `U#${author.id}#UFP#${data.preference}#${foodPreferenceId}`;
    
    const userFoodPreferences: UserFoodPreference = {
      PK: pk,
      SK: sk,
      GSI1PK: gsi1pk,
      GSI1SK: gsi1sk,
      // GSI2PK:
      // GSI2SK:
      // GSI3PK:
      // GSI3SK:
      // GSI4PK:
      // GSI4SK:
      userId: author.id,
      userFoodPreferenceId: foodPreferenceId,
      mealId: mealId,
      foodName: name,
      preference: data.preference,
      crById: author.id,
      crByName: author.name,
      crDtTm: currentDtTm,
      updById: author.id,
      updByName: author.name,
      updDtTm: currentDtTm,
      entityType: "UFP"
    }
    try {
      await dynamoDB.put({
        TableName: process.env.TABLE_NAME,
        Item: userFoodPreferences,
        ConditionExpression: 'attribute_not_exists(PK)'
      }); 
      // Return new preference that was just inserted
      return foodPreferenceId;
    } catch (error) {
      console.error(`Error creating preference: ${name}, ${data.preference}`, error);
      return undefined;      
    }
  }
  return undefined;
}