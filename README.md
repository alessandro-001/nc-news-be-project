# Northcoders News API

# Instructions:
In order to correctly use this repo create a local clone using the following commands:
```console
git clone https://github.com/alessandro-001/nc-news-be-project
npm install
```


As in the original project some files have been added to .gitignore file, please read below:


You will need to create two .env files for your project: 
```
.env.test
```
and
```
.env.development
```

Into each, please add 
```
PGDATABASE=<database_name_here>
```
Add the correct database name for that environment (see /db/setup.sql for the database names).

You can also seed the database running the following commands:
```
npm run seed
```
And run the tests using:
```
npm test
```

# System Requirements:

- Postgres: 3.3.4 and above 
- Node JS: 0.4.0

# Feedback and Suggestions:
Please feel free to send any bugs and suggestions here: https://github.com/alessandro-001/nc-news-be-project/issues


Thank You!