const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3000,
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    },
    debug: true,
  },
  production: {
    port: process.env.PORT || 8080,
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    },
    debug: false,
  },
};

module.exports = config[env];
