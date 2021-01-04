Container volumes with docker-compose
=====================================

Example how to use container volumes with docker-compose. Motivation: I want to
deploy JS webpack data as a data docker-image working behind common nginx docker
container

Example:

```bash
docker volume rm container-volumes_data

docker-compose up --no-start data
# Creating volume "container-volumes_data" with default driver
# Creating container-volumes_data_1 ... done

docker-compose run --rm app find /data
# Creating container-volumes_app_run ... done
/data
/data/folder
/data/folder/file2.txt
```
