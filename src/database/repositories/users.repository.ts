import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import UsersModel from '../models/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository extends BaseRepository<UsersModel> {
  constructor(@InjectModel(UsersModel) model: typeof UsersModel) {
    super(model);
  }
}
