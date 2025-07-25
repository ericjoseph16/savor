import { createUser, createUserFoodPreference } from "../lib/data/user-data";
import { createMeal } from "../lib/data/meal-data";
import { Author } from "../lib/models/helper-objects";
import { seedData } from "./data";
import { SeedData } from "./definitions";

// Seeding author is always system
const systemAuthor: Author = {
  id: process.env.SYSTEM_USER_ID ?? 'System', 
  name: process.env.SYSTEM_USER_NAME ?? 'System',
};

/**
 * Route entry point
 * @returns
 */
export async function GET() {
  try {    
    // Seed users, meals, and preferences from data file
    await seedUsers(seedData);
    await seedMeals(seedData);
    await seedPreferences(seedData);
    return Response.json({ message: ` Users, Meals, and Preferences seeded successfully!` });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }  
}

/**
 * Seed users
 * @param seedData 
 */
async function seedUsers(seedData: SeedData) {
  if (seedData.userList) {
    for (const userData of seedData.userList) {
      const newUserKey = await createUser(userData, systemAuthor);
      console.log(`New user added: ${newUserKey}`);
    }
  }
}

/**
 * Seed meals
 * @param seedData 
 */
async function seedMeals(seedData: SeedData) {
  if (seedData.mealList) {
    for (const mealData of seedData.mealList) {
      const newMealKey = await createMeal(mealData, systemAuthor);
      console.log(`New meal added: ${newMealKey}`);
    }
  }
}

/**
 * Seed preferences
 * @param seedData 
 */
async function seedPreferences(seedData: SeedData) {
  if (seedData.preferenceList) {
    for (const preferenceData of seedData.preferenceList) {
      const newPreferenceKey = await createUserFoodPreference(preferenceData, systemAuthor);
      console.log(`New preference added: ${newPreferenceKey}`);
    }
  }
}