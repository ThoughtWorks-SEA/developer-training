# Quick start for a Node.js backend project

Create a new directory for your project and change directory into it.

```sh
mkdir my-express-app && cd my-express-app
```

Make current project a git repo, ignore `node_modules`.

```sh
git init
echo "node_modules" >> .gitignore
```

Initiantiate a new NodeJS project using npm init.

```
npm init -y
```

Install Express.js and start coding.
- Create `index.js` for the server, as the entry point to your app.
- Create `app.js`
- Read more about app.js vs index.js in [Express.js testing](backend/express-testing)

```sh
npm install express
```

Install dev dependencies:

```sh
npm install --save-dev nodemon
```

Start coding! Open the project in VS code:

```
code .
```

Add a `start` script to package.json

```json
"scripts": {
  "start": "node index.js",
  "start:dev": "nodemon index.js",
}
```

Run project in production mode

```
npm start
```

Run project in development mode

```
npm run start:dev
```

## Tests

Run the following steps if you're including tests in your project.
Install libraries which we'll use for writing tests:

```
npm install --save-dev jest supertest
```

Update your package.json and add the following scripts:

```json
"scripts": {
  "test": "jest",
  "test:coverage": "jest --coverage",
  "test:watch": "jest --watch",
}
```

## ESLint
See:
- [What is ESLint?](javascript/linting?id=what-is-eslint)
- [Linting](javascript/linting?id=sample-eslintrcjson-for-node-based-app) for prettier (recommended)

Install libraries which we'll use for linting and formatting.

```
npm install --save-dev eslint eslint-plugin-jest
```

Update your package.json and add the following scripts:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint --fix .",
}
```

Run the command to initialize your eslint tool. This will generate ES Lint configuration file

```sh
npm run lint -- --init
```

Sample `.eslintrc.json` for node based app. Rules are being set up using latest ECMAScript.
- [Reference to configure ESLint rules](https://eslint.org/docs/rules/)
- Extending [StandardJS](https://standardjs.com/rules.html)
- Using [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)

```json
{
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard",
        "plugin:jest/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": ["jest"],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

**Usage**

```
npm run lint
npm run lint:fix
```

## Using ECMAScript Modules

Configure `package.json`
```json
  "type": "module",
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest",
    "test:coverage": "NODE_OPTIONS=--experimental-vm-modules jest --coverage",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch"
  },
  "jest": {
    "transform": {},
    "verbose": true
  }
```

Sample `.eslintrc.json` for node based app, with ESM:

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
}
```

**Notable Issues on Jest with ECMAScript**
[Jest ships with experimental support for ECMAScript Modules (ESM)](https://jestjs.io/docs/ecmascript-modules).

- [Meta: Native support for ES Modules](https://github.com/facebook/jest/issues/9430)
- [jest.mock does not mock an ES module without Babel](https://github.com/facebook/jest/issues/10025)
- [To disable any source code transformations in Jest] https://stackoverflow.com/questions/64582674/jest-mock-of-es6-class-yields-referenceerror-require-is-not-defined