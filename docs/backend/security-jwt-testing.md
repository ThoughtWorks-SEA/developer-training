# JSON Web Token testing

First we will mock `jsonwebtoken` because we are not testing the actual verification of the token.

```js
jest.mock("jsonwebtoken");
```

1. POST should add a new trainer

```js
expect(trainer.username).toBe(newTrainer.username);
expect(trainer.password).not.toBe(newTrainer.password);
```

2. POST /login should log user in if password is correct

```js
expect(response.text).toEqual("You are now logged in!");
```

3. POST /login should return error if password is incorrect

```js
expect(response.text).toContain("Login failed");
```

4. GET /:username should return trainer details if logged in

```js
const jwt = require("jsonwebtoken");

jwt.verify.mockReturnValueOnce({ username: trainer.username });
const { body: trainers } = await request(app)
  .get(`/trainers/${trainer.username}`)
  .set("Cookie", "token=valid-token")
  .expect(200);

expect(jwt.verify).toHaveBeenCalledTimes(1);

expect(trainers[0].username).toMatchObject(trainer.username);
```

5. GET should respond with incorrect trainer message when login as incorrect trainer

Status code: 403 Forbidden

6. GET denies access when no token is provided

Status code: 401 Unauthorized

```js
expect(jwt.verify).not.toHaveBeenCalled();
```

7. GET denies access when token is invalid

Status code: 401 Unauthorized

```js
jwt.verify.mockImplementationOnce(() => {
      throw new Error();
});

...

.set("Cookie", "token=invalid-token")

...

expect(jwt.verify).toHaveBeenCalledTimes(1);
```

For `/trainers/login`

8. POST should logs owner in if password is correct

9. POST should not log trainer in when password is incorrect

Reset mocks after each test

```js
afterEach(async () => {
  jest.resetAllMocks();
  await Trainer.deleteMany();
});
```
