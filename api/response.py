from json import dumps as stringify
from traceback import format_exc as trace

def success(body = None, status = None, mime = None, headers = {}, encoded = False, raw = False):
	response = {}

	if body is not None:
		# JSON-stringify body if not already a string
		response['body'] = body if isinstance(body, str) else stringify(body)

		# set base64 flag for binary responses
		if encoded:
			response['isBase64Encoded'] = True

	# set HTTP status code, if provided
	if status:
		response['statusCode'] = status

	# set Content-Type header, if provided
	if mime:
		headers['content-type'] = mime

	# set CORS header to allow access from sigma-ui Lambda
	headers['access-control-allow-origin'] = 'https://emyhny0tlc.execute-api.us-west-2.amazonaws.com'

	# set headers and return
	response['headers'] = headers
	return response

def error(ex):
	# return 500 with stack trace
	return {
		'statusCode': 500,
		'body': trace(),
		'headers': {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	}
