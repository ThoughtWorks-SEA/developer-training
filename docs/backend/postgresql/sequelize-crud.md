# Sequelize CRUD

This page of notes is simplified from [Sequelize Core Concepts - Model Instances](https://sequelize.org/master/manual/model-instances.html). Please read the [Sequelize API Reference](https://sequelize.org/master/class/lib/model.js~Model.html) for more details.

## Pre-requisite
Assuming that you followed the notes in [Sequelize Basics](https://thoughtworks-sea.github.io/developer-training/#/backend/postgresql/sequelize-basics?id=create-a-simple-model), you should have created the `SimplePokemon` model for and acquired a database connection instance.

Alternatively, a model could be generated using `sequelize-cli`. This will generate different folder structure. However, [Migrations](https://sequelize.org/master/manual/migrations.html#project-bootstrapping) is another topic, which is recommended for production level software, however it requires manual configuration.
```sh
npx sequelize-cli init
npx sequelize-cli model:generate --name SimplePokemon --attributes name:string,japaneseName:string,baseHP:integer,category:string,nameWithJapanese:virtual
```
## Independent Imports of Sequelize Models

In the model that we have defined previously, the database table is synchronised whenever the model is imported, ie. Database table will be dropped whenever it's imported.

We need to some refactoring before we explore CRUD functions.
1. We will switch to request sequelize to synchronize all the models at once, and remove the database synchronisation code from `simple-pokemon.model.js`.
2. As [sequelize model is having dependency to sequelize connection](backend/postgresql/sequelize-basics?id=inject-sequelize-dependency-into-models), we will refactor the model to export a function to accept a database connection instance and return the Sequelize model.

After the refactoring, we could then import the `SimplePokemon` model into our preferred javascript file eg. "index.js", "create.js", without worry of the database connectivity.

`simple-pokemon.model.js`
```js
const { DataTypes, Model } = require('sequelize');

class SimplePokemon extends Model { }

const MODEL_NAME = 'SimplePokemon';

const initializeModel = (sequelizeConnection) => {
  SimplePokemon.init(
    {
      name: {
        type: DataTypes.STRING
      },
      japaneseName: {
        type: DataTypes.STRING
      },
      baseHP: {
        type: DataTypes.INTEGER
      },
      category: {
        type: DataTypes.STRING
      },
      nameWithJapanese: {
        type: DataTypes.VIRTUAL,
        get () {
          return `${this.name} ${this.japaneseName}`;
        },
        set (value) {
          throw new Error('Do not try to set the `nameWithJapanese` value!');
        }
      }
    },
    {
      sequelize: sequelizeConnection, // We need to pass the connection instance
      modelName: MODEL_NAME, // We could set the model name instead of using the Class name
      // freezeTableName: true, // We could skip the pluralization for database naming
      tableName: 'Simple_Pokemon' // We could lock the name of the database table directly
    }
  );
};

module.exports = (sequelizeConnection) => {
  initializeModel(sequelizeConnection);
  return SimplePokemon;
};
```

`index.js`
```js
const sequelizeConnection = require('./db/index.js');

// Entry point to try CRUD functions
const fakeEntryPoint = require('./fakeEntryPoint.js');

Promise
  .resolve(sequelizeConnection.sync({ force: true }))
  .then(logger.info('All models were synchronized successfully.'))
  .then(function () { fakeEntryPoint(); })

logger.info('Done!');
```

Create a `fakeEntryPoint.js` for the entry point for us to explore CRUD.

## Create

Although a model is an ES6 class, you should not create instances by using the `new` operator directly. Instead, Sequelize Model exposes 2 methods for specific process.
- [build](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-build): class-level method to create an object that represents data that can be mapped to a database record. This is a synchronous method that does not communicate with the database at all.
- [save](https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-save): instance-level method to save / persist the information into database. This is an asynchronous method, so you will need `await` or promise handling.

To facilitate the process, Sequelize Model offers another method to combines the above 2 into a single method.
- [create](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create): class-level method to create an object and save the database record. This is an asynchronous method, so you will need `await` or promise handling.

Use `Model#create` static method to create a new instance and save the record into the database table `Simple_Pokemon`.

```js
  // fakeEntryPoint.js

  const pikachu = {
    name: "Pikachu",
    japaneseName: "ピカチュウ",
    baseHP: 35,
    category: "Mouse Pokemon",
  };
  const created = await SimplePokemon.create(pikachu);

  console.log('Pikachu was saved to the database!');
  console.log(created); // Not recommended, since Sequelize instances have a lot of things attached. This might produce a lot of clutter.
  console.log(created.toJSON()); // The recommended way to log an instance, but do note that this might still log sensitive data stored in database.
```

Upon a successful save, the result of the `create` method is a promise which resolves to the saved.

```json
{
    "nameWithJapanese": "Pikachu ピカチュウ",
    "id": 1,
    "name": "Pikachu",
    "japaneseName": "ピカチュウ",
    "baseHP": 35,
    "category": "Mouse Pokemon",
    "updatedAt": "2021-08-15T11:46:25.092Z",
    "createdAt": "2021-08-15T11:46:25.092Z"
}
```

Looking at the result, the following fields are returned in addition to the attributes that we've defined in the model and the information we passing in.
The additional fields are generated by Sequelize.
- `id`: Primary Key generated by Sequelize, if Primary Key is not defined.
- `createdAt`, `updatedAt`: This timestamp generated by Sequelize (by default) which could be turn off.

If you try to create another pokemon with the same `id` value,
```js
// Run this code after creation of pickachu.
  const pikachu2 = {
    id: 1,
    ...pikachu,
  }
  const created2 = await SimplePokemon.create(pikachu2)
  console.log(created2.toJSON());
```

you will find the application is hitting an error `UniqueConstraintError [SequelizeUniqueConstraintError]`.
```sh
  UniqueConstraintError [SequelizeUniqueConstraintError]: Validation error
  ...
  fields: { id: '1' },
  parent: error: duplicate key value violates unique constraint "Simple_Pokemon_pkey"
```

Change `id` to 2 and restart your application. You will find 2 identical pokemons in the database table `Simple_Pokemons` (both are having same attributes). This is because we didn't add any unique constraint onto the name column.

Let's try to update our model slightly.
1. Following the notes in [Sequelize Basics - More about Model Definition](backend/postgresql/sequelize-basics?id=more-about-model-definition).
In the example, we will add an unique index to the `name` field. Let's restart your application with the codes above to create 2 pokemons named `pikachu` with differrent `id`. What do you find?
1. Next, we explore [field validation](backend/postgresql/sequelize-basics?id=sequelize-validation) done by Sequelize.

## Read

The returned result will be an array of Sequelize Model instances.

### FindAll

`findAll()` is the the main way we query the database with sequelize. The first parameter of find is a **options** object. Refer to the [API Reference](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll) for the list of supported options. If an empty object is passed or nothing is passed, then it will return all records.

Some notable options are grouped into:
- options for usual SQL query syntax
  - `where`
  - `order`
  - `having`
- additional options provided by Sequelize and translated into SQL query syntax
  - `attributes`
  - `include`: for list of associations to eagerly load using a left join.
  - `limit` and `offset`: for paginated result
  - `transaction`
  - `raw`: If true, sequelize will not try to format the results of the query, or build an instance of a model from the result. You are responsible to build the model.
  - `searchPath`: An optional parameter (string) to specify the [schema search_path (Postgres only)](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PATH)
  - `rejectOnEmpty`: Throws an error when no records found. **Default: false**
- others (eg. for performance analysis)
  - `logging`
  - `benchmark`

#### Filtering Operators

In Sequelize, you can simply query with a powerful `where` clause. You can filter through Pokemon by their attributes, using `where`. Refer to [Querying Operators](https://sequelize.org/master/manual/model-querying-basics.html#operators).

https://sequelize.org/master/manual/model-querying-basics.html#postgres-only-range-operators
https://sequelize.org/master/manual/model-querying-basics.html#operators

We can use comparison operators `lt`, `gt`, `lte`, and `gte`.

Suppose you want to find characters whose category contains 'turtle'. In SQL, you would use the LIKE operator. Sequelize offers operators like `like`, `iLike`, `regexp`, `notRegexp`.

```js
const foundPokemons = await SimplePokemon.findAll({
  where: {
    baseHP: {
      [Op.gt]: 40
    }
  }
});

const pokemons = await SimplePokemon.findAll({
    where: {
      [Op.or]: [
        { name : 'Pikachu'},
        { baseHP: 59 }
      ]
    }
  });
```

## Update

The model static method `update()` update multiple instances that match the where options.

```js
// No returning records by default
const numberOfAffectedRecords = await SimplePokemon.update({ baseHP: 100 }, {
  where: {
    category: {
      [Op.like]: '%Turtle%'
    }
  }
});

// With updated records
const [numberOfAffectedRecords, updatedPokemons] = await SimplePokemon.update({ baseHP: 100 }, {
  where: {
    category: {
      [Op.like]: '%Turtle%'
    }
  },
  returning: true
});
```

How to update just one pokemon? We could use [count()](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-count) to validate first.
- Try running Sequelize with debug logging to see what queries Sequelize executes.

### update(), upsert(), save()

| Method           | Level          | Description                                                                                                                                                                                                                                                                                    |
| :--------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `async update()` | Class-level    | Update multiple instances that match the where options. Each row is subject to validation before it is inserted. The whole insert will fail if one row fails validation.                                                                                                                       |
| `async upsert()` | Instance-level | This is the same as calling `set()` and then calling `save()` but it only saves the exact values passed to it, making it more atomic and safer.                                                                                                                                                |
| `async upsert()` | Class-level    | Insert or update a single row. An update will be executed if a row which matches the supplied values on either the primary key or a unique key is found. Requires the unique index to be defined in sequelize model as well as the database table. Run validations before the row is inserted. |
| `async save()`   | Instance-level | Validates this instance, and if the validation passes, persists it to the database. This method is optimized to perform an UPDATE only when the fields have changed. If nothing has changed, no SQL query will be performed. This method is not aware of eager loaded associations.            |

## Delete

The model static method `delete()` could delete multiple instances, or set their deletedAt timestamp to the current time if paranoid is enabled.

```js
const numberOfDeletedRecord = async (id) => {
  await SimplePokemon.destroy({
    where: {
      id: 1
    }
  })
};

// Truncate the table
await SimplePokemon.destroy({
  truncate: true
});
```

## What is atomicity?

An atomic operation is an operation that ensures whatever it is editing is only currently edited by the operation. When you want to update a database record, atomicity means that the database record is locked (not available to other operations) until the database record is updated.

If we do not have atomicity and there are 2 operations to be runs at the same time (concurrent calls),
1. Update pokemon1 baseHP++
2. Update pokemon1 baseHP++
Both operations will find a pokemon with baseHP that is 4, then both will add 1 to `baseHP = 4` and update the baseHP of the same pokemon to `baseHP = 5`. The final baseHP will be 5 instead of 6.

Sequelize has built-in support for optimistic locking through a model instance version count.

Optimistic locking is **disabled by default** and can be enabled by setting the version property to true in a specific model definition or global model configuration. See [model definition](https://sequelize.org/v5/manual/models-definition.html#optimistic-locking). Optimistic locking allows concurrent access to model records for edits and prevents conflicts from overwriting data. It does this by checking whether another process has made changes to a record since it was read and throws an OptimisticLockError when a conflict is detected.

## FYI: Sequelize Convenience Methods for aggregations

Sequelize Model offers some convenient methods to support operations with query with database. Please read their documentation and [API Reference - Model](https://sequelize.org/master/class/lib/model.js~Model.html) for more.
- [findAndCountAll](https://sequelize.org/master/manual/model-querying-finders.html#-code-findandcountall--code-) : This is useful while we want to have paginated result.
- [Utility Methods](https://sequelize.org/master/manual/model-querying-basics.html#utility-methods) like `count`, `max`, `min`, `sum`

## FYI: Raw Query
As Sequelize offers good database abstraction to the developers and the the developers to be familiar with database dialect to dealing with raw queries, we are not covering this topic in the course.

The `sequelize.query` method returns a Promise, so that they can be used with async/await. It also allows you to map a query to a predefined model.

You could read [Raw Queries](https://sequelize.org/master/manual/raw-queries.html) for details.