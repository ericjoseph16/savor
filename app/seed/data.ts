import { UserRole, MealType, Status, MealSource, FoodPreference, MealPreview, Favorite } from "../lib/models/helper-objects";
import { SeedData } from "./definitions";

export const seedData: SeedData = {
  userList: [
    {
      name: "Eric Joseph",
      username: "ericjoseph16",      
      email: "ericjoseph16@gmail.com",
      role: UserRole.ADMIN,
    },
    {
      name: "Sarah Lee",
      username: "sarahfit",      
      email: "sarah@gmail.com",
      role: UserRole.USER,
    },
  ],
  mealList: [
    {
      name: "Apple",
      description: "Red Fruit",
      ingredients: ["Apple"],
      nutrition: {
        calories: 50,
        protein: 0,
        carbohydrates: 1,
        fat: 0,
        fiber: 1,
        sugar: 2,
        sodium: 0,
      },
      prepTimeMins: 0,
      isFavorite: Favorite.FAVORITED,
      type: MealType.SIMPLE,
      status: Status.ACTIVE,
      source: MealSource.USER_GENERATED,
    },
  ],
  // preferenceList: [
  //   {
  //     mealData: {
  //       name: "Apple",
  //       description: "Red Fruit",
  //       ingredients: ["Apple"],
  //       id: ,
  //     },
  //     preference: FoodPreference.LIKE,
  //   }
  // ]
}