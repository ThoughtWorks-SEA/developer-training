## (WIP) Lab: Quick start security-jwt

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

You'll also need to create your `index.js`, `app.js`, `utils/db.js` files.

Add the usual code necessary to start your server in these files (refer to your old practice projects!). Remember to:

- add `require("./utils/db");` at the top of your `index.js` file
- add a `"start:dev": "nodemon index.js"` script into your `package.json` file

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

We shall use bcryptjs for hashing our passwords. (which uses bcrypt)

```
npm install bcryptjs
```

### Add a Trainer model with username and password

### New trainer route for creating a new Trainer

<!-- ```js
router.post("/", async (req, res, next) => {
  try {
    const newTrainer = await Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    next(err);
  }
});
```

```json
{
  "username": "ash3",
  "password": "iWannaB3DVeryBest"
}
``` -->

I can create trainers now! Note that the hash is different even for same passwords. This is thanks to the salting of bcrypt.

Try using Postman now!

### Generating a JWT secret

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

### Generating a JWT token and finding the secret

- Create the config folder
- Create a `jwt.js` file inside the config folder, with the `getJWTSecret` function.

src/config/jwt.js

```js
var jwt = require("jsonwebtoken");

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing secrets to sign JWT token");
  }
  return secret;
};

// the logic for creating a JWT token can also be moved to trainer.model.js instead, but will work here as well
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

```js
require("dotenv").config();
```

#### More on the exp field in the JWT payload

In the example above, the expiration date of the JWT token is set to 60 days later after it's generated. Then the expiration time is saved into the exp field of the JWT token.

What is this exp field? Why must I use this term?

It represents **Token Expiration,** and you can find [more details here](https://www.npmjs.com/package/jsonwebtoken#token-expiration-exp-claim). Once this field is set in a token, it's validated later on when we call the jwt.verify(token, secret). So a token that passes the expiration time will fail the verification.

### Protect a route trying to find trainers by username

Now that we have our JWT_SECRET_KEY set up, let's create a `protectRoute` middleware and use it for our `GET /trainers/:username` route:

```js
const protectRoute = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized");
      /* you can set a default error handler in app.js instead and do this:
      const err = new Error("You are not authorized");
      next(err);
      */
    } else {
      req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

router.get("/:username", protectRoute, async (req, res, next) => {
  try {
    const username = req.params.username;
    const regex = new RegExp(username, "gi");
    const trainer = await Trainer.findOne({ username: regex });
    res.send(trainer);
  } catch (err) {
    next(err);
  }
});
```

`req.cookies` is populated by the `cookie-parser` middleware.

Now, try making a call to `GET /trainers/:username`. The username should be of a Trainer that you have previously created. You should see an error: "You are not authorized". In order to be authorised, the request needs to have a cookie with a valid token in the headers. That's where our `/login` API comes in:

#### Login and logout

Read documentation about `res.cookie` and `res.clearCookie`:

- http://expressjs.com/en/api.html#res.cookie
- http://expressjs.com/en/api.html#res.clearCookie

```js
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const trainer = await Trainer.findOne({ username });
    const result = await bcrypt.compare(password, trainer.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(trainer.username);

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    res.cookie("token", token, {
      // you are setting the cookie here, and the name of your cookie is `token`
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
  res.clearCookie("token").send("You are now logged out!");
});
```

Log in with a valid trainer now and check the **Headers**. You should see a `Set-Cookie` key, with a value that looks something like: `token=eyJhbGciOiJIUzI1NsdsaCI6IkpXVCJ9.eyJuYW1lIjoiYasdhZG1pbiIsImV4cCI6MTYxOTc3MdaWF0IjoxNjE0NTg5Mzg5fQ.NYH7deb9asdpH4i3SSR0ic7DF3USv2xiGwVq6L-xiZM; Path=/; Expires=Mon, 08 Mar 2021 09:03:09 GMT; HttpOnly; Secure`.

Now that you have this token, go ahead and try calling `GET /trainers/:username` again. But before you submit the request, set the headers with a key `Cookie`, and copy paste the value of the entire string of the token. You should now be able to retrieve the user details of the specified username!
