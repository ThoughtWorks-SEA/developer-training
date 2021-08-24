# PostgreSQL basics

PostgreSQL is an open source object-relational database system. It has a strong reputation for reliability, feature robustness, and performance.

## SQL exercises

SQL, or Structured Query Language, is a language designed to allow both technical and non-technical users query, manipulate, and transform data from a relational database.

Try it out [here](https://sqlbolt.com/lesson/introduction)!

# Getting started

### Installation

**Mac**

Follow the instructions for the installation [here](https://www.postgresqltutorial.com/install-postgresql-macos/). 

Alternatively, you can use Homebrew:

```
brew install postgresql
```

**Windows**

Follow the instructions for the installation [here](https://www.postgresqltutorial.com/install-postgresql/).

### Start/Stop Postgres server
#### For installation via download of Postgres App
1. Open the Postgres App.
1. You should see the postgres icon in your system tray when the App is running
1. If the server is new/empty, click the initialise button.  
1. Click the start button to start the postgres server

#### For installation via homebrew
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

**Create Another Database And User In PSQL**

In the psql session, run the following. You might want to explore limiting the [privileges](https://www.postgresql.org/docs/13/ddl-priv.html).
_Note_: [Stack Overflow: Postgres Case Sensitivity](https://stackoverflow.com/questions/21796446/postgres-case-sensitivity)

```
CREATE DATABASE database_name;

CREATE USER user;
GRANT all privileges ON DATABASE database_name TO user;
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
- To set the password for an existing user, run `ALTER USER <user> WITH PASSWORD '<password>'` in your psql shell. For example:

```bash
postgres=# ALTER USER exampleuser WITH PASSWORD 'yournewpassword';
```

## Key Concepts

You could refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/13/sql.html) for details.

* Concepts
  * Table/Row/Column
  * Schema
    * Schema Migration
  * Database Constraints: Primary Key, Foreign Key, Unique, Not Null etc.
  * [Index](https://8thlight.com/blog/kyle-annen/2018/10/09/an-introduction-to-database-indexing.html)
  * [View](https://ecomputernotes.com/fundamental/what-is-a-database/what-is-a-database-view)
  * SQL Query
    * Selection
    * Join
  * Transactions
    * [ACID Compliance](https://mariadb.com/resources/blog/acid-compliance-what-it-means-and-why-you-should-care)
    * Lock

### Database Constraints

SQL database usually provide supports to define constraints on columns and tables, with respect to other columns or rows. When there is attempts to store data in a column that would violate a constraint, an error is raised. Checkout the [Postgres Constraints Documentation](https://www.postgresql.org/docs/current/ddl-constraints.html).

**Primary Key**

In a database table(also known as schema), it is a common requirement for rows to be uniquely identifiable.  
Primary key refers to a column or a set of columns in a database table that uniquely identifies every record in the table.

Similarly, think about how you would refer to a row in an Excel sheet table.
For example, a unique number `customerID` can be used as a primary key for the Customers table and `isbn` for a Books table.

A primary key is called a simple key if it is a single column. It is called a composite key if it is made up of several columns.

Consideration for choosing primary key:
- The primary key shall be simple and familiar, employeeID for employees table and isbn for books table.
- The value of the primary key should not change. Primary key is used as a reference to other tables. If you change its value, you have to change all its references; otherwise, the references will be lost. For example, phoneNumber may not be appropriate to be used as primary key for table Customers, because it might change.
- Primary key often uses integer (or number) type. But it could also be other types, such as texts. However, it is best to use numeric column as primary key for efficiency as it require lesser bytes for storage.
- Primary key could take an arbitrary number. Most RDBMSs support so-called auto-increment (or AutoNumber type) for integer primary key, where (current maximum value + 1) is assigned to the new record. This arbitrary number is fact-less, as it contains no factual information. Unlike factual information such as phone number, fact-less number is ideal for primary key, as it does not change.
- In the case of auto-incremental primary key, it is not recommended to be used in cases when the key would be exposed to end-users. For example, if it is present in a URL (/orders/1234). There might be certain security concerns since it's sequential and guessable. In this case, a UUID will be more suitable. 
- Primary key is usually a single column (e.g., customerID or productCode). But it can also consist of several columns. However, the rule of thumb is to use as few columns as possible.

An example - a customers tables contains the following columns
- lastName, firstName, phoneNumber,address, city, state, zipCode
- The candidates for primary key are name=(lastName, firstName), phoneNumber, Address1=(address, city, state), Address1=(address, zipCode).
- Name may not be unique. Phone number and address may change.
- Hence, it is better to create a fact-less auto-increment number, say customerID, as the primary key.

**Foreign Key**

A foreign key constraint specifies that the values in a column (or a group of columns) must match the values appearing in some row of another table. To illustrate, the foreign key in "Table A" could be references to primary key column or multiple columns (aka composite key) in "Table B".

A table can have more than one foreign key constraint. This is used to implement many-to-many relationships between tables. For example, the through tables are usually created to independently hold the many-to-many relationship. The columns in the through tables are usually just the references to other tables.

### Indexing
Without advance preparation, the database system would have to scan the entire table to find all matching entries. Maintain an index on a column could provide the database system a more efficient method for locating matching rows. For instance, it might only have to walk a few levels deep into a search tree. 

It is the task of the database programmer to foresee which indexes will be useful. The index naming could be named freely, thus it is recommended to pick something that we could easily remember later what the index was for.

Unique Index is one of the most commonly used indexes.

The foreign key constraint is often a candidate for indexing, however database provider doesn't create an implicit ones as they usually does with primary key constraints. See: [Stack Overflow](https://stackoverflow.com/questions/836167/does-a-foreign-key-automatically-create-an-index)

In Postgres, a [unique index](https://www.postgresql.org/docs/current/indexes-unique.html) is automatically created when a unique constraint or primary key is defined for a table. The index covers the columns that make up the primary key or unique constraint (a multicolumn index, if appropriate, and is the mechanism that enforces the constraint. An index can also be defined on more than one column of a table. See: [Multicolumn Indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html)

**Index Types**
PostgreSQL provides several index types: `B-tree`, `Hash`, `GiST`, `SP-GiST`, `GIN` and `BRIN`. Each index type uses a different algorithm that is best suited to different types of queries. By default, the `CREATE INDEX` command creates `B-tree` indexes, which fit the most common situations.

References:
- https://www.postgresql.org/docs/current/indexes.html
- https://www.postgresql.org/docs/current/indexes-types.html

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

### Best Practices

**Integrity Rule**

* `Entity Integrity Rule`: The primary key cannot contain NULL. Otherwise, it cannot uniquely identify the row. For composite key made up of several columns, none of the column can contain NULL. Most of the RDBMS check and enforce this rule.
* `Referential Integrity Rule`: Each foreign key value must be matched to a primary key value in the table referenced \(or parent table\). You can insert a row with a foreign key in the child table only if the value exists in the parent table. If the value of the key changes in the parent table \(e.g., the row updated or deleted\), all rows with this foreign key in the child table\(s\) must be handled accordingly. You could either \(a\) disallow the changes; \(b\) cascade the change \(or delete the records\) in the child tables accordingly; \(c\) set the key value in the child tables to NULL. Most RDBMS can be setup to perform the check and ensure the referential integrity, in the specified manner.

**Normalization**

Normalization is a database design technique which organizes tables in a manner that minimizes redundancy and dependency of data. It divides larger tables to smaller tables and links them using relationships. Here is a good resource for understanding normalization - [Normalization of database](https://www.studytonight.com/dbms/database-normalization.php)

## Application Interaction with database - Native or ORM ?

In layered architecture, this interaction is often referred as Data Access Layer. The database models are also known as Data Access Objects (DAOs).

The term ORM most commonly refers to an actual ORM library — an object relational mapper — that carries out the work of object relational mapping for you. Object relational mapping is a technique for converting a database query result into entity class instances. An entity is simply an object wrapper for a database table.

There are 2 popular archictectural patterns that are used in the data access layer.
- **Data Mapper** pattern: CRUD operations and business rules are implemented in containers known as repositories.
- **Active Record** pattern: CRUD operations and business rules are implemented within entity classes.

Some experienced SQL users might prefer to use Query Builder instead of ORM, because 
- the surface area of an ORM is very large and learning it inside and out is no easy task
- ORM often generate comparatively complex queries which could be inefficient
- Without raw query, out-of-box ORM is less flexible, and thus developer has to learn both ORM syntax as well as some underlying SQL syntax

However an ORM is quite beneficial for medium-to-large-scale projects that source data from hundreds of database tables, since:
- ORM often support eager loading
- entity classes could also be designed to encapsulate logic for implementing business rules.

For Postgres DB, all of the below mentioned libraries are using [node-postgres (pg)](https://www.npmjs.com/package/pg) as the Postgres database driver.
- [Sequelize](https://sequelize.org/) ORM with **Active Record** pattern
- [TypeORM](https://github.com/oguimbal/pg-mem/wiki/Libraries-adapters#-typeorm) : supports both **Active Record** and **Data Mapper** patterns
- [knex](https://github.com/knex/knex) query builder

Some notable features that is common for database libraries include:
- query builders
- migration scripts
- CLI tool to generate boilerplate code
- seeding feature for pre-populating tables with test data
- connection pooling
- transaction support
- lazy loading or eager loading of associated models

References:
- https://www.sitepoint.com/javascript-typescript-orms/
- https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/

In following examples, we will be using `Sequelize` to demonstrate features of ORM.
