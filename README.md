# NC News Seeding

- The .env.development and .env.test files have been removed for the purpose of security
- These will need to be added into the ./db folder 
    -run the setup script 'npm run setup-dbs'
    -create your .env.development and .env.test files in the ./db folder
        -inside these use your PGDATABASE = database_name.test or development
    -test your setup by running 'npm run test-seed' and 'npm run test-dev'

