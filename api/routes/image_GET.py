path = '/images/{id}'
method = 'GET'

def handler(event, db):
	return db.get_item(Key=event['pathParameters'])['Item']
