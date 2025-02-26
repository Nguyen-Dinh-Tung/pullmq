import { SequelizeModuleOptions } from '@nestjs/sequelize';
import UsersModel from './models/users.model';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123123',
  database: 'sequelize',
  models: [UsersModel],
  autoLoadModels: true,
  synchronize: false,
  logging: false,
  retryAttempts: 1,
};
