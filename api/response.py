from json import dumps as stringify
from traceback import format_exc as trace

def success(body = None, status = None, mime = None, headers = {}, encoded = False, raw = False):
	response = {}

	if body is not None:
		response['body'] = body if raw or isinstance(body, str) else stringify(body)

		if encoded:
			response['isBase64Encoded'] = True

	if status:
		response['statusCode'] = status

	if mime:
		headers['Content-Type'] = mime
	headers['Access-Control-Allow-Origin'] = 'https://emyhny0tlc.execute-api.us-west-2.amazonaws.com'

	response['headers'] = headers

	return response

def error(ex):
	return {
		'statusCode': 500,
		'body': trace(),
		'headers': {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	}
