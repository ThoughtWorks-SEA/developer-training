# Express.js lab

## who-is-next

### Planning the CRUD API

Build a basic CRUD API (Create / Read / Update / Delete) in Express with the below 7 routes:

#### 0. Get API endpoints

- Route: GET /
- HTTP Response status code: 200

Expected response:

```json
{
  "0": "GET    /",
  "1": "GET    /jumplings",
  "2": "POST   /jumplings",
  "3": "GET    /jumplings/:name",
  "4": "PUT    /jumplings/:id",
  "5": "DELETE /jumplings/:id",
  "6": "-----------------------",
  "7": "GET    /jumplings/presenter"
}
```

Notice the plural form. We have 7 endpoints.

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

- Route: GET /jumplings/:name
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

- Route: GET /jumplings/presenter
- HTTP Response status code: 200

Generate the next presenter by picking a random Jumpling.

Expected Response:

```json
{ "id": 2, "name": "xxx" }
```

## Hints

- Write a test first. (Use Jest and Supertest. Include testing for errors.)
- Add the route into `app.js` and make the test pass. (refactor later by extracting the routes)
- Rinse and repeat for all remaining routes.
- Add middleware, e.g. for requiring JSON:

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
  - middlewares
- app.js
- index.js
- __tests__
```
