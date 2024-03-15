#!/bin/bash

docker exec -it api sh -c "cd /app && npm run db:reset"