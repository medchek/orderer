import { LRUCache } from "lru-cache";

const options = {
  max: 500,
  // how long to live in ms
  ttl: 1000 * 10,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,
};

export const cache = new LRUCache(options);
