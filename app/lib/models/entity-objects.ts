export type User = {
  PK: string;    
  SK: string;
  userId: string;
  name: string;
  email: string;
  crById: string; //Created By Id
  crByName: string; //Created By Name
  crDtTm: string; //Created By Date Time  
  updById: string; //Updated By Name
  updByName: string; //Updated By Id
  updDtTm: string; //Updated By Date Time
  entityType: string;     //Entity Type
}