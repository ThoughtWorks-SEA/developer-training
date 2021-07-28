# PostgreSQL basics

PostgreSQL is an open source object-relational database system. It has a strong reputation for reliability, feature robustness, and performance.

# SQL vs NoSQL

Other than SQL databases like (e.g. PostgreSQL, MySQL), there are also NoSQL databases (e.g. MongoDB, DynamoDB).

<iframe width="560" height="315" src="https://www.youtube.com/embed/ruz-vK8IesE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Exercise

Now that we know what the structure looks like and how to access the data, try it out [here](https://sqlbolt.com/lesson/introduction)!

## Getting started

### Installation

**Mac**

Follow the instructions for the installation [here](https://www.postgresqltutorial.com/install-postgresql-macos/). Alternatively, you can use Homebrew:

```
brew install postgresql
```

**Windows**

Follow the instructions for the installation [here](https://www.postgresqltutorial.com/install-postgresql/).

### Start/Stop Postgres server

https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html

**Mac**

```
brew services start postgresql
```

```
brew services stop postgresql
```

**Windows**

Find the PostgreSQL directory, e.g. `C:\Program Files\PostgreSQL\13` (Check that the path is correct! The version may be different), then:

Add this path into your machine's `Path` [system variable](https://docs.oracle.com/en/database/oracle/machine-learning/oml4r/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html#GUID-DD6F9982-60D5-48F6-8270-A27EC53807D0):

`C:\Program Files\PostgreSQL\13\bin` (Note the additional `\bin`)

On PowerShell:

```
pg_ctl -D "C:\Program Files\PostgreSQL\13\data" start
```

```
pg_ctl -D "C:\Program Files\PostgreSQL\13\data" stop
```

## PostgreSQL command shell

### Check if Postgres server is running

```
psql
```

If you can successfully launch the Postgres terminal, your server is running.

You might need to run the following if you hit `psql: error: FATAL: database <database-name> does not exist`.

```
createdb
```

### Using the command shell

[PostgreSQL command line cheatsheet](https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546)

```
# list databases
\l

# connect to a database
\c <database-name>

# show currently connected database
SELECT current_database();

# list roles
\du

# list tables
\dt

# quit
\q

# help
\?
```

**Create Another Database And Enter Command Shell**

In the terminal, run the following.

```
createdb devTraining
psql -d devTraining
```

**Create Users table**

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```

**Create User records**

```
INSERT into users VALUES
  (1, 'Sabrina'),
  (2, 'Sabrino'),
  (3, 'Sabrine');
```

## Exploring the PostgreSQL databases

### Graphical Tools

If you follow the installation step in [PostgreSQL Tutorial](https://www.postgresqltutorial.com/), you should already have access to the [pgAdmin](https://www.pgadmin.org/download/), which is a GUI tool for managing and developing your databases.

**On Mac OS**

You can also install [pgAdmin](https://www.pgadmin.org/download/) via Homebrew. Alternatively, here are some of the other [GUI Clients Apps for PostgreSQL on the Mac](https://postgresapp.com/documentation/gui-tools.html).

```
brew install --cask pgadmin4
```
