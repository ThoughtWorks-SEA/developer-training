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
Models are the essence of Sequelize.

The model tells Sequelize several information about the entity it represents, such as:
- the name of the table in the database
- the columns and their data types (the fields that a model has)

A Model represents a table in the database. Instances of this class represent a database row.

By default, when the table name is not given, Sequelize automatically pluralizes the model name and uses that as the table name.

The Sequelize models are ES6 classes. You can very easily [add custom instance or class level methods](https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes).

### Model Options
Sequelize support additional options on the model. These options are passed on to the `Model#init` functions, and then used to define the table in the database.

Some notable options are:

 Option           | Default Value | Description
 :--------------  | :------------ | :---------------------
 `freezeTableName`| false         | If freezeTableName is true, sequelize use the model name to get the table name. Otherwise, the model name will be pluralized.
 `tableName`      | optional      | Override the name of the table directly. Otherwise, defaults to pluralized model name, unless `freezeTableName` is set.
 `indexes`        | optional      | Define an array of index
 `timestamps`     | true          | Adds createdAt and updatedAt timestamps to the database model.
 `paranoid`       | false         | If set to true, calling destroy will not delete the model, but instead set a deletedAt timestamp
 `createdAt`      | "createdAt"   | Override the name of the createdAt attribute. Timestamps must be true. Disable it if false.
 `updatedAt`      | "updatedAt"   | Override the name of the updatedAt attribute. Timestamps must be true. Disable it if false.
 `updatedAt`      | false         | Override the name of the deletedAt attribute. Timestamps must be true. Disable it if false.
 `hooks`          | optional      | An object of hook function that are called before and after certain lifecycle events. See: [hooks](https://sequelize.org/master/manual/hooks.html)
 `validate`       | optional      | An object of model wide validations. See: [Validations and constraints](https://sequelize.org/master/manual/validations-and-constraints.html#model-wide-validations)

See Params starting with `options.*` in [Model#init](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init) for the full list.

### Column Options
Apart from specifying the [DataTypes](https://sequelize.org/master/manual/model-basics.html#data-types) of the column, there are a lot more options that can be used to define a database column.
See Params starting with `attributes.column.*` in [Model#init](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init) for the full list.

Some notable column options are:

 Option                   | Default Value | Description
 :------------------------| :------------ | :---------------------
 `type`                   |               | A string or a data type
 `allowNull`              | true          | If false, the column will have a NOT NULL constraint, and a not null validation will be run before an instance is saved.
 `defaultValue`           |               | A literal default value, a JavaScript function, or an SQL function (see sequelize.fn)
 `unique`                 | false         | If true, the column will get a unique constraint. If a string is provided and multiple columns have the same string, all of them will form an composite unique index.
 `primaryKey`             | false         |
 `autoIncrement`          | false         |
 `autoIncrementIdentity`  | false         |
 `references`             | null          | For references to another table, see associations.
 `validate`               |               | An object of validations to execute for this column every time the model is saved. Can be either the name of a validation provided by validator.js, a validation function provided by extending validator.js (see the [Sequelize.prototype.Validator](https://github.com/sequelize/sequelize/blob/main/lib/sequelize.js#L1315-L1320) for more details), or a custom validation function. Custom validation functions could also be asynchronous or synchronous functions.

## (WIP) Create a Simple Model

## (Coming Soon) Defining Associations