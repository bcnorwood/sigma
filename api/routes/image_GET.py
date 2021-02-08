path = '/images/{id}'
method = 'GET'

def handler(event, db):
	# get all attributes for DynamoDB item
	return db.get_item(Key=event['pathParameters'])['Item']
