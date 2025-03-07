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
};

export default ENV;
