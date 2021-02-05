path = '/images'
method = 'GET'

def handler(event, db, store):
	return [item['id'] for item in db.scan(ProjectionExpression='id')['Items']]
