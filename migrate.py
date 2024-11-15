import pymongo
import boto3
from datetime import datetime

# MongoDB Setup
MONGO_URI = "<Your_MongoDB_Connection_String>"
mongo_client = pymongo.MongoClient(MONGO_URI)
mongo_db = mongo_client["<database_name>"]  # Replace with your database name
mongo_collection = mongo_db["tasks"]  # Replace with your collection name

# DynamoDB Setup
dynamo_client = boto3.resource('dynamodb', region_name='us-east-1')  # Change region if needed
dynamo_table = dynamo_client.Table('Tasks')

# Function to transform MongoDB document for DynamoDB
def transform_document(mongo_doc):
    return {
        '_id': mongo_doc['_id']['$oid'],  # Convert ObjectId to string
        'task': mongo_doc['task'],
        'assignee': mongo_doc['assignee'],
        'status': mongo_doc['status'],
        'createDate': mongo_doc['createDate']['$date'],
        'updatedDate': mongo_doc['updatedDate']['$date']
    }

# Function to migrate data from MongoDB to DynamoDB
def migrate_data():
    for doc in mongo_collection.find():
        transformed_doc = transform_document(doc)
        try:
            dynamo_table.put_item(Item=transformed_doc)
            print(f"Inserted: {transformed_doc['_id']}")
        except Exception as e:
            print(f"Failed to insert {transformed_doc['_id']}: {str(e)}")

if __name__ == "__main__":
    migrate_data()
    print("Migration completed.")
