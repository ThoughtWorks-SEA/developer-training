# Postgres testing

## Mock database vs real database

If we are writing unit tests, by definition we need to mock the interaction with database and we don't depend on a real database.

For integration test/contract test (e.g. on web service built using Express + Postgres), we need to get the server up and running before we can send requests to it. Most of the time, that would require us to have a real database.

If somehow your tests need to depend on a real database, you need to make sure each test case has a clean database to start with. One solution is to set up and tear down all the tables in the database to ensure there are no side effects between unit tests. In practice, this means a `beforeEach()` where you reconnect to the database and drop all tables, and an `afterEach()` where you disconnect from the database.

Another solution is to set up an **in-memory database** for each test case programmatically to avoid some of the issues with setting up a real database and sharing one database with all tests.

## pg-mem

To write API tests for an Express app that uses Postgres as the database, we are going to use a library called **pg-mem**. It spins up an in-memory instance of a Postgres database, which is faster than running a separate Postgres instance.

The library helps to give us a clean/empty database for each test case, so that the test cases do not interfere with each other (e.g. if a test case fails and leave some garbage data in its copy of database, that failure will not affect other test cases because each test case starts with a clean database).

Thus along with jest and supertest, we will need pg-mem.

```sh
npm install pg-mem --save-dev
```

Before writing any test...

<!-- TODO: example of setting up and tearing down db in beforeEach/afterEach -->

```
WIP
```

First test for GET `/pokemons`

<!-- TODO: example of GET test with .toMatchObject -->

```
WIP
```

For testing database, very often we will use `toMatchObject`.
This is because the database objects will have the extra attribute `id`.

https://stackoverflow.com/questions/45692456/whats-the-difference-between-tomatchobject-and-objectcontaining

## Exercises

Integrate Postgres into your testing for your song routes.
