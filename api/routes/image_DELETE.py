import boto3

path = '/images/{id}'
method = 'DELETE'

def handler(event, db, store):
	# get image UUID
	id = event['pathParameters']['id']

	# flag DynamoDB item as deleted
	db.update_item(
		Key={ 'id': id },
		UpdateExpression="SET deleted = :true",
	    ExpressionAttributeValues={
	        ':true': True,
	    }
	)

	# tag S3 object as deleted (allowing a policy to delete/archive after e.g. 30 days)
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
