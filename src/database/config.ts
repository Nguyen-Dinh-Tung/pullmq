import { SequelizeModuleOptions } from '@nestjs/sequelize';
import UsersModel from './models/users.model';
import DeadLetterModel from './models/dead-letter.model';
import ENV from 'src/env/env.base';
import { logger } from 'src/logger';

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
    retryAttempts: 1,
    benchmark: true,
    logging: (sql: string, timing?: number) => {
        if (typeof timing === 'number') {
            if (timing > 500) {
                logger.warn(
                    `[TYPE-ORM]`,
                    `SLOW QUERY : ${sql} - timing : ${timing}`,
                );
            }
        }
    },
};
