#!/bin/bash

# Define the folder containing SQL files
SQL_FOLDER="/docker-entrypoint-initdb.d"

# Check if the folder exists
if [ ! -d "$SQL_FOLDER" ]; then
    echo "Error: SQL folder not found!"
    exit 1
fi

# Define a function to execute SQL file and handle errors
execute_sql_file() {
    local file="$1"
    echo "EXECUTING SQL FILE: $file"
    echo ""
    mysql -u root IMOB < "$file"
    if [ $? -ne 0 ]; then
        echo "ERROR: SQL execution failed: $file"
        echo "--------------------------------------------------------------------------------------------------------------------"
        exit 1
    fi
}

# Iterate over each SQL file in the folder
for file in "$SQL_FOLDER"/*.sql; do
    echo "--------------------------------------------------------------------------------------------------------------------" 
    if [ -f "$file" ]; then
        execute_sql_file "$file"
    else
        echo "ERROR: File not found: $file"
        exit 1
    fi
    echo "--------------------------------------------------------------------------------------------------------------------"
done

echo "All SQL files executed successfully."
