## Goal

This project was born to replace the current API based in PHP:

- PHP with Laravel -> Typescript with Node/Express.
- REST -> GraphQL
- MySQL -> Postgres

## THERE'RE WE GO

```bash
### PROD

# Compiling the TS code to JS.
npm run compile
# Compiling and running the project.
npm run prod:tspc

### DEV

# We are using tsx lib to execute TS directly.
npm run `dev:tsx

# DATABASE
# Ensuring of the migration will works peacefully was add two scripts to check it frequently.

# Dropping the database and create all tables again. Of course all models was based in the current production database but few changes like name tables and name columns was done, there's a CHANGELOG.md in src/database/docker-entrypoint-initdb.d/
npm run db:reset

# Inserting data from dump works well(the dump should be in invisible columns mode to avoid errors about columns name changed). Remember that some tables was renamed, read src/database/docker-entrypoint-initdb.d/CHANGELOG.md
npm run db:insert
```

### So far, so good!