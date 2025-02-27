import { Op } from 'sequelize';
import { UsersRepository } from './database/models/users.repository';
import { BackoffProducer } from './pull-mq/backoff/backoff.producer';
import { Injectable } from '@nestjs/common';
import { logger } from './logger';

@Injectable()
export class AppService {
  constructor(
    private backoffProducer: BackoffProducer,
    private readonly usersRepository: UsersRepository,
  ) {}
  async getHello() {
    console.log('fack');
    logger.error('fack', 'fack');
    return await this.usersRepository.findAll({
      where: {
        name: {
          [Op.eq]: 'js',
        },
      },
    });
  }
}
