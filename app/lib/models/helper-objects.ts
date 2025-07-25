/**
 * User roles
 */
export enum UserRole {
  USER = 'User',
  ADMIN = 'Admin',
  SYSTEM = 'System',
}

/**
 * Food Preference
 */
export enum FoodPreference {
  LIKE = 'Like',
  DISLIKE = 'Dislike',
}

/**
 * Favorite a Meal
 */
export enum Favorite {
  FAVORITED = 'Favorited',
  NOT_FAVORITED = 'Not Favorited',
}

/**
 * User Goal
 */
export enum UserGoal { 
  HIGH_PROTEIN = 'High Protein', 
  LOW_CARB = 'Low Carb', 
  LOW_CALORIE = 'Low Calorie', 
  HIGH_CALORIE = 'High Calorie',
  LOW_SUGAR = 'Low Sugar',
  GLUTEN_FREE = 'Gluten Free',
  DAIRY_FREE = 'Dairy Free',
  LOW_COST = 'Low Cost',
  HIGH_CONVENIENCE = 'High Convenience',
  PLANT_BASED = 'Plant Based',
}

/**
 * Meal Type
 */
export enum MealType {
  SIMPLE = 'Simple',
  COMPOSITE = 'Composite',
}

/**
 * Meal Source
 */
export enum MealSource {
  USER_GENERATED = 'User Generated', 
  SYSTEM_RECOMMENDED = 'System Recommended',
}

/**
 * Status
 */
export enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

/**
 * For auditing purposes, all writes to database would require an Author passed in
 */
export interface Author {
  id: string;
  name: string;
}

export interface UserData {
  name: string;
  username: string;
  email: string;      
  role: UserRole;        
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface MealData {
  name: string;
  description: string;
  ingredients: string[];
  nutrition: Nutrition;
  isFavorite: Favorite;
  prepTimeMins: number;
  type: MealType;
  status: Status;
  source: MealSource;
}

export interface MealPreview {
  name: string;
  description: string;
  ingredients: string[];
}

export interface PreferenceData {
  mealData: MealPreview,
  preference: FoodPreference,
}