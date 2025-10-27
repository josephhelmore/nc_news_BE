# NC News Seeding

- The link to hosted version via render <https://book-app-kc9i.onrender.com>

SUMARRY
This back end project is my first encounter with creating and seeding tables to populate a database. This was driven by TDD to add end-points to the url.
On this database there are numerous articles with topics, comments, authors and other columns. 
The purpose of this project was to be able to grow the endpoints to GET, POST, PATCH, DELETE different properties within the database tables. 
Below are a few instructions to get the code running on your own machine. 

--cloning-- 
- fork the below repo to your own profile then clone the url into your VSCode
- repo <https://github.com/josephhelmore/nc_news_BE>


--installing dependencies--
- npm i -D supertest
- npm i -D jest
- npm i -D jest-extended
- npm i -D jest-sorted
- npm i express
- npm i dotenv
- npm i pg-format
- npm i nodemon

--dotenv--
- The .env.development and .env.test files have been git.ignore(d) for the purpose of security. 
- These files are used to create the databases on your local machine. 
- These will need to be added into the root folder
    -run the setup script 'npm run setup-dbs'
    -create your '.env.development' and '.env.test' files
    -inside these add PGDATABASE = database_name.test and development respectively
    -test your setup by running 'npm run test-seed' and 'npm run test-dev'


