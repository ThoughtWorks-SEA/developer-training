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
To support usage of `import`, `export` syntax, add the line `"type": "module"` to `package.json` to use ECMAScript Modules (ESM) instead of the default CommonJS. With release of Node.js v14, it offers full support of ECMAScript modules, and it is enabled by default.

We should also refer to [Sequelize API Reference](https://sequelize.org/master/identifiers.html) for more configuration options.

## Installation

You have previously created a database through the terminal command `createdb devtraining`. You could verify via `psql -d devtraining`. If the default user isn't `devtraining`, please run the following in the psql terminal.
```sh
CREATE USER devtraining;
GRANT all privileges ON DATABASE "devtraining" TO devtraining;
```

Let's quick start a NodeJS repo with ES6 support, refer to GitHub repo: ?? .

We need the following npm packages to connect to the database instance.

- `pg` : The database driver, a non-blocking PostgreSQL client for Node.js.
- `pg-hstore` : A node package for serializing and deserializing JSON data to hstore format
- `sequelize` : The ORM library

```sh
npm install pg pg-hstore sequelize
```

## Connecting to PostgreSQL server

Let's start exploring sequelize by creating a file `utils/db.js`.

Following the Sequelize documentation on [connection pool](https://sequelize.org/master/manual/connection-pool.html), we will create only one Sequelize instance and export the instance from the module. This will serve as our entry point to the database.

Some reading materials for details on why connection pooling is recommended.

- https://node-postgres.com/features/pooling
- https://stackoverflow.blog/2020/10/14/improve-database-performance-with-connection-pooling/

```js
// utils/db.js

import Sequelize from "sequelize";

const dbDialect = "postgres";
const dbName = process.env.PG_DB_NAME || "devtraining";
const dbUser = process.env.PG_USER || "user";
const dbPass = process.env.PG_PASS;
const dbHost = process.env.PG_HOST || "localhost";
const dbPort = process.env.PG_PORT || 5432;

// SSL connection
// https://github.com/sequelize/sequelize/issues/10015
// https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificate
const dbConnectViaSsl = process.env.PG_SSL_MODE !== "false"; // Note: Set PG_SSL_MODE=false in your local .env
const dbDialectOptions = dbConnectViaSsl
  ? {
      ssl: {
        require: dbConnectViaSsl,
        rejectUnauthorized: false,
      },
    }
  : {};

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  dialectOptions: dbDialectOptions,
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: false,                        // Disables logging
  pool: {
    max: 10, // default: 5
    min: 0, // default: 0
    idle: 10000, // default: 10000ms
    acquire: 30000, // default: 60000ms
    evict: 1000, // default: 1000ms
  },
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDb };
export default sequelize;
```

To connect to the database, we will import the function and invoke it in "index.js":

```js
// index.js
import { connectDb } from "./utils/db.js";
connectDb();
```

To access the sequelize instance later, in order to initialize sequelize models, we could use:

```js
// *.model.js
import sequelize from "./utils/db.js";
```

## Key Concepts

### What is a model?

Models are the essence of Sequelize. A Model represents a table in the database. Instances of this class represent a database row.

The model tells Sequelize several information about the entity it represents, such as:

- the name of the table in the database
- the columns and their data types (the fields that a model has)

By default, when the table name is not given, Sequelize automatically pluralizes the model name and uses that as the table name.

The Sequelize models are ES6 classes.

## Create a Simple Model

There are two equivalent ways to define a model in Sequelize. Internally, `sequelize.define` calls `Model.init`, so both approaches are essentially equivalent.

- Calling `sequelize.define(modelName, attributes, modelOptions)`
- Extending Model and calling `init(attributes, modelOptions)`

We will choose the later, as we could easily [add custom instance or class level methods](https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes) to the ES6 classes.

Every column you define in your model must have a [data type](https://sequelize.org/master/manual/model-basics.html#data-types). Sequelize provides a lot of built-in data types. Refer to [github (sequelize)](https://github.com/sequelize/sequelize/blob/main/lib/data-types.js#L1003-L1043).

Let's begin to create our first model file `db/models/simple-pokemon.model.js`.

```javascript
// simple-pokemon.model.js

import sequelizeConnection from '../../utils/db.js'; // Reference to the database connection instance

import sequelize from 'sequelize';
const { DataTypes, Model } = sequelize;

class SimplePokemon extends Model {}

SimplePokemon.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    japaneseName: {
      type: DataTypes.STRING,
    },
    baseHP: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    nameWithJapanese: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.japaneseName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `nameWithJapanese` value!");
      },
    },
  },
  {
    sequelize: sequelizeConnection, // We need to pass the connection instance
    // modelName: 'SimplePokemon', // We could set the model name instead of using the Class name
    // freezeTableName: true, // We could skip the pluralization for database naming
    tableName: "Simple_Pokemon", // We could lock the name of the database table directly
  }
);

// This will drop the database table and recreate empty table whenever application restarts.
// Not recommended for production level due to destructive operation, but we will use this to demonstrate.
// For production level, to consider Migration support (advanced topic).
const synchronizeModel = async () => await SimplePokemon.sync({ force: true });
synchronizeModel();

export default SimplePokemon;
```

Import the model in our entry point `index.js`.
```js
import SimplePokemon from './db/models/simple-pokemon.model.js';
```

At this point of time, you should have a NodeJS folder structure looks like below.

```sh
.
├── index.js
├── package-lock.json
├── package.json
├── db
│   └── models
│       └── simple-pokemon.model.js
└── utils
    └── db.js
```

Your package.json should include these:

```json
{
  ...
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
  },
  ...
}
```

Let's start the application, and check out the application logs.

```sh
npm start
```

The following logs are generated from the function call `connectDb()`, which setup and test the database connection.

```
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
```

The below logs are generated from us invoking `await SimplePokemon.sync({ force: true })` which is a Class-level method of Sequelize Model class. We could also synchronise all Sequelize models at once. See: [Model synchronization](https://sequelize.org/master/manual/model-basics.html#model-synchronization) for the 3 available model synchronization options.

```
Executing (default): DROP TABLE IF EXISTS "Simple_Pokemon" CASCADE;
Executing (default): CREATE TABLE IF NOT EXISTS "Simple_Pokemon" ("id"   SERIAL , "name" VARCHAR(255), "japaneseName" VARCHAR(255), "baseHP" INTEGER, "category" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
```

Compare the SQL `CREATE TABLE` statement with our model definition. You will find the following.

1. The database table is named `Simple_Pokemon`, while our model is named `SimplePokemon`.
1. Database column is not created for virtual field `nameWithJapanese`.
1. There are additional columns being generated by Sequelize.
   - `id` (type SERIAL)
   - `createdAt`, `updatedAt` (type TIMESTAMP WITH TIME ZONE) : This are default options which could be turn off.
1. A Primary Key for the database table is set to the `id` field, which is auto-generated by Sequelize. Its value is a unique identifier for the database record.
1. There isn't any index created upon `sequelize.sync()`, because we didn't define any index in the model.

### Model Options

Sequelize support additional options on the model. These options are passed on to the `Model#init` functions, and then used to define the table in the database.

Some notable options are:

| Option            | Default Value | Description                                                                                                                                                          |
| :---------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelName`       | optional      | Set name of the model. By default its same as Class name.                                                                                                            |
| `freezeTableName` | false         | If freezeTableName is true, sequelize use the model name to get the table name. Otherwise, the model name will be pluralized.                                        |
| `tableName`       | optional      | Override the name of the table directly. Otherwise, defaults to pluralized model name, unless `freezeTableName` is set.                                              |
| **`indexes`**     | optional      | Define an array of index                                                                                                                                             |
| `timestamps`      | true          | Adds createdAt and updatedAt timestamps to the database model.                                                                                                       |
| `paranoid`        | false         | If set to true, calling destroy will not delete the model, but instead set a deletedAt timestamp                                                                     |
| `createdAt`       | "createdAt"   | Override the name of the createdAt attribute. Timestamps must be true. Disable it if false.                                                                          |
| `updatedAt`       | "updatedAt"   | Override the name of the updatedAt attribute. Timestamps must be true. Disable it if false.                                                                          |
| `updatedAt`       | false         | Override the name of the deletedAt attribute. Timestamps must be true. Disable it if false.                                                                          |
| `hooks`           | optional      | An object of hook function that are called before and after certain lifecycle events. See: [hooks](https://sequelize.org/master/manual/hooks.html)                   |
| `validate`        | optional      | An object of model wide validations. See: [Validations and constraints](https://sequelize.org/master/manual/validations-and-constraints.html#model-wide-validations) |

See Params starting with `options.*` in [Model#init](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init) for the full list.

#### Primary Key

[If you don't define a primary key, then sequelize uses id by default. You could also use `primaryKey: true` on any column to mark it as primary key for the database table.](https://stackoverflow.com/questions/29233896/sequelize-table-without-column-id)

Sequelize will assume your table has a `id` primary key property by default, as well as support a Model without primary key (through `Model.removeAttribute('id')`). See: [Working with Legacy Tables#Primary Key](https://sequelize.org/master/manual/legacy.html#primary-keys)

#### Indexes

Sequelize supports adding indexes to the model definition which will be created on sequelize.sync(). See: [Indexes](https://sequelize.org/master/manual/indexes.html)

### Column Options

Apart from specifying the [DataTypes](https://sequelize.org/master/manual/model-basics.html#data-types) of the column, there are a lot more options that can be used to define a database column.
See Params starting with `attributes.column.*` in [Model#init](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init) for the full list.

Some notable column options are:

| Option                  | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                  |               | A string or a data type                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `allowNull`             | true          | If false, the column will have a NOT NULL constraint, and a not null validation will be run before an instance is saved.                                                                                                                                                                                                                                                                                                                                                  |
| `defaultValue`          |               | A literal default value, a JavaScript function, or an SQL function (see sequelize.fn)                                                                                                                                                                                                                                                                                                                                                                                     |
| `unique`                | false         | If true, the column will get a unique constraint. If a string is provided and multiple columns have the same string, all of them will form an composite unique index.                                                                                                                                                                                                                                                                                                     |
| `primaryKey`            | false         |
| `autoIncrement`         | false         |
| `autoIncrementIdentity` | false         |
| `references`            | null          | For references to another table, see associations.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `validate`              |               | An object of validations to execute for this column every time the model is saved. Can be either the name of a validation provided by validator.js, a validation function provided by extending validator.js (see the [Sequelize.prototype.Validator](https://github.com/sequelize/sequelize/blob/main/lib/sequelize.js#L1315-L1320) for more details), or a custom validation function. Custom validation functions could also be asynchronous or synchronous functions. |

#### Custom Getters and Setters

Sequelize allows you to define custom getters and setters for the attributes of your models. This feature is useful for data conversion on certain database columns, such as performing password hashing before sending/retrieving the data to/from the database.

#### Virtual Fields

[Virtual fields](https://sequelize.org/master/manual/getters-setters-virtuals.html#virtual-fields) are fields that Sequelize populates under the hood, but in reality they don't even exist in the database. Sequelize provides `DataTypes.VIRTUAL` that does not cause a column in the table to exist. However, the model will appear to have the virtual field after we define the custom getter.

## More about Model Definition

It's recommended to follow [Sequelize CRUD - Create](https://thoughtworks-sea.github.io/developer-training/#/backend/postgresql/sequelize-crud?id=create) and [Unit Testing with Jest and SuperTest](https://thoughtworks-sea.github.io/developer-training/#/backend/postgresql/postgres-testing?id=unit-testing-with-jest-and-supertest) before continuing to this section. Creating a database record will help better understand how a model could be use, and appreciate the differences for model definition.

The model that we define previously doesn't define any unique index.

Let's update the model as below.

1. Add unique index to the `name` field
2. Change the database column to snake_case via [the underscored option](https://sequelize.org/master/manual/naming-strategies.html)

```javascript
// simple-pokemon.model.js (simplified for readability)

...
SimplePokemon.init({
  name: {
    type: DataTypes.STRING,
    // unique: true // This column options is equivalent to the model options "indexes" below
  },
  ...
}, {
  ...
  tableName: 'Simple_Pokemon',
  indexes: [
  {
      unique: true,
      fields: ['name']
    }
  ],
  underscored: true
});

const synchronizeModel = async () => await SimplePokemon.sync({ force: true });
await synchronizeModel();
```

Upon starting the application, you will find in the logs, the SQL statements that Sequelize generated for us. Compare the logs as above, you will see the changes in database column naming strategy and a unique index being created.
Recap on the PostgreSQL basics, [PostgreSQL automatically creates a unique index when a primary key is defined for a table.](https://www.postgresql.org/docs/current/indexes-unique.html).

```sh
# previous logs
Executing (default): DROP TABLE IF EXISTS "Simple_Pokemon" CASCADE;
Executing (default): CREATE TABLE IF NOT EXISTS "Simple_Pokemon" ("id"   SERIAL , "name" VARCHAR(255), "japaneseName" VARCHAR(255), "baseHP" INTEGER, "category" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Simple_Pokemon' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;

# new logs with unique index
Executing (default): DROP TABLE IF EXISTS "Simple_Pokemon" CASCADE;
Executing (default): CREATE TABLE IF NOT EXISTS "Simple_Pokemon" ("id"   SERIAL , "name" VARCHAR(255), "japanese_name" VARCHAR(255), "base_h_p" INTEGER, "category" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Simple_Pokemon' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE UNIQUE INDEX "simple__pokemon_name" ON "Simple_Pokemon" ("name")
```

## Sequelize Validation & Database Constraints

### Validations vs Contraints

No SQL query will be sent to the database at all if a validation fails, but SQL query was performed in the case of constraint violations.

Read this page for details: https://sequelize.org/master/manual/validations-and-constraints.html .

### Sequelize Validation

Sequelize supports per-attribute level validation and model-wide validation. Validations are automatically run on create, update and save. You can also call validate() to manually validate an instance.
Refer to: https://sequelize.org/master/manual/validations-and-constraints.html#validators

- For field validator, we could define our custom validators or use several built-in validators.
- Model validator methods are called with the model object's context (`this`) and are deemed to fail if the custom validators throw an error.

So far, the `pokemon` model we created allow saving pokemon with name: empty string or undefined / `null`. You will see that the database record will be created for this JSON object.
```json
{
    "name": "",
    "japaneseName": "ピカチュウ",
    "baseHP": 35,
    "category": "Mouse Pokemon"
}
```

Let's try to update our model.
```javascript
SimplePokemon.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false, // mix of sequelize validaion and database constraints
    validate: {
      notEmpty: true, // sequelize validation only, don't allow empty strings
    }
  },
  ...
}
```

Restart the application, and retry. You should see the following in the application log.
- `ValidationError [SequelizeValidationError]: notNull Violation: SimplePokemon.name cannot be null`
- `ValidationError [SequelizeValidationError]: Validation error: Validation notEmpty on name failed`.

Also, you should find that the `NOT NULL` constraint is created in the column "name".
```sh
Executing (default): CREATE TABLE IF NOT EXISTS "Simple_Pokemon" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "japanese_name" VARCHAR(255), "base_h_p" INTEGER, "category" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
```