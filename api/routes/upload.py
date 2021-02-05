from base64 import standard_b64decode as base64dec
from re import search
from uuid import uuid4 as new_id

from requests_toolbelt.multipart.decoder import MultipartDecoder as parse

path = '/upload'
method = 'POST'

def handler(event, db, store):
	def save(part):
		id = str(new_id())

		db.put_item(Item={ 'id': id })

		store.put_object(
			Key=id,
			Body=part.content,
			ContentType=part.headers[b'content-type'].decode('ascii'),
			StorageClass='ONEZONE_IA',
			ACL='public-read'
		)

		return id

	return [*map(save, parse(base64dec(event['body']), event['headers']['content-type']).parts)]
