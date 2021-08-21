require('dotenv').config();

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  debug: true,
  pool: { min: 2, max: 5 }
};
