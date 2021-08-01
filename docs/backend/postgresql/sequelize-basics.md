# Sequelize basic

[Sequelize](https://github.com/sequelize/sequelize) is a NodeJS _Object Relational Mapping_ (ORM) tool. Some of the notable features solid transaction support, relations, eager and lazy loading, read replication, the support on raw queries.

Sequelize is such an ORM which supports multiple dialects, includes:
- PostgreSQL
- MySQL
- MariaDB
- SQLite
- MSSQL

Make sure your PostgreSQL server is running!

Let's explore a few key concepts using Sequelize:

- Creating models
- Using models to query and save data

While exploring [Sequelize Documentation](https://sequelize.org/master/index.html), let's try to use modern JS syntax including async/await.

We should also refer to [Sequelize API Reference](https://sequelize.org/master/identifiers.html) for more configuration options.

## Installation

The npm packages
- `pg` : The database driver, a non-blocking PostgreSQL client for Node.js.
- `pg-hstore` : A node package for serializing and deserializing JSON data to hstore format
- `sequelize` : The ORM library

```sh
npm install pg pg-hstore sequelize
```

## Connecting to PostgreSQL server

Let's begin by creating a file `db.js`. 

Following the Sequelize documentation on [connection pool](https://sequelize.org/master/manual/connection-pool.html), we will create only one Sequelize instanced and export the instance from the module. This will serve as our entry point to the database.

Some reading materials for details on why connection pooling is recommended.
- https://node-postgres.com/features/pooling
- https://stackoverflow.blog/2020/10/14/improve-database-performance-with-connection-pooling/

```js
// db.js

import Sequelize from 'sequelize';

const dbDialect = "postgres";
const dbName = process.env.PG_DB_NAME;
const dbUser = process.env.PG_USER || "user";
const dbPass = process.env.PG_PASS;
const dbHost = process.env.PG_HOST || "localhost";
const dbPort = process.env.PG_PORT || 5432;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: false,                        // Disables logging
  pool: {
    max: 10,        // default: 5
    min: 0,         // default: 0
    idle: 10000,    // default: 10000ms
    acquire: 30000, // default: 60000ms
    evict: 1000     // default: 1000ms
  },
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { connectDb };
export default sequelize;
```

We put this in a "db.js" file in a utils folder.

To connect to the database, "require" this file at the top of index.js:

```js
import { connectDb } from './utils/db.js';
await connectDb();
```

To access the sequelize instance later, we could use:
```js
import sequelize from './utils/db.js';
```

## Key Concepts

### What is a model?
Models are the essence of Sequelize. A model is an abstraction that represents a table in your database.

In Sequelize, the model contains the information:
- the name of the table in the database
- the columns and their data types (the fields that a model has)

These models are also used to represent the instances in Express.js.

## (WIP) Creating the Model

## (Coming Soon) Defining Associataions