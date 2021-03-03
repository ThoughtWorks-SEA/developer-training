# Mongoose with Express.js

When adding a database to Express.js that the backend server will interact with, **many of our route handlers will become more like controllers that interact with the database.**

For example, route handlers that GET a single resource can be a controller named `findOne` that finds a single resource in the database.

Similarly, when you POST a single resource in a route handler, it can be a controller named `createOne` that creates a single resource in the database.

**It is convention to put these controllers into a `controllers` folder.** Controllers are these handlers interacting with the database that is linked to the routing in the routers.

In the MVC design pattern, controllers is the middleman between Express.js routes and mongoose models.

![MVC diagram](https://mdn.mozillademos.org/files/14456/MVC%20Express.png)

Refactor your code by extracting the main logic into controllers. See [this example](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#create_the_catalog_route_module) for a guide on how to implement this.

### Do I _have_ to extract the logic into a controllers folder?

> One of the cool things about Express (and Node in general) is it doesn't push a lot of opinions on you; one of the downsides is it doesn't push any opinions on you. Thus, you are free (and required!) to set up any such opinions (patterns) on your own.
>
> In the case of Express, you can definitely use an MVC pattern, and a route handler can certainly serve the role of a controller if you so desire--but you have to set it up that way.

https://stackoverflow.com/questions/11076179/node-js-express-routes-vs-controller

## Exercises

Integrate your songs routes with MongoDB and Mongoose!

**Keep `jest --watch` running while you make changes - you will note that because your implementation has changed, all your tests for songs will be failing. This is expected. Skip the songs tests by adding [`.skip`](https://jestjs.io/docs/en/api#describeskipname-fn) to temporarily skip the songs test suite. We will be fixing the tests later!**

```js
describe.skip("songs", () => {
  ...
})
```

1. Create a Song model with mongoose validation. `models/song.model.js` (you can choose to exclude joi validation for now)
1. Create a database for your songs in your MongoDB - `utils/db.js`. You should see "connected to mongodb" logged onto your console if it is connected successfully.
1. Update your `routes/songs.routes.js` by implementing Mongoose in your API, e.g. `const song = await Song.findById(req.params.id)`. We are now working with an actual database, so you can go ahead and remove the dummy data `const songs = []` and all references to `songs`!
1. Using Postman, test out your routes. Do `POST http://localhost:3000/songs` and pass in json content in the body `{ "name": "song title", "artist": "artist name" }`. Then do `GET http://localhost:3000/songs` - you should see an array containing the song you just created! Continue testing for all the other routes - DELETE, PUT, GET /:id.
1. Using MongoDB Compass, you can access the data inside your songs database. You can also use it to directly modify values of a document, or to delete the entire document.
1. Refactor your code by extracting the main database logic into a controller - `controllers/songs.controller.js`. There are many styles of doing this - feel free to pick whichever way you prefer!
