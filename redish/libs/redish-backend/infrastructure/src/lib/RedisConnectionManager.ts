// Adapted from https://stackoverflow.com/questions/70805943/redis-redis-createclient-in-typescript

import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

let client: RedisClientType;
let connected: boolean;

async function get(): Promise<RedisClientType> {
  if (!connected) {
    client = createClient();
    //client.on('error', (err) => console.error(`Cache Error: ${err}`));
    //client.on('connect', () => console.log('Cache connecting'));
    //client.on('reconnecting', () => console.log('Cache reconnecting'));
    client.on('ready', () => {
      connected = true;
      console.log('Cache connected!');
    });
    await client.connect();
  }
  return client;
}

// statically initialize connection to redis
get()
  .then((conn) => {
    client = conn;
  })
  .catch((err) => {
    console.error({ err }, 'Could not connect to cache');
  });

export { get };
