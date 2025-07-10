import { User } from "../models/entity-objects";
import { Author, UserData } from "../models/helper-objects";
import { dynamoDB } from "./dynamo-db";
import KSUID from 'ksuid';

/**
 * Create user
 * @param userData 
 * @returns 
 */
export async function createUser(userData: UserData, author: Author): Promise<String | undefined> {
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