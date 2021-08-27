## Lab: Quick start security-jwt

Let's create a new simple project to practice.

```bash
mkdir security-jwt
cd security-jwt
npm init -y
npm install express dotenv
npm install nodemon --save-dev
echo "node_modules" >> .gitignore
echo ".env" >> .gitignore
git init
```

You'll also need to create your `index.js` and `app.js` files.

Add the usual code necessary to start your server in these files (refer to your old practice projects!).

Remember to add your start scripts in your `package.json` file:

```js
"start": "node index.js",
"start:dev": "nodemon index.js",
```

Remember to add the default error handler in your app.js, so that we can pass on errors simply by using `next(err)` in a try...catch:

```js
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});
```

### Using cookies and same origin policy

For us to read cookies, we need `cookie-parser`.

```
npm install cookie-parser
```

In app.js, we use this middleware.

```js
// app.js
const cookieParser = require("cookie-parser");

app.use(cookieParser());
```

### Install json web token and bcryptjs

Install the star of the show, the token we will be creating and reading.

```
npm install jsonwebtoken
```

We shall use bcryptjs (which uses bcrypt) for hashing our passwords.

```
npm install bcryptjs
```

### Set up Sequelize

Follow the quick start guide [here](backend/postgresql/sequelize-quick-start)

### Create a Trainer model with username and password

Run these commands in the terminal:

```bash
// Generate a trainer model
npx sequelize model:generate --name Trainer --attributes username:string,password:string
```

Take note that this generation script will create 2 files: a model class file, and a migration file.

```bash
New model was created at security-jwt/db/models/trainer.js .
New migration was created at security-jwt/db/migrations/20210823035441-create-trainer.js .
```

### Add hooks to hash Trainer password

See [guide on hashing passwords](backend/postgresql/sequelize-hooks-hashing-passwords)

### Updating the Trainer migration file

A database migration system captures every single changes to the database.

It is used to keep the states of the database in every environment in sync.
For example, here are some common issues faced with syncing database states

1. Production tables should not be dropped, changes should be added incrementally
   - We create a migration file that adds a new column to an existing table and let sequelize migration handles the updating of states
1. Production database's state is different and lag behind development's database
   - We can easily test if the new database changes will cause a conflict to the existing production state by running migrations
   - Migration files also keep track of the individual schema changes in the codebase

Let's go ahead and add the unique and allowNull keys to keep the migration file behavior in sync with the model file.

```js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Trainers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, // here
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // here
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Trainers");
  },
};
```

### Running the Trainer migration file

Important difference between migrations and models

- Migration keep track of the changes and running migrations make the changes to the database directly.
- Models represent the database tables by mapping it into an object we can refer to in the codebase

Run this command to create the Trainer table in your database
`npx sequelize db:migrate`

- Running this command multiple times will not cause any conflicts as it will only run new migration files once
- Sequelize knows which migration files are new as it keeps track of database states with the metadata captured from each migration

**A Tip for migration is to always make sure changes to a database state can be undo and redo without breaking anything**

So it is a good practice to try the rollback/undo script when testing your migration scripts

```
npx sequelize db:migrate
npx sequelize db:migrate:undo
npx sequelize db:migrate
```

### Connect and initialise database for the main app

app.js

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models/index");

// sync will make sure the that the database is connected and the models are properly setup on app startup
db.sequelize.sync();

const app = express();
app.use(cookieParser());

app.use(express.json());

module.exports = app;
```

### New trainer route for creating a new Trainer

routes/trainers.js

```js
const express = require("express");
const db = require("../models/index");

const router = express.Router();

// Add POST /trainers route
router.post("/", async (req, res) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
```

### Add trainer route to app.js

Add trainer route before the exporting the app function

```js
const trainersRouter = require("./routes/trainers.js");
app.use("/trainers", trainersRoutes);
```

index.js

```js
const app = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
```

#### Test if setup is working correctly

Using [Postman](https://www.postman.com/downloads/), try to create a Trainer through the `POST` method and `http://localhost:XXXX/trainers` request URL.

You should also include some data in the body (body -> raw -> JSON), e.g.:

```json
{
  "username": "ash3",
  "password": "iWannaB3DVeryBest"
}
```

I can create trainers now! Note that the hash is different even for same passwords. This is thanks to the salting of bcrypt.

### Generating a JWT secret

<!-- WIP -->

How to generate a good `JWT_SECRET_KEY`? Because we use HS256 algoithm for the signature, we should have a 256 bits key of 32 characters.

You can generate a good random 256 bits key (crypographically strong pseudorandom) with

```sh
node -e "console.log(require('crypto').randomBytes(256 / 8).toString('hex'));"
```

You can also generate a base64 key with:

```sh
node -e "console.log(require('crypto').randomBytes(256 / 8).toString('base64'));"
```

If you choose to use a base64 key, read the key into a Buffer using `Buffer.from(key, "base64")` and use it with `jwt.sign` and `jwt.verify`.

Save it in `.env` file and do not commit it. Remember to add the `.env` file to `.gitignore`.

```
JWT_SECRET_KEY=udhwhd89237er8hejkfnekf28ynf2397r5983tryn938gh34589
```

### Generating a JWT token and finding the secret

- Create a `jwt.js` file inside the config folder, with the `getJWTSecret` function.

config/jwt.js

```js
const jwt = require("jsonwebtoken");

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing secrets to sign JWT token");
  }
  return secret;
};

const createJWTToken = (username) => {
  const today = new Date();
  const exp = new Date(today);

  const secret = getJWTSecret();
  exp.setDate(today.getDate() + 60); // adding days

  const payload = { username: username, exp: parseInt(exp.getTime() / 1000) };
  const token = jwt.sign(payload, secret);
  return token;
};

module.exports = createJWTToken;
```

For your tests and your code to be able to find the `JWT_SECRET_KEY`, you can load the environment variables using `dotenv` in **app.js**.

Place this line at the top of your app.js:

```js
require("dotenv").config();
```

#### More on the exp field in the JWT payload

In the example above, the expiration date of the JWT token is set to 60 days later after it's generated. Then the expiration time is saved into the exp field of the JWT token.

What is this exp field? Why must I use this term?

It represents **Token Expiration,** and you can find [more details here](https://www.npmjs.com/package/jsonwebtoken#token-expiration-exp-claim).

Once this field is set in a token, it's validated later on when we call the jwt.verify(token, secret). A token that passes the expiration time will fail the verification.

### Protect a route

Now that we have our `JWT_SECRET_KEY` set up, let's create a `protectRoute` middleware:

middleware/protectRoute.js

```js
const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized");
      /* Alternatively, you can set a default error handler in app.js instead and do this:
        const err = new Error("You are not authorized");
        next(err);
      */
    } else {
      //`req.cookies` is populated by the `cookie-parser` middleware.
      req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = {
  protectRoute,
};
```

To add the feature of allowing users to search for trainers by their username, add a new GET /trainers/:username route:

routes/trainers.js

```js
router.get("/search/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    // [db.Sequelize.Op.iLike] allows you to do case-insensitive + partial querying
    // e.g. "Sa" will return Samantha, Samuel..
    const trainer = await db.Trainer.findAll({
      where: { username: { [db.Sequelize.Op.iLike]: "%" + username + "%" } },
    });
    res.send(trainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
```

1. Create a Trainer with username and password, using POST /trainers
1. You should be able to GET the trainer using /trainers/:username

What if we only want authenticated users to access this endpoint?

We can protect the endpoint by using the `protectRoute` middleware we created earlier:

```js
const { protectRoute } = require("../middleware/protectRoute");

router.get("/search/:username", protectRoute, async (req, res, next) => {
  try {
    const username = req.params.username;

    const trainer = await db.Trainer.findAll({
      where: { username: { [db.Sequelize.Op.iLike]: "%" + username + "%" } },
    });
    res.send(trainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
```

Now, try making a call to `GET /trainers/:username` again.

You should see an error: "You are not authorized". In order to be authorised, the request needs to have a cookie with a valid token in the headers. That's where our `/login` API comes in:

### Login and logout

Read documentation about `res.cookie` and `res.clearCookie`:

- http://expressjs.com/en/api.html#res.cookie
- http://expressjs.com/en/api.html#res.clearCookie

```js
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const trainer = await db.Trainer.findOne({
      where: { username },
    });

    // return if Trainer does not exist
    // message returned is intentionally vague for security reasons
    if (!trainer) {
      return res.status(422).json({ message: "Invalid username or password." });
    }

    // check if user input password matches hashed password in the db
    const result = await bcrypt.compare(password, trainer.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(trainer.username);

    // calculation to determine expiry date - this is up to your team to decide
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    // you are setting the cookie here, and the name of your cookie is `token`
    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: true, // client-side js cannot access cookie info
      secure: true, // use HTTPS
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

router.post("/logout", (req, res) => {
  // clears the 'token' cookie from your browser
  res.clearCookie("token").send("You are now logged out!");
});
```

Log in with a valid trainer now and check the **Headers**. You should see a `Set-Cookie` key, with a value that looks something like: `token=eyJhbGciOiJIUzI1NsdsaCI6IkpXVCJ9.eyJuYW1lIjoiYasdhZG1pbiIsImV4cCI6MTYxOTc3MdaWF0IjoxNjE0NTg5Mzg5fQ.NYH7deb9asdpH4i3SSR0ic7DF3USv2xiGwVq6L-xiZM; Path=/; Expires=Mon, 08 Mar 2021 09:03:09 GMT; HttpOnly; Secure`.

Now that you have this token, go ahead and try calling `GET /trainers/:username` again. But before you submit the request, set the headers with a key `Cookie`, and copy paste the value of the entire string of the token. You should now be able to retrieve the user details of the specified username!
