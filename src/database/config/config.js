// eslint-disable-next-line @typescript-eslint/no-require-imports
const dot = require('dotenv');
dot.config();
const env = process.env.NODE_ENV || 'development';

const getConfig = (environment) => {
  const config = {
    development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123123',
      database: process.env.DB_NAME || 'sequelize',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: process.env.DIALECT,
    },
    test: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123123',
      database: process.env.DB_NAME || 'base_test',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: process.env.DIALECT,
    },
    production: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123123',
      database: process.env.DB_NAME || 'sequelize_prod',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: process.env.DIALECT,
    },
  };

  return config[environment];
};

module.exports = {
  ...getConfig(env),
};
