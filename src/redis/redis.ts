import Redis from 'ioredis';

export const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  connectTimeout: 10000,
});

export const acquireLock = async (key: string, values: any, ttl: number) => {
  return await redis.set(key, JSON.stringify(values), 'EX', ttl, 'NX');
};
