#!/bin/sh

data=$(curl --insecure --silent -L -H "accept: application/json" -X GET https://jsonplaceholder.typicode.com/posts/1)

if [ $(echo -n ${data} | jq -r ".id") = "1" ]
then
	echo >&2
	echo "Success!" >&2
	echo >&2
	return 0
else
	echo >&2
	echo "Failure! Expected to receive JSON with field id == 1, but received: ${data}" >&2
	echo >&2
	return 1
fi

