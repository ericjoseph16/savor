import { UserRole } from "./helper-objects";

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