#!/bin/bash

docker exec -it api sh -c "cd /app && npx tsx ./src/scripts/database/reset.ts"