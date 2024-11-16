const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: 'AKIAZI2LEBBALX2VRCPW',  
  secretAccessKey: 'AWS_SECRET_ACCESS_KEY'  
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
