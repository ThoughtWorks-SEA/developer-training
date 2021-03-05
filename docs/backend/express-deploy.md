# Express.js deployment

## MongoDB Atlas

Create a database on the cloud with MongoDB Atlas.

1. Follow this tutorial to [get started with MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started). You only need to follow Parts 1 through 4.
1. Under **Security > Network Access**, you'll need to "Add IP address". You may need to allow all IP addresses temporarily to get things up and running (for security reasons, you can fix this by [allowing only specific IP addresses](https://developer.mongodb.com/how-to/use-atlas-on-heroku/#configuring-heroku-ip-addresses-in-atlas)).
1. Locate your cluster (if you did not rename it, it should be named something like "Cluster0") on the MongoDB Atlas site, and click on "CONNECT".
1. You will be prompted to choose the connection method. Select "Connect your application".
1. You should see something like `mongodb+srv://yourname:<password>@cluster0.xx7xx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`. This connection string is what you will be using later in your Heroku setup. For now, edit your `db.js` to look like this:

```js
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/" + dbName;
```

This way, you can connect to your local db during development, but in production you can set the connection string to connect to the db you just created. Note that the `MONGODB_URI` environment variable will automatically be set for you.

## Heroku

1. Login to your Heroku account and create a Heroku app.
1. Under the **Deploy** tab, see **Deployment method**. Select "GitHub". Connect to your GitHub repo.
1. Under the **Settings** tab, see **Config Vars**. Click on "Reveal Config Vars". Remember how we set config vars in our `.env` files? This is the same thing, just for Heroku. You'll need to add the key and values of your `JWT_SECRET_KEY` and your `MONGODB_URI` connection string.
1. Heroku dynamically assigns your app a port and adds the port to the environment variable `process.env.PORT`.

Add this condition into your index.js:

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  ...
});
```

Once you have everything pushed on GitHub and all your config vars set, click on the **Deploy** tab and manually deploy your `main` branch. Once deployment is complete, you should be able to access your Heroku app and test your APIs using Postman.
