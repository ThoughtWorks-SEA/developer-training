# Backend Architecuture / Design Pattern

In our previous example, you could see that the router is directly interacting with the database.

Without improving the implementation, the routers will need to perform the business logic before the database interaction. Over the time, the router codes will become more complex and leads to more maintenance efforts. We are going to discuss how to manage our codes when we need to include business logic.

## MVC Design Pattern

MVC (model-view-controller) design pattern was a popular design pattern in the past, when web applications used to have both frontend and backend in a single project. 

When adding a database to Express.js Routers that the backend server will interact with, **many of our route handlers will become more like controllers that interact with the database**. 

For example, route handlers that GET a single resource can be a controller that finds a single resource in the database. Similarly, when you POST a single resource in a route handler, it can be a controller that creates a single resource in the database.

In the MVC design pattern, controllers is the middleman between Express.js routes and database models, as well as to render the data with View templates.

![MVC diagram](https://mdn.mozillademos.org/files/14456/MVC%20Express.png)

When the technology advances, it's a now trend to develop separate backend project, to support multiple "front end" (web and mobile) applications. Thus, we are going to talk about layered architecture.

## MVC vs N-tier architecture

Extracted from https://stackoverflow.com/questions/698220/mvc-vs-n-tier-architecture ,
> N-tier architecture usually has each layer separated by the network. I.E. the presentation layer is on some web servers, then that talks to backend app servers over the network for business logic, then that talks to a database server, again over the network, and maybe the app server also calls out to some remote services (say Authorize.net for payment processing).
> 
> MVC is a programming design pattern where different portions of code are responsible for representing the Model, View, and controller in some application. These two things are related because, for instance the Model layer may have an internal implementation that calls a database for storing and retrieving data. The controller may reside on the webserver, and remotely call appservers to retrieve data. MVC abstracts away the details of how the architecture of an app is implemented.
> 
> N-tier just refers to the physical structure of an implementation. These two are sometimes confused because an MVC design is often implemented using an N-tier architecture.


## Implementing 3-tier Architecture on NodeJS API project

The article [Organize Node.js API project using 3-layer architecture](https://bytearcher.com/articles/node-project-structure/) is suggesting to organize a server-side NodeJS project code into three layers.
1. `API layer`: receiving the HTTP request, parsing the payload from it, forwarding to the next tier.
2. `Service layer`: perform business logic, validate inputs against business rules.
3. `Integration layer`: performing I/O outside the process boundaries, such as talks to databases and makes HTTP requests to 3rd party web APIs.

This approach shares the same idea with the MVC example, where the responsibility to perform business logic are on the controllers.

### Do I _have to_ extract the logic into a controllers folder?

Quoted from https://stackoverflow.com/questions/11076179/node-js-express-routes-vs-controller, 
> One of the cool things about Express (and Node in general) is it doesn't push a lot of opinions on you; one of the downsides is it doesn't push any opinions on you. Thus, you are free (and required!) to set up any such opinions (patterns) on your own.
>
> In the case of Express, you can definitely use an MVC pattern, and a route handler can certainly serve the role of a controller if you so desire--but you have to set it up that way.

**When it comes to an API project which includes complex logic, it is a convention to put these controllers / service objects into a separate `controllers` / `services` folder.** These objects are responsible to perform business logic before interacting with the database, and return the responses to the clients.

## What's next?

For simplicity in this course, we will organise our server-side components into 3 groups.
1. `routers`
2. `controllers`
3. `models`

## (WIP) Exercises

Refactor your router codes by extracting the main logic into controllers. See [this example](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#create_the_catalog_route_module) for a guide on how to implement this.

**Keep `jest --watch` running while you make changes - you will note that because your implementation has changed, all your tests will be failing. This is expected. Skip the tests by adding [`.skip`](https://jestjs.io/docs/en/api#describeskipname-fn) to temporarily skip the test suite. We will be fixing the tests later!**

```js
describe.skip("pokemon CRUD", () => {
  ...
})
```

1. Convert your previous Pokemon CRUD project into an ExpressJS application with a router for `/pokemon` endpoint.
    Hints:
    - `npm install express`
    - Convert `index.js` to a simple Express JS web server. Revision: [Creating a simple web server with Express.js](backend/express-simple-server)
    - Create a pokemon router and mount it on the app.
1. Create `PokemonController` to store all the CRUD functions that we created previously.
1. Update the pokemon router to use different functions in `PokemonController` for the `/pokemon` routes.
1. Using Postman, test out your routes. Do `POST http://localhost:3000/pokemons` and pass in json content in the body `{ "name": "new pokemon", "baseHP": 100, "category": "NEW POKEMON" }`. Then do `GET http://localhost:3000/pokemons` - you should see an array containing the song you just created! Continue create and testing for all the other routes - DELETE, PUT, GET /:id.
1. Refactor your code by extracting the main database logic into a controller - `controllers/pokemons.controller.js`. There are many styles of doing this - feel free to pick whichever way you prefer!
