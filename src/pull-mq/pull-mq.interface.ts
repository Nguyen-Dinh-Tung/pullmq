import Bull, { Job } from 'bull';

export interface IPullMqConfig<T> {
  addJob(data: T, options: Bull.JobOptions): Promise<boolean>;
  bulkJobs(data: T[], options: Bull.JobOptions): Promise<boolean>;
}

export interface IConsumerConfig<T> {
  process(): Promise<void>;
  handleFail(job: Job<T>, error: Error): Promise<void>;
  handleError(error: Error): void;
  handleRePub(job: Job<T>): Promise<void>;
}
