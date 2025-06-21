export type User = {
  PK: string;    
  SK: string;
  userId: string;
  name: string;
  email: string;
  createdById: string; //Created By Id
  createdByName: string; //Created By Name
  createdDtTm: string; //Created By Date Time  
  updatedById: string; //Updated By Name
  updatedByName: string; //Updated By Id
  updatedDtTm: string; //Updated By Date Time
  entityType: string;     //Entity Type
}