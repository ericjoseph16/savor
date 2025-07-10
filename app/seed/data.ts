import { UserRole } from "../lib/models/helper-objects";
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
  ]
}