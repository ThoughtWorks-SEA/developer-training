# Sequelize / Postgres - Advanced Topics

## Association
- [Hooks and association](https://sequelize.org/master/manual/hooks.html#associations) eg. for cascading delete
- [Eager Loading](https://sequelize.org/master/manual/eager-loading.html)

## Migrations
The previous content are running the database synchronisation together with the App, through the usage of `sync({ force: true })` or `sync({ alter: true })` in Sequelize or Sequelize Models. This is [not recommended for Production-level due to potential destructive operations](https://sequelize.org/master/manual/model-basics.html#synchronization-in-production). Often, in production, we need to run migration separate of the App lifecycle, eg. separate database credentials for access control.

[Migrations](https://sequelize.org/master/manual/migrations.html) is an advanced concepts, however it requires [`sequelize-cli` npm package](https://www.npmjs.com/package/sequelize-cli), followed by [manual configuration for the migration scripts](https://sequelize.org/master/manual/migrations.html#migration-skeleton).

After installing the CLI, we could use the following to [bootstrap a project](https://sequelize.org/master/manual/migrations.html#project-bootstrapping) and generate a model with a migration file.
```sh
npx sequelize-cli init
npx sequelize-cli model:generate --name SimplePokemon --attributes name:string,japaneseName:string,baseHP:integer,category:string,nameWithJapanese:virtual
```

The will also generate different folder structure by default, which includes:
- `config/`, contains config file, which tells CLI how to connect with database.
- `models/`, contains all models for your project. **This set of artifacts are supposedly shared with the App codes.**
- `migrations/`, contains all migration files. **By default, migration history are logged into `SequelizeMeta` table in the database.**
- `seeders/`, contains all seed files. This is useful to pre-populate some sample data or test data. **Changes are not logged by default.**

Of course, Sequelize offers support to override the default settings through `.sequelizerc` file as well as to support Dynamic Configuration.

It worth to take note that, in Sequelize, the migration file is a change in that model or more specifically that table, used by CLI. We should treat migrations like a commit or a log for some change in database.
On the other hand, Sequelize will only use Model files as the table representation. Without using `sync()` functions provided by Sequelize or Sequelize Model, we could possibly encounter the following Application errors when a database table is not present when the Application is expecting it. Thus, this demonstrate segregation of concern for access control, which is nice-to-have for production-level security.
```sh
DatabaseError [SequelizeDatabaseError]: relation "Simple_Pokemon" does not exist
```

While the `sequelize` npm ORM library seems to be functional with ES6 syntax in the backend application, the configuration file `.sequelizerc` doesn't support ES6 syntax out-of-box, [it requires additional library `babel-register` to run with `sequelize-cli`](https://sequelize.org/master/manual/migrations.html#using-babel). Thus, we will need to take into consideration about how we could structure our project to support 2 seperate NodeJS modules, to perform.
- Database Migration
- Application Lifecyle with Database Access

## Transactions
Sequelize does not use transactions by default.
- [It's recommended to use managed transactions for production-ready usage of Sequelize](https://sequelize.org/master/manual/transactions.html)
- [Sequelize Hooks and Transactions](https://sequelize.org/master/manual/hooks.html#hooks-and-transactions)
- We could configure Sequelize ORM to use transaction, while `pg` driver \([node-postgres](https://github.com/brianc/node-postgres)\) [has no abstractions specifically around transactions](https://node-postgres.com/features/transactions).

### Migration with Associated Models and Transactions
As Sequelize migration files require manual set up, or custom definition, it could be more complicated to create migration files for **associated models**.

For **Transaction support for Migration**, the following options are available to ensure that all instructions are successfully executed or rolled back in case of failure.
1. by using automatically-managed transaction
1. by using a manually-managed transaction

**Hint**: Refer to [Sequelize Migrations - Migration Skeleton](https://sequelize.org/master/manual/migrations.html#migration-skeleton).

## Sequelize Hooks
- [Available hooks & Hooks Firing Order](https://sequelize.org/master/manual/hooks.html)
