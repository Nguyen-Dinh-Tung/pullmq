import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import UsersModel from './users.model';

@Injectable()
export class UsersRepository extends BaseRepository<UsersModel> {
  constructor() {
    super(UsersModel);
  }
}
