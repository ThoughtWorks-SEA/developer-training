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
Foo.hasOne(Bar, {
  foreignKey: 'myFooId'
});
Bar.belongsTo(Foo);

// Option 2
Foo.hasOne(Bar, {
  foreignKey: {
    name: 'myFooId',
  }
});
Bar.belongsTo(Foo);

// Option 3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId'
});

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

## Lab - Pokemon Trainer

Create a database to model the relationship: _A trainer that has many pokemons_ .

**1. Bootstrap project dependencies**

Follow previous notes to bootstrap with: `pg pg-hstore sequelize` , dev dependencies: `sequelize-cli` . 
Configure `sequelize-cli` and run relevant `sequelize-cli init` commands.

**2. Generate boiler plate for database strucure**

Run the following to generate database model and migration scripts. We will need to update the contents later.

```bash
// Generate a trainer and pokemon model
npx sequelize-cli model:generate --name Trainer --attributes username:string,password:string
npx sequelize-cli model:generate --name Pokemon --attributes name:string,japaneseName:string,baseHP:integer,category:string,trainerId:integer
```

References to create a closest attributes:
- https://github.com/sequelize/cli/blob/be5b445619b59115f36f06507bfff7aa87528db8/docs/FAQ.md#how-can-i-generate-a-model
- https://github.com/sequelize/cli/blob/be5b445619b59115f36f06507bfff7aa87528db8/src/helpers/model-helper.js#L10-L61

**3. Modify the Migration Scripts**

```js
```