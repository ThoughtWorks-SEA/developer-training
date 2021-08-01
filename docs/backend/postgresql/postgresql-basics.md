# PostgreSQL basics

PostgreSQL is an open source object-relational database system. It has a strong reputation for reliability, feature robustness, and performance.

## SQL exercises

SQL, or Structured Query Language, is a language designed to allow both technical and non-technical users query, manipulate, and transform data from a relational database.

Try it out [here](https://sqlbolt.com/lesson/introduction)!

# Getting started

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
createdb devtraining
psql -d devtraining
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

## Troubleshooting

- To reset your PostgreSQL admin password: https://community.progress.com/s/article/How-to-reset-PostgreSQL-admin-password (Windows)

## Key Concepts
You could refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/13/sql.html) for details.

* Concepts
  * Table/Row/Column
  * Schema
    * Schema Migration
  * Primary Key, Foreign Key
  * [Index](https://8thlight.com/blog/kyle-annen/2018/10/09/an-introduction-to-database-indexing.html)
  * Transactions
    * [ACID Compliance](https://mariadb.com/resources/blog/acid-compliance-what-it-means-and-why-you-should-care)
    * Lock
  * [View](https://ecomputernotes.com/fundamental/what-is-a-database/what-is-a-database-view)
  * SQL Query
    * Selection
    * Join

### (WIP) Primary Key
**Entity Integrity Rule**

### (WIP) Relationship
**Primary Key + Foreign Key**

**Referential Integrity Rule**

### Indexing
Without advance preparation, the database system would have to scan the entire table to find all matching entries. Maintain an index on a column could provide the database system a more efficient method for locating matching rows. For instance, it might only have to walk a few levels deep into a search tree. 

It is the task of the database programmer to foresee which indexes will be useful. The index naming could be named freely, thus it is recommended to pick something that we could easily remember later what the index was for.

Some of the commonly used index types are:
- Primary Key
- Foreign Key
- Unique

### ACID compliance
ACID properties stands for:
  - Atomaticity
  - Consistency
  - Isolation
  - Durability

Database lock or concurrency control are in place so that the integrity of the data is protected. Dependent on the database provider, there are different database locking techniques and different level of database locking. The terms "optimistic locking" and "pessimistic locking" are commonly used to refer to them.

References:
- [PostgreSQL Documentation: Multiversion Concurrency Control, MVCC](https://www.postgresql.org/docs/13/mvcc.html)
- [Database Locking: What it is, Why it Matters and What to do About it](https://www.methodsandtools.com/archive/archive.php?id=83)

## Database modelling
As we discuss earlier, it's logical to create model for every object. However challenges might occur, such as:
- Repeated information in similar objects
- Large objects
- Infeasibility due to database limitation (eg. many-to-many relationship)

Therefore, a well-designed database shall
- eliminate data redundancy
- ensure data integrity and accuracy

Here is an example of how [Data Modelling using ERD with Crow Foot Notation](https://www.codeproject.com/Articles/878359/Data-modelling-using-ERD-with-Crow-Foot-Notation) could help us with the modelling. The article discussed on how Logical Model and Physical Model could help us in the implementation.

In general, there are mainly 4 steps to designing a database
* Step 1 - Define the purpose of the database\(requirement anaylsis\)
* Step 2 - Gather data, organize in tables and specify primary key and foreign keys\(if any\)
  * In each table, we have to choose one column or a few columns to be the `primary key`, which uniquely identify each of the rows
* Step 3 - Create relationship among Tables
  * `one-to-many`
  * `many-to-many`
  * `one-to-one`
* Step 4 - Normalization

## (WIP) Best Practices
  - **Normalization**