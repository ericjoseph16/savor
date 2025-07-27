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
      tags: ["Easy", "Natural", "Sweet"],
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
    {
      name: "Apple Pie Slice",
      description: "Fruit Pie",
      ingredients: ["Apple, Flour, Sugar, Cinnamon"],
      tags: ["Sweet", "Dessert"],
      nutrition: {
        calories: 300,
        protein: 2,
        carbohydrates: 10,
        fat: 10,
        fiber: 1,
        sugar: 15,
        sodium: 0,
      },
      prepTimeMins: 60,
      isFavorite: Favorite.FAVORITED,
      type: MealType.COMPOSITE,
      status: Status.ACTIVE,
      source: MealSource.USER_GENERATED,
    },
  ],
  preferenceList: [
    {
      mealData: {
        name: "Apple",
        description: "Red Fruit",
        ingredients: ["Apple"],
      },
      preference: FoodPreference.LIKE,
    }
  ]
}