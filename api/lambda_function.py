import boto3
db = boto3.resource('dynamodb').Table('sigma')
store = boto3.resource('s3').Bucket('bcnorwood-sigma')

import routes
import response

def lambda_handler(event, context):
	try:
		http_api = 'http_api' in event['headers']

		if http_api:
			method, route = event['routeKey'].split(' ')
		else:
			method, route = event['httpMethod'], event['resource']

		result = routes.match(method, route)(event, db, store)
		if isinstance(result, dict):
			return response.success(**result, raw=http_api)

		return response.success(result, raw=http_api)

	except Exception as ex:
		return response.error(ex)
