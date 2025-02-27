import { InjectQueue, Processor } from '@nestjs/bull';
import { BackoffService } from './backoff.service';
import { JobQueue } from '../pull-mq.producer';
import { PullMQConsumer } from '../pull-mq.consumer';
import { Job, Queue } from 'bull';
import { logger } from 'src/logger';

export interface IBackOff extends JobQueue {
  name: string;
}
export const BackoffProducerName = 'backoff';

@Processor(BackoffProducerName)
export class BackOffConsumer extends PullMQConsumer<IBackOff> {
  protected queueName: string = BackoffProducerName;

  constructor(
    @InjectQueue(BackoffProducerName) queue: Queue,
    readonly backoffService: BackoffService,
  ) {
    super(queue, BackoffProducerName);
    this.registerHandler(this.getQueueName(), this.process);
    this.registerHandler(
      this.getDeadLetterQueue(this.getQueueName()),
      this.processDeadLetter,
    );
  }

  async processDeadLetter(job: Job<IBackOff>): Promise<any> {
    logger.error(`[PULL-MQ-DEAD_LETTER]`, job.data.toString());
    return true;
  }
  async process(): Promise<void> {}
}
