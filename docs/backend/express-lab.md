# Express.js lab

## Build simple API for "who is next"

### Planning the CRUD API

Lab: Build a basic CRUD API for the "who is next" (Create / Read / Update / Delete)

Requirements
In this lab we will implement a basic CRUD API in Express with the below 8 routes:

We are creating an API to interact with the resources on the server.

#### 0. Get API endpoints

- Route: GET /
- HTTP Response status code: 200

Expected response:

```json
{
  "0": "GET    /",
  "1": "GET    /jumplings",
  "2": "POST   /jumplings",
  "3": "GET /jumplings/:id",
  "4": "PUT /jumplings/:id",
  "5": "DELETE /jumplings/:id",
  "6": "-----------------------",
  "7": "POST   /jumplings/presenters",
  "8": "GET    /jumplings/presenters"
}
```

Notice the plural form. We have 8 endpoints.

#### 1. Get jumplings

- Route: GET /jumplings
- HTTP Response status code: 200

Expected Response:

```json
[]
```

Expected Response after Jumplings added:

```json
[
  { "id": 1, "name": "xxx" },
  { "id": 2, "name": "xxx" }
]
```

#### 2. Add a jumpling

- Route: POST /jumplings
- HTTP Response status code: 201

Expected Response:

```json
{ "id": 1, "name": "xxx" }
```

#### 3. Get a jumpling

- Route: GET /jumplings/:id
- HTTP Response status code: 200

Expected Response:

```json
{ "id": 1, "name": "xxx" }
```

#### 4. Update a jumpling's name

- Route: PUT /jumplings/:id
- HTTP Response status code: 200
- Body: `{ "name": "xxx edited" }`

Expected Response:

```json
{ "id": 1, "name": "xxx edited" }
```

#### 5. Delete a jumpling

- Route: DELETE /jumplings/:id
- HTTP Response: 200

Expected Response:

```json
{ "id": 1, "name": "xxx edited" }
```

#### 6. Generate the next presenter

- Route: POST /jumplings/presenters
- HTTP Response status code: 201

Expected Response:

```json
{ "id": 1, "name": "xxx" }
```

This is a POST request instead of a GET request because we are recording the history of presenters. This creates a resource on the server.

#### 7. Get a history of presenters

- Route: GET /jumplings/presenters
- HTTP Response status code: 200

Expected response:

```json
[
  { "id": 1, "name": "xxx" },
  { "id": 2, "name": "xxx" }
]
```

## Hints

- Write a test first. (Use Jest and Supertest. Include testing for errors.)
- Add routes into `app.js` and make the test pass. (later, refactor and move resources into their respective route files)
- Rinse and repeat.
- Middleware - Add middleware for requiring JSON:

```
const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json!");
  } else {
    next();
  }
};
```

- Param processing - Integrate `app.param()` middleware to find `jumpling` from id
- Routers - Integrate Express.js routers to extract your `jumpling` routes (put into routes folder)
- Integrate a default error handler middleware:

```
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});
```

- Integrate Joi validation library to validate data

## Folder structure

```
- package.json
- package-lock.json
- src
  - routes
  app.js
  index.js
- __tests__
```
