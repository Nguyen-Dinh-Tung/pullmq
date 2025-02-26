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
      dialect: 'mysql',
    },
    test: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123123',
      database: process.env.DB_NAME_TEST || 'sequelize_test',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'sqlite',
    },
    production: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123123',
      database: process.env.DB_NAME_PROD || 'sequelize_prod',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
  };

  return config[environment];
};

module.exports = {
  ...getConfig(env),
};
