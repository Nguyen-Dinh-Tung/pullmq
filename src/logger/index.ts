import { Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'src/logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  watchLog: true,
});
const warningTransport = new winston.transports.DailyRotateFile({
  filename: 'src/logs/warning-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'warning',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  watchLog: true,
});

const winstonLog = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
  ),
  transports: [errorTransport, warningTransport],
});

if (process.env.NODE_ENV !== 'production') {
  winstonLog.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

const l = new Logger();

export const logger = {
  error: (component: string, message: string, stack?: string) => {
    l.error(message, stack, component);
    winstonLog.error(message, { stack, component });
  },
  info: (component: string, message: string) => l.log(message, component),
  warn: (component: string, message: string) => {
    l.warn(message, component);
    winstonLog.warn(message, component);
  },
  debug: (component: string, message: string) => l.debug(message, component),
};
