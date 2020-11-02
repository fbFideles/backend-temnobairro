module.exports = {
  development: {
    username: process.env.DATABASE_USER_DEV,
    password: process.env.DATABASE_PASSWORD_DEV,
    database: process.env.DATABASE_DATABASE_DEV,
    host: process.env.DATABASE_HOST_DEV,
    dialect: "postgres",
    operatorsAliases: 0,
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    operatorsAliases: 0,
  },
};
