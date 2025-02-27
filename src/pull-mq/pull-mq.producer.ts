import { IPullMqConfig } from './pull-mq.interface';
import Bull, { Queue } from 'bull';
import { logger } from 'src/logger';
import { InjectQueue } from '@nestjs/bull';

export type BackoffPullMQ = 'fixed' | 'exponential';

export interface JobQueue {
  retries: number;
}

export const deadLetterQueueName = 'dead-letter-queue';

export abstract class PullMQProducer<T extends JobQueue>
  implements IPullMqConfig<T>
{
  protected queueName: string;
  protected delayTimes: number = 0;
  protected maxRetries: number = 3;
  protected priority: number = 0;
  protected timeout: number = 30000;
  protected lifo: boolean = false;
  protected backoff: number = 1000;
  protected backoffType: BackoffPullMQ = 'fixed';
  protected maxBackoff = 60 * this.backoff;
  protected deadLetterQueue: string = deadLetterQueueName;
  protected concurrency: number = 1;

  constructor(
    @InjectQueue() protected queue: Queue,
    readonly name: string,
  ) {
    this.queueName = name;
  }

  async addJob(data: T, options?: Bull.JobOptions): Promise<boolean> {
    try {
      await this.queue.add(
        data['name'] ? data['name'] : this.getQueueName(),
        data,
        {
          ...this.getJobPolicy(),
          ...options,
        },
      );
      return true;
    } catch (err) {
      logger.error(`[QUEUE-ADD-JOB]`, err?.message, err.stack);
      throw new Error(`Failed to add job to queue: ${JSON.stringify(data)}`);
    }
  }

  async bulkJobs(data: T[], options?: Bull.JobOptions): Promise<boolean> {
    try {
      const jobs = data.map((item) => ({
        data: item,
        name: this.getQueueName(),
        options: { ...this.getJobPolicy(), ...options },
      }));

      await this.queue.addBulk(jobs);
      return true;
    } catch (err) {
      logger.error(`[QUEUE-BULK-JOBS]`, err?.message, err.stack);
      throw new Error(`Failed to add bulk jobs to queue`);
    }
  }

  getJobPolicy(): Bull.JobOptions {
    return {
      timeout: this.getTimeOut(),
      priority: this.getPriority(),
      lifo: this.getLifo(),
      backoff: this.getCalculateBackoff(this.getBackoffType()),
    };
  }

  getCalculateBackoff(type: BackoffPullMQ): number {
    return type === 'fixed'
      ? this.backoff
      : Math.min(
          this.backoff * Math.pow(2, this.getMaxRetries()),
          this.getMaxBackoff(),
        );
  }

  getBackoff(): number {
    return this.backoff;
  }

  getMaxBackoff(): number {
    return this.maxBackoff;
  }

  getQueueName(): string {
    return this.queueName;
  }

  getDelayTimes(): number {
    return this.delayTimes;
  }

  getMaxRetries(): number {
    return this.maxRetries;
  }

  getPriority(): number {
    return this.priority;
  }

  getLifo(): boolean {
    return this.lifo;
  }

  getBackoffType(): BackoffPullMQ {
    return this.backoffType;
  }

  getDeadLetterQueue(queueName?: string): string {
    if (queueName) {
      return `${queueName}-${this.deadLetterQueue}`;
    }
    return this.deadLetterQueue;
  }

  getTimeOut(): number {
    return this.timeout;
  }
}
