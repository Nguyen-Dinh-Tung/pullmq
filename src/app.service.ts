import { Op } from 'sequelize';
import { UsersRepository } from './database/models/users.repository';
import { BackoffProducer } from './pull-mq/backoff/backoff.producer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private backoffProducer: BackoffProducer,
    private readonly usersRepository: UsersRepository,
  ) {}
  async getHello() {
    return await this.usersRepository.findAll({
      where: {
        name: {
          [Op.eq]: 'js',
        },
      },
    });
  }
}
