# NC News Seeding

- The link to hosted version via render <https://book-app-kc9i.onrender.com>

SUMARRY
This back end project is my first encounter with creating and seeding tables to populate a database. This was driven by TDD to add end-points to the url.
On this database there are numerous articles with topics, comments, authors and other columns. 
The purpose of this project was to be able to grow the endpoints to GET, POST, PATCH, DELETE different properties within the database tables. 
Below are a few instructions to get the code running on your own machine. 

--cloning-- 
- fork the below repo to your own profile then clone the url into your VSCode/Comparable
- repo <https://github.com/josephhelmore/nc_news_BE>


First thing is to run 
``` 
npm i
```

This will install all the necessary dependancies such as;
- Jest
- Cors
- Dotenv etc



--dotenv--

- The .env.development and .env.test files have been git.ignore(d) for the purpose of security. 
- These files are used to create the databases on your local machine. 
- These will need to be added into the root folder
    -run the setup script 'npm run setup-dbs'
    -create your '.env.development' and '.env.test' files
    -inside these add PGDATABASE = database_name_test and development respectively
    -test your setup by running 'npm run test-seed' and 'npm run test-dev'


--setup.dbs--

- In your /db folder - create a new setup-dbs.sql file 
- Add your

DROP DATABASE IF EXISTS 'test_db_name;
CREATE DATABASE test_db_name;

DROP DATABASE IF EXISTS dev_db_name;
CREATE DATABASE dev_db_name;


Once these steps are complete, you should be able to seed and run the test + dev database. 
```
Tests
- npm run setup-dbs
- npm run seed-test
- npm t 

Dev
- npm run setup-dbs
- npm run seed-dev
- npm run-dev



