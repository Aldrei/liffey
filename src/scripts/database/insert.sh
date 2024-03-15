#!/bin/bash

docker exec -i db sh -c "sh /docker-entrypoint-initdb.d/entrypoint.sh"
