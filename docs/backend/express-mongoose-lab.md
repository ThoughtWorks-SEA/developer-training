# Express.js + Mongoose lab

## who-is-next

Let's continue working on our [`who-is-next`](backend/express-lab.md) project!

We already have these set up:

- CRUD API
- Routers
- Default error handler
- Joi validations

We'll need to add a database.

## Mongo and Mongoose

```bash
npm install mongoose
```

### Connect to database

src/utils/db.js

```js
const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useFindAndModify: false, // For find one and update
  useCreateIndex: true, // for creating index with unique
};

const dbName = "whoisnext";
const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/" + dbName;
mongoose.connect(dbUrl, mongoOptions);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`connected to mongodb at ${dbUrl}`);
});
```

### Create a Jumpling model and schema, with validation

A Jumpling should minimally have a name, so the `name` property should be validated to be `required: true`:

src/models/jumpling.model.js

```javascript
const jumplingSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
});
```

You can add more properties if you like, e.g. `favouriteFood` 🥟

### Mongoose validation? What about our Joi validation?

Although you can have both Joi validation and Mongoose validation, in our current context it may seem a bit repetitive. To keep our code cleaner and to avoid any unnecessary roadblocks for the lab, we can get rid of the Joi validation and simply use Mongoose validation via the schema definition.

There are packages like [`joigoose`](https://www.npmjs.com/package/joigoose) that you may be interested to experiment with:

> joigoose: Joi validation for your Mongoose models without the hassle of maintaining two schemas.

The difference between the two is that Joi validation validates the data at the **request** level, while Mongoose validation validates the data at the **application** level.

### Utilise new Jumpling model in routes

Previously, we used `let jumplings = []` in our jumplings router.

Let's implement it with the actual Jumpling model now; query the actual db, and make changes to the db using Mongoose.

```javascript
const Jumpling = require("../models/jumpling.model");
```

## Testing

### Setting up db for testing

Note that there are many ways to set up the db, and it all boils down to personal preference and what works for the project and team. Refer to the notes in this repo for some options on how to approach this: https://github.com/sabrina-tw/express-songs#setting-up-db-for-testing

Feel free to also explore alternative approaches!

### Jest + Supertest

Let's implement our tests with database:

```javascript
const app = require("../src/app");
const request = require("supertest");
const Jumpling = require("../src/models/jumpling.model");
const dbHandlers = require("../test/dbHandler");

describe("jumplings", () => {
  describe("GET /jumplings", () => {
    it("should retrieve list of jumplings", async () => {

    });
  });

  describe("GET /jumplings/presenter", () => {
    it("should return a random jumpling", async () => {

    });
  });

  describe("GET /jumplings/:name", () => {
    it("should retrieve jumpling with requested name", async () => {

    });
  });

  describe("POST /jumplings", () => {
    it("should create new jumpling if fields are valid", async () => {

    });

    it("should throw error if name is empty", async () => {

    });

    it("should throw error if name is too short", async () => {

    });
  });

  describe("PUT /jumplings/:id", () => {

    });

    it("should throw error if name is empty", async () => {

    });

    it("should throw error if request body is not json", async () => {

    });
  });

  describe("DELETE /jumplings/:id", () => {
    it("should delete jumpling if jumpling exists", async () => {

    });
  });
});
```

## Add authentication to protect routes

Following the guide from our [security jwt notes](backend/security-jwt?id=using-cookies-and-same-origin-policy), set up an `User` model with `username` and `password` to protect these routes:

- POST /jumplings
- PUT /jumplings:id
- DELETE /jumplings:id

We'll need to implement a protectRoute middleware, e.g.:

```js
const protectRoute = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized");
    }
    req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).end();
  }
};
```
