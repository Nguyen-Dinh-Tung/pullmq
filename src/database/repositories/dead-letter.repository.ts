import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import DeadLetterModel from '../models/dead-letter.model';

@Injectable()
export class DeadLetterRepository extends BaseRepository<DeadLetterModel> {
  constructor() {
    super(DeadLetterModel);
  }
}
