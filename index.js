
var https = require('https');
var Dynamodb = require('aws-sdk/clients/dynamodb')
var AWS = require('aws-sdk');

module.exports.batchWriteItems = dynamoDbBatchWriteItems;
module.exports.init = init;

const START_WAITING_MS = 1000;
var lastWaitMs = START_WAITING_MS;

var agent = new https.Agent({
  maxSockets: 25
});

var dynamodbDocClient = null;

function init(localProfile, region) {
  var creds = new AWS.SharedIniFileCredentials({ profile: localProfile });
  dynamodbDocClient = new Dynamodb.DocumentClient({
    credentials: creds,
    region,
    apiVersions: {
      dynamodb: '2012-08-10'
    },
    httpOptions: {
      agent: agent
    }
  });
}

function filterEmptyElements(writeRequests) {
  if (!writeRequests) return;
  
  for (var i = 0; i < writeRequests.length; ++i) {
    removeEmptyElements(writeRequests[i].PutRequest.Item);
  }
}

function dynamoDbBatchWriteItems(tableName, writeRequests, onAllItemsProcessed) {
  filterEmptyElements(writeRequests);
  dynamodbDocClient.batchWrite({
    RequestItems: {
      [tableName]: writeRequests
    }
  }, function (err, data) {
    if (err) {
      console.log(err)
      console.log('Fetching ended at ' + new Date().toLocaleTimeString())
      return;
    }

    console.log('Stored on DynamoDB.')
    var unprocessedItems = data.UnprocessedItems[tableName]
    if (unprocessedItems != null) {
      console.log('Unprocessed items: %d. Retry write batch items in %d milisec', unprocessedItems.length, lastWaitMs *= 2)
      setTimeout(dynamoDbBatchWriteItems, lastWaitMs, tableName, unprocessedItems, onAllItemsProcessed)
      return;
    }

    lastWaitMs = START_WAITING_MS
    onAllItemsProcessed()
  })
}

function removeEmptyElements(data) {
	for (var prop in data) {
    if (data[prop] === '' || data[prop].length === 0) {
      delete data[prop];
		} else if (typeof data[prop] === 'object') {// dive deeper in
      removeEmptyElements(data[prop]);
    }
  }
  return data;
}