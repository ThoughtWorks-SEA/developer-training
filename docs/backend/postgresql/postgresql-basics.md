# PostgreSQL basics

PostgreSQL is an open source object-relational database system. It has a strong reputation for reliability, feature robustness, and performance.

# Exercise

Try it out [here](https://sqlbolt.com/lesson/introduction)!

## Getting started

### Installation

**Mac**

Follow the instructions for the installation [here](https://www.postgresqltutorial.com/install-postgresql-macos/).

Alternatively, you can use Homebrew:

```
brew install postgresql
```

**Windows**

Follow the instructions for the installation [here](https://www.postgresqltutorial.com/install-postgresql/).

Google is your best friend if you run into any issues. 🔎

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

Find the PostgreSQL database directory, e.g. `C:\Program Files\PostgreSQL\12.7\data`, then:

```
pg_ctl -D "C:\Program Files\PostgreSQL\12.7\data" start
```

```
pg_ctl -D "C:\Program Files\PostgreSQL\12.7\data" stop
```

## PostgreSQL command shell

### Check if Postgres server is running

```
psql
```

If you can successfully launch the Postgres terminal, your server is running.

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

# help
\?
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

### Using Postico

You can use [Postico](https://eggerapps.at/postico/) to explore your Postgres databases.
