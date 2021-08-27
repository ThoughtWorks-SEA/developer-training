## Defining Associations

This section of notes are extracted and summarised from various parts of [Sequelize Manual](https://sequelize.org/master/manual/assocs.html).

Sequelize supports the standard associations: `One-To-One`, `One-To-Many` and `Many-To-Many`.

To do this, Sequelize provides four types of associations that should be combined to create them:
- The `hasOne` association
- The `belongsTo` association
- The `hasMany` association
- The `belongsToMany` association

The Sequelize associations are defined in pairs. In summary:
- To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
- To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
- To create a Many-To-Many relationship, two belongsToMany calls are used together.

There are few ways to define associations in Sequelize. The hasOne and belongsTo calls will infer that the foreign key to be created as `fooId`. To use a different name, the 4 options are equivalent.
```javascript

// Option 1
Foo.hasOne(Bar, { foreignKey: 'myFooId' });
Bar.belongsTo(Foo);

// Option 2
Foo.hasOne(Bar, {
  foreignKey: {
    name: 'myFooId'
  }
});
Bar.belongsTo(Foo);

// Option 3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, { foreignKey: 'myFooId' });

// Option 4
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'myFooId'
  }
});
```

An instance can be created with nested association in one step, provided all elements are new. In contrast, performing updates and deletions involving nested objects is currently not possible. For that, you will have to perform each separate action explicitly. See: https://sequelize.org/master/manual/creating-with-associations.html

### Options in Defining an Association

 Option           | Type             | Default Value | Description
 :--------------  | :--------------- |:------------- | :---------------------
 `foreignKey`     | string or object | optional      | The string will be used for the database column name to store the foreign key reference. The object will be used as the column options, such as such `type`, `allowNull`, `defaultValue`, etc. 
 `onDelete`       | | `SET NULL` or `CASCADE` | The possible choices are `RESTRICT`, `CASCADE`, `NO ACTION`, `SET DEFAULT` and `SET NULL`.
 `onUpdate`       | | `CASCADE` | The possible choices are `RESTRICT`, `CASCADE`, `NO ACTION`, `SET DEFAULT` and `SET NULL`.
 `through`        | | |
 `uniqueKey`      | | |

### Defining One-To-One , One-To-Many Associations
We could add `hasOne`, `belongsTo`, `hasMany` to on to a model to denote the association or relationship between the two models. The order in which the association is defined is relevant.
These three calls will cause Sequelize to automatically add foreign keys to the appropriate models.

The defaults for the One-To-One and One-To-Many associations is:
- `SET NULL` for `ON DELETE`
- `CASCADE` for `ON UPDATE`

### Mandatory versus Optional Associations
By default, the association is considered optional. To define mandatory associations, it is just a matter of specifying `allowNull: false` in the foreign key options.

### Defining Many-To-Many Associations
Many-To-Many associations connect one source with multiple targets. This cannot be represented by adding one foreign key to one of the tables. Thus, the concept of a Junction Model is used. This will be an extra model (and extra table in the database) which will have two foreign key columns and will keep track of the associations. The junction table is also sometimes called join table or through table.

Assuming that you have defined model `User` and `Profile`. The simplest way to define the Many-to-Many relationship between entity `User` and entity `Profile` is:
```
User.belongsToMany(Profile, { through: 'User_Profiles' });
Profile.belongsToMany(User, { through: 'User_Profiles' });
```

You could also define a model to be used as the through table. It provides several advantages, for example, you could define more columns to track extra information at the through table. See: https://sequelize.org/master/manual/advanced-many-to-many.html
```
const User_Profile = sequelize.define('User_Profile', {}, { timestamps: false });
User.belongsToMany(Profile, { through: User_Profile });
Profile.belongsToMany(User, { through: User_Profile });
```

Unlike One-To-One and One-To-Many associations, the defaults Many-To-Many relationships is:
- `CASCADE` for both `ON DELETE` and `ON UPDATE`

There are 2 ways to define Many-To-Many relationship. Do take note of the PostgreSQL statement that generated, particularly on 
- UNIQUE constraint on the columns `MovieId` and `ActorId`
- nullable of the columns `MovieId` and `ActorId`
- `ON DELETE` and `ON UPDATE` action

This method will generate database model with `CASCADE` for both `ON DELETE` and `ON UPDATE`. 
```javascript
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
```
yields
```sql
CREATE TABLE IF NOT EXISTS "ActorMovies" (
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "MovieId" INTEGER REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "ActorId" INTEGER REFERENCES "Actors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("MovieId","ActorId")
);
```

This method will generate database model with `RESTRICT` for `ON DELETE` and `CASCADE` for `ON UPDATE`.
```javascript
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
const ActorMovies = sequelize.define('ActorMovies', {
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie, // 'Movies' (table name) is recommended instead of the Model.
      key: 'id'
    }
  },
  ActorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Actors', // Table name is recommended instead. If this column references another table, provide it here as a Model, or a string.
      key: 'id'
    }
  }
});
Movie.belongsToMany(Actor, { through: ActorMovies });
Actor.belongsToMany(Movie, { through: ActorMovies });
```
yields
```sql
CREATE TABLE IF NOT EXISTS "ActorMovies" (
  "MovieId" INTEGER NOT NULL REFERENCES "Movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,      -- Note: NOT NULL , RESTRICT
  "ActorId" INTEGER NOT NULL REFERENCES "Actors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,      -- Note: NOT NULL , RESTRICT
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE ("MovieId", "ActorId"),     -- Note: Sequelize generated this UNIQUE constraint
  PRIMARY KEY ("MovieId","ActorId")
);
```

### Defining Reference Key in a model
Note that on the above `Many-To-Many` example, we are manually defining a key that references another model. It's not usual to do this, but if you have to, you should use the table name there. This is because the reference is created upon the referenced table name. Assuming that the model was created with the default settings (Sequelize making its underlying table automatically pluralized).

References:
- https://sequelize.org/master/manual/naming-strategies.html#when-defining-a-reference-key-in-a-model

## Migration Scripts

Define through `sequelize-cli`.

References to define migration files:
- https://levelup.gitconnected.com/creating-sequelize-associations-with-the-sequelize-cli-tool-d83caa902233

## Lab (One-To-Many)

**Pokemon Trainer**

Create an application with the following.
1. A trainer has many pokemons.
2. A trainer has a login profile: unique username and password needs to be present.
3. Registration of pokemons and trainers could be done independently.
4. Retrieving a trainer record should show their assigned pokemons as well.
5. A trainer could stop training a pokemon at any time.
6. A pokemon could only have at most 1 trainer at any time. They could have no trainer and they could change trainer too.
7. Trainers and Pokemons are free to leave this system.
8. We create the password with a default value in our database. _Assuming that in the future, the trainers could only manage their pokemons upon login. He/She needs to set his/her password on first login._

**1. Bootstrap project dependencies**

Follow previous notes to bootstrap with: `pg pg-hstore sequelize` , dev dependencies: `sequelize-cli` . 
Setup `.sequelizerc` to configure `sequelize-cli` and run relevant `sequelize-cli init` commands.

**2. Generate boiler plate for database structure**

Run the following to generate database model and migration scripts. We will need to update the contents later.

```bash
// Generate a trainer and pokemon model
npx sequelize-cli model:generate --name Trainer --attributes username:string,password:string
npx sequelize-cli model:generate --name Pokemon --attributes name:string,japaneseName:string,baseHP:integer,category:string,trainerId:integer
```

The data types support:
- [Sequelize API documentation](https://sequelize.org/master/class/lib/data-types.js~VIRTUAL.html) _At the point of writing, the bottom left of this page listed the supported values_
- [GitHub example (Sequelize CLI)](https://github.com/sequelize/cli/blob/be5b445619b59115f36f06507bfff7aa87528db8/docs/FAQ.md#how-can-i-generate-a-model)
- [GitHub code (Sequelize CLI)](https://github.com/sequelize/cli/blob/be5b445619b59115f36f06507bfff7aa87528db8/src/helpers/model-helper.js#L10-L61)

Notes: _If you are updating an existing model, it's expected to fail out. Proceed to next step instead._

**3. Create / Modify the Migration Scripts and Models**

Notes: _If you are updating and existing database model, run migration:generate instead of model_generate._

```sh
npx sequelize-cli migration:generate --name update-pokemon-with-trainer-id
```

Changes to the database model:
- Modify pokemon:
  - add `allowNull: false` and `unique: true` to `name` field.
  - associate with Trainer model
- Modify trainer:
  - associate with Pokemon model

Add defination to the migration scripts:

```js
// up
await queryInterface.addColumn('Pokemons', 'trainerId', Sequelize.INTEGER);

// down
await queryInterface.removeColumn('Pokemons', 'trainerId');
```

**4. Create NodeJS/Express Application**

_Skip this if you want a table to be created strictly only through migration_, see section below: [Creating Table via Sequelize vs Migration](backend/postgresql/sequelize-associations?id=creating-table-via-sequelize-vs-migration)

Configure the app to sync models at start up and verify the SQL commands in start up logs.
- Reference: https://levelup.gitconnected.com/sequelize-cli-and-express-fb3ddefb9786

**5. Try out the Sequelize Migration**

Compare the SQL statements from `sequelize` (app lifecycle) and `sequelize-cli` (independent database migrations).
For production, we might want to run migration in separate operations, thus it is important to ensure the definition of the database tables are the same, independent of environment and how the database table being set up.

Here is the steps.
1. Note down the SQL statements in application start up logs.
2. Drop the development database and run the `sequelize-cli db:migrate`. You could skip this and just compare if you have applied all migration script.
3. Compare the following in the application SQL and the existing SQL definition of the table structure.
   - database tables definition
   - constraints, such as primary key, foreign key and unique constraints
   - indexes

Example on how we patch in the missing constraint.

```sh
npx sequelize-cli migration:generate --name update-pokemon-with-trainer-foreign-key
```

```js
// up
await queryInterface.addConstraint('Pokemons', {
  fields: ['trainerId'],
  type: 'foreign key',
  name: 'Pokemons_trainerId_fkey',
  references: { //Required field
    table: 'Trainers',
    field: 'id'
  },
  onDelete: 'no action',
  onUpdate: 'cascade'
});

// down
await queryInterface.removeConstraint('Pokemons', 'Pokemons_trainerId_fkey');
```

**6. Implement the CRUD**

Try to do TDD approach. For convenience of testing, you might want to begin with a service / controller without the routing test.

## Creating Table via Sequelize vs Migration

It is important to ensure the definition of the database tables are the same, independent of environment and how the database table being set up.

Extracted from [Sequelize Migration Guide](https://sequelize.org/master/manual/migrations.html#creating-the-first-model--and-migration-):

> **Note**: Sequelize will only use Model files, it's the table representation. On the other hand, the migration file is a change in that model or more specifically that table, used by CLI. Treat migrations like a commit or a log for some change in database.

When a table is created via `db.sequelize.sync()` , ie. the database table wasn't created via migration, the SQL generated by `sequelize` have additional constraints with it, because `sequelize` is using Model which has the concept of associations. When we are creating a table via migration, **we need to write the migration scripts** ourselves, to include information that is abstracted and handle by `sequelize`. Similarly, when you add a unique contraints after a table is created to a column, you will need to create a migration script to add the unique constraint at the same time.

**Hint**: To simplify the efforts to write the migration script, we could borrow sequelize by comparing
- the SQL statements that are generated by a fresh app with fresh database, usually in developer machine
- the SQL representations of all the associated models, eg. the `REFERENCES` and the `ON DELETE` and `ON UPDATE` actions
- run `sequelize-cli migration:generate` command and update the content by referring to [Sequelize Query Interface](https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html).