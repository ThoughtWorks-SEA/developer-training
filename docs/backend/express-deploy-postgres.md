# Express.js deployment

## Heroku

1. Login to your Heroku account and create a Heroku app.
1. Under the **Deploy** tab, see **Deployment method**. Select "GitHub". Connect to your GitHub repo.
1. Under the **Overview** tab, see **Installed add-ons**. Add "Heroku Postgres" under the free "Hobby Dev" tier.
1. Under the **Settings** tab, see **Buildpacks**. Add `https://github.com/timanovsky/subdir-heroku-buildpack.git` and drag it to the top of the list.

### Connect to Heroku Postgres database

1. [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. `heroku login`
3. `heroku pg:psql -a <app name>`

### Set environment variables

1. Under the **Settings** tab, see **Config Vars**. Click on "Reveal Config Vars". Remember how we set config vars in our `.env` files? This is the same thing, just for Heroku. You'll need to add the key and values of your `JWT_SECRET_KEY`.
1. Heroku dynamically assigns your app a port and adds the port to the environment variable `process.env.PORT`.

Add this condition into your index.js:

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  ...
});
```

### Deploy

Once you have everything pushed on GitHub and all your config vars set, click on the **Deploy** tab and manually deploy your `main` branch. Once deployment is complete, you should be able to access your Heroku app and test your APIs using Postman.

Under the **Deploy** tab, you can also choose to enable automatic deploys from the `main` branch, so that any new pushes to the main branch will trigger a new deployment. However, this should typically only be enabled if you have sufficient automated tests in place.
