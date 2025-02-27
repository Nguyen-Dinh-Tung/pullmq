import { Injectable } from '@nestjs/common';
import { EDeadLetter } from 'src/database/enums/dead-letter-queue.enum';
import DeadLetterModel from 'src/database/models/dead-letter.model';
import { DeadLetterRepository } from 'src/database/repositories/dead-letter.repository';
import { DeadLetterConsumer } from 'src/pull-mq/dead-letter.consumer';
@Injectable()
export class DeadLetterService {
  constructor(
    private readonly deadLetterConsumer: DeadLetterConsumer,
    private readonly deadLetterRepository: DeadLetterRepository,
  ) {}

  public async handle() {
    const jobs = await this.deadLetterConsumer.getJobs(['completed']);
    const deadLetters: DeadLetterModel[] = [];

    for (const job of jobs) {
      switch (job.name) {
        case EDeadLetter.BACKOFF:
          const data: any = job.data;
          deadLetters.push(
            DeadLetterModel.build({
              payload: JSON.stringify(data),
            }),
          );

          await job.remove();
          break;
        default:
          break;
      }
    }

    await this.deadLetterRepository.bulkCreate(deadLetters);
  }
}
