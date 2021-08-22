# (WIP) Hashing password with Sequelize bcrypt

<!-- https://sequelize.org/master/manual/getters-setters-virtuals.html#setters -->

As we already know, it is extremely unsafe to store passwords as plaintext. We need to hash the passwords before we store them in the database. This way, if anyone gains access to the database, they will see only the hashes of the passwords, and will not be able to use the value as actual credentials to log into the affected user accounts.

## Install bcryptjs

We will be using bcrypt's hashing function to generate the hash for storing our passwords safely.

`npm install bcryptjs`
