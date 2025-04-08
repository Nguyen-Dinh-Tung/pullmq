import { Injectable } from '@nestjs/common';
import UsersModel from 'src/database/models/users.model';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { AppHttpBadRequest } from 'src/exceptions/app-http.exception';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserByEmail(email: string): Promise<UsersModel> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppHttpBadRequest('User not found');
    }
    return user;
  }
}
