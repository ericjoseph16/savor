import { UserRole, FoodPreference, Nutrition, Status, MealType, MealSource} from "./helper-objects";

/**
 * User entity
 */
export type User = {
  PK: string;    
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  GSI2PK: string;
  GSI2SK: string;
  GSI3PK: string;
  GSI3SK: string;  
  userId: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  crById: string;
  crByName: string;
  crDtTm: string;
  updById: string;
  updByName: string;
  updDtTm: string;
  entityType: string;
}

// User Food Preference Entity
export type UserFoodPreference = {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  // GSI2PK: string;
  // GSI2SK: string;
  // GSI3PK: string;
  // GSI3SK: string;
  // GSI4PK: string;
  // GSI4SK: string;
  userId: string;
  userFoodPreferenceId: string;
  mealId: string;
  foodName: string;
  preference: FoodPreference;
  crById: string;
  crByName: string;
  crDtTm: string;
  updById: string;
  updByName: string;
  updDtTm: string;
  entityType: string;
}

// Meal Entity
export type Meal = {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  GSI2PK: string;
  GSI2SK: string;
  GSI3PK: string;
  GSI3SK: string;
  GSI4PK: string;
  GSI4SK: string;
  mealId: string;
  name: string;
  ingredients: string[];
  nutrition: Nutrition;
  prepTimeMins: Number;
  status: Status;
  mealType: MealType;
  crById: string;
  crByName: string;
  crDtTm: string;
  updById: string;
  updByName: string;
  updDtTm: string;
  source: MealSource;
  entityType: string;
}