# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).


## CAUTION: 
As in the original project some files have been added to .gitignore file, please read below:
```
You will need to create two .env files for your project: .env.test and .env.development. 

Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names).
```

## Git Branching and Pull Requests

You will be working on each ticket on a new **branch**.

To create and switch to a new git branch use the command:

```
git checkout -b <new branch name>
```

This will create a branch and move over to that branch. (Omit the `-b` flag if you wish to switch to an already existing branch).

We recommend that you name the branch after the number assigned to each ticket via the header. eg. `ncnews-1`

When pushing the branch to git hub ensure that you make reference to the branch you are pushing to on the remote.

```
git push origin <branch name>
```

## Husky

To ensure we are not commiting broken code this project makes use of git hooks. Git hooks are scripts triggered during certain events in the git lifecycle. Husky is a popular package which allows us to set up and maintain these scripts. This project makes use a _pre-commit hook_. When we attempt to commit our work, the script defined in the `pre-commit` file will run. If any of our tests fail than the commit will be aborted.

The [Husky documentation](https://typicode.github.io/husky/#/) explains how to configure Husky for your own project as well as creating your own custom hooks.\_
