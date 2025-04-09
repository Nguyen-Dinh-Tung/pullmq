import { SequelizeModuleOptions } from '@nestjs/sequelize';
import UsersModel from './models/users.model';
import DeadLetterModel from './models/dead-letter.model';
import ENV from 'src/env/env.base';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: ENV.dbHost,
  port: +ENV.dbPort,
  username: ENV.dbUsername,
  password: ENV.dbPass,
  database: ENV.dbName,
  models: [UsersModel, DeadLetterModel],
  autoLoadModels: true,
  synchronize: false,
  logging: false,
  retryAttempts: 1,
};

console.log(sequelizeConfig, 'sequelizeConfig');
