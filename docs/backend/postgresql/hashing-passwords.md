# Hashing password with Sequelize & bcrypt

As we already know, it is extremely unsafe to store passwords as plaintext. We need to hash the passwords before we store them in the database. This way, if anyone gains access to the database, they will see only the hashes of the passwords, and will not be able to use the value as actual credentials to log into the affected user accounts.

## Create User model

```js
User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    underscored: true,
  }
);
```

## Install bcryptjs

We will be using bcrypt's hashing function to generate the hash for storing our passwords safely.

`npm install bcryptjs`

See: [bcryptjs documentation](https://www.npmjs.com/package/bcryptjs)

## beforeCreate hook

You can add a hook to hash the password before creating the instance of the User.

```js
User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    underscored: true,
    hooks: {
      // add beforeCreate hook here
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10); // this generates the salt
          user.password = bcrypt.hashSync(user.password, salt); // this sets the hashed value as the password
        }
      },
    },
  }
);
```

If you can try to create a User now with `password: "password123"`, and log its details, you will be able to see that the value of password is not in fact "password123", but a hashed value.

## beforeUpdate hook

What about if the user chooses to update their password though?

In addition to having a `beforeCreate` hook, we also need a `beforeUpdate` hook - to hash the new password before updating the User model:

```js
User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    underscored: true,
    hooks: {
      ...,
      beforeUpdate: async (user) => { // add beforeUpdate hook here
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  }
);
```

Now, when you update the password of the User, its value will also be hashed.
