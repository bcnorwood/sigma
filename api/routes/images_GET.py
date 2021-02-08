path = '/images'
method = 'GET'

def handler(event, db, store):
	# return the UUID of each DynamoDB item
	return [item['id'] for item in db.scan(ProjectionExpression='id')['Items']]
