import * as dotenv from 'dotenv';
import * as path from 'path';
import * as process from 'process';
import { getOsEnv } from './util';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
    path: path.join(
        process.cwd(),
        `.env.${process.env.NODE_ENV || 'development'}.local`,
    ),
});
/**
 * Environment variables
 */

const ENV = {
    NOTE_ENV: getOsEnv('NODE_ENV'),
    isTest: getOsEnv('NODE_ENV') === 'test',
    isDevelopment: getOsEnv('NODE_ENV') === 'development',
    isProduction: getOsEnv('NODE_ENV') === 'production',
    isStaging: getOsEnv('NODE_ENV') === 'staging',
    jwtSecret: getOsEnv('JWT_SECRET'),
    jwtExpiresIn: getOsEnv('JWT_EXPIRES_IN'),
    redisHost: getOsEnv('REDIS_HOST'),
    redisPort: getOsEnv('REDIS_PORT'),
    dbName: getOsEnv('DB_NAME'),
    dbUsername: getOsEnv('DB_USER'),
    dbPass: getOsEnv('DB_PASS'),
    dbHost: getOsEnv('DB_HOST'),
    dbPort: getOsEnv('DB_PORT'),
    dialect: getOsEnv('DIALECT'),
};

export default ENV;
