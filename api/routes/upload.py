from base64 import standard_b64decode as base64dec
from re import search
from uuid import uuid4 as new_id

from requests_toolbelt.multipart.decoder import MultipartDecoder as parse

path = '/upload'
method = 'POST'

def handler(event, db, store):
	def save(part):
		# generate a new UUID
		id = str(new_id())

		# save a DynamoDB item with the UUID
		db.put_item(Item={ 'id': id })

		# save image to an an S3 object using the UUID as key
		store.put_object(
			Key=id,
			Body=part.content,
			ContentType=part.headers[b'content-type'].decode('ascii'),
			StorageClass='ONEZONE_IA',
			ACL='public-read'
		)

		# return the UUID to the client
		return id

	# parse the multipart/form-data request and save each file, returning the list of new UUIDS
	return [*map(save, parse(base64dec(event['body']), event['headers']['content-type']).parts)]
