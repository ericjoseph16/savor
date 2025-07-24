import { UserData, MealData, PreferenceData } from "../lib/models/helper-objects";

export interface SeedData {
  userList? : UserData[],
  mealList? : MealData[],
  preferenceList? : PreferenceData[],
}