import Redis from 'ioredis';
import ENV from 'src/env/env.base';

export const redis = new Redis({
    port: +ENV.redisPort,
    host: ENV.redisHost,
    connectTimeout: 10000,
});

export const acquireLock = async (key: string, values: any, ttl: number) => {
    return await redis.set(key, JSON.stringify(values), 'EX', ttl, 'NX');
};
