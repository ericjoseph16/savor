import { createUser } from "../lib/data/user-data";
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
    // Seed users from data file
    await seedUsers(seedData);
    await seedMeals(seedData);
    return Response.json({ message: `Users  and Meals seeded successfully!` });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }  
}

/**
 * Seed users
 * @param seedData 
 */
async function seedUsers(seedData: SeedData) {
  if(seedData.userList) {
    seedData.userList.map(async (userData) => {    
      const newUserKey = await createUser(userData, systemAuthor);
      console.log(`New user added: ${newUserKey}`);
    });
  }
}

/**
 * Seed meals
 * @param seedData 
 */
async function seedMeals(seedData: SeedData) {
  if(seedData.mealList) {
    seedData.mealList.map(async (mealData) => {    
      const newMealKey = await createMeal(mealData, systemAuthor);
      console.log(`New meal added: ${newMealKey}`);
    });
  }
}