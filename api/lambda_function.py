import boto3
db = boto3.resource('dynamodb').Table('sigma')
store = boto3.resource('s3').Bucket('bcnorwood-sigma')

import routes
import response

def lambda_handler(event, context):
	try:
		v2 = 'routeKey' in event

		if v2:
			method, route = event['routeKey'].split(' ')
		else:
			method, route = event['httpMethod'], event['resource']

		result = routes.match(method, route)(event, db, store)

		if v2:
			return result

		if isinstance(result, dict):
			return response.success(**result)

		return response.success(result)

	except Exception as ex:
		return response.error(ex)
