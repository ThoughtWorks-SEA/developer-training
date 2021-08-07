# Sequelize / Postgres - Advanced Topics

## Transactions
Sequelize does not use transactions by default.
- [It's recommended to use managed transactions for production-ready usage of Sequelize](https://sequelize.org/master/manual/transactions.html)
- [Sequelize Hooks and Transactions](https://sequelize.org/master/manual/hooks.html#hooks-and-transactions)
- We could configure Sequelize ORM to use transaction, while `pg` driver \([node-postgres](https://github.com/brianc/node-postgres)\) [has no abstractions specifically around transactions](https://node-postgres.com/features/transactions).

## Hooks
- [Available hooks & Hooks Firing Order](https://sequelize.org/master/manual/hooks.html)

## Association
- [Hooks and association](https://sequelize.org/master/manual/hooks.html#associations) eg. for cascading delete
- [Eager Loading](https://sequelize.org/master/manual/eager-loading.html)

## Migration with Transaction
[When a migration performs two changes in the database](https://sequelize.org/master/manual/migrations.html#migration-skeleton), the following options are available to ensure that all instructions are successfully executed or rolled back in case of failure.
1. by using automatically-managed transaction
1. by using a manually-managed transaction

