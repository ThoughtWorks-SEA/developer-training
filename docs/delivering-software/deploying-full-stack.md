# Deploying on Heroku

A rough guide to deploying your full-stack app on Heroku.

Note that there are many other ways to accomplish this. For example, you can choose to deploy your backend on Heroku and your frontend on Netlify - the configuration will just be different.

## Getting started

1. Create your backend Express app
1. Within your Express app, create a React app named `client`
1. You may need to add this into `client/.env`: `SKIP_PREFLIGHT_CHECK=true`

### Folder structure

An approximate of how your folder structure might look:

```
client
  build
  node_modules
  public
  src
  .env
  .gitignore
  package-lock.json
  package.json
  README.md
db
models
node_modules
routes
controllers
.env
.gitignore
app.js
index.js
package-lock.json
package.json
README.md
```

### App config

```json
// package.json
"scripts": {
  ...
  "heroku-postbuild": "npm install --prefix ./client && npm run build --prefix ./client"
}
```

`npm install path`

```js
// app.js
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
```

### Heroku config

1. Create new Heroku app, link it to your Github repo
1. Add buildpack `https://github.com/timanovsky/subdir-heroku-buildpack.git` and drag to top of list
1. You may need to add this into your Heroku config vars: `SKIP_PREFLIGHT_CHECK` = `true`

### Database config

**Heroku:**

1. Add the "Heroku Postgres" add-on under free "hobby dev" tier. In your config vars, you should see a new variable populated for you called `DATABASE_URL` with the url to your Postgres db.
1. Add config var: `PROJECT_PATH` = `.`
1. Add config var: `PGSSLMODE` = `no-verify`

**App:**

```js
// db/index.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
```
