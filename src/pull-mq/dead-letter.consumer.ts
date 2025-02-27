import { Injectable } from '@nestjs/common';
import { PullMQConsumer } from './pull-mq.consumer';
import { InjectQueue } from '@nestjs/bull';
import { deadLetterQueueName, JobQueue } from './pull-mq.producer';
import { Queue } from 'bull';
export interface DeadLetter extends JobQueue {
  data: any;
  retries;
}

@Injectable()
export class DeadLetterConsumer extends PullMQConsumer<DeadLetter> {
  protected queueName: string = deadLetterQueueName;

  constructor(
    @InjectQueue(deadLetterQueueName)
    readonly queue: Queue,
  ) {
    super(queue, deadLetterQueueName);
  }
}
