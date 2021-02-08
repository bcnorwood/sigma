import boto3
db = boto3.resource('dynamodb').Table('sigma')
store = boto3.resource('s3').Bucket('bcnorwood-sigma')

import routes
import response

def lambda_handler(event, context):
	try:
		# check if v2 API for sigma-ui Lambda
		v2 = 'routeKey' in event

		# v1 and v2 APIs specify route/method differently
		if v2:
			method, route = event['routeKey'].split(' ')
		else:
			method, route = event['httpMethod'], event['resource']

		result = routes.match(method, route)(event, db, store)

		# v2 API expects a JSON-stringifiable value as result
		if v2:
			return result

		# some routes return a dict with response data
		if isinstance(result, dict):
			return response.success(**result)

		# otherwise, treat response from route handler as body
		return response.success(result)

	except Exception as ex:
		return response.error(ex)
