import boto3

path = '/images/{id}'
method = 'DELETE'

def handler(event, db, store):
	id = event['pathParameters']['id']

	db.update_item(
		Key={ 'id': id },
		UpdateExpression="SET deleted = :true",
	    ExpressionAttributeValues={
	        ':true': True,
	    }
	)

	client = boto3.client('s3')
	client.put_object_tagging(
		Bucket=store.name,
		Key=id,
	    Tagging={
	        'TagSet': [
	            {
	                'Key': 'state',
	                'Value': 'deleted'
	            },
	        ]
	    }
	)
