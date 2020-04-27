module.exports ={
  development: {
    username: "iocuaxlb",
    password: "aX853NtP4JMWXisMsj9FbALTmfCAf3G6",
    database: "iocuaxlb",
    host: "drona.db.elephantsql.com",
    dialect: "postgres",
    operatorsAliass: 0
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    operatorsAliases: 0
  }
}
