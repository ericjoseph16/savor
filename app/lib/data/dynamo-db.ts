import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";

//set DynamoDb client
const dynamoDBClient = new DynamoDBClient({});

//Set translate config for marshalling and unmarshalling to and from DynamoDB
const translateConfig: TranslateConfig = { 
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
    convertTopLevelContainer: true,
  }, 
  unmarshallOptions:{
    wrapNumbers: true, //custom conversion can be added here
    convertWithoutMapWrapper: true,
  } 
};

//set DynamoDB Document client with translate config options
export const dynamoDB = DynamoDBDocument.from(dynamoDBClient, translateConfig);

