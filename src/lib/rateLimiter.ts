import { LRUCache } from "lru-cache";
import { toPositiveNumber } from "./utils";

type RateLimitData = {
  /** The number of orders allowed to be submitted per hour */
  remainingOrders: number;
  /** Global value of the number of requests allowed per hour */
  remainingRequests: number;
};

type RateLimitIpOptions = {
  /** Rate limit token, usually the user ip */
  token: string;
  /** Whether to decrease the allowed orders per interval*/
  limitOrders?: boolean;
};

// Converting env values to integers
const rateLimitInterval = toPositiveNumber(
  process.env.RATE_LIMIT_INTERVAL_IN_MS ?? "3600000",
);
const ttl = rateLimitInterval > 5000 ? rateLimitInterval : 1000 * 60 * 60;

const ALLOWED_ORDERS_PER_INTERVAL = toPositiveNumber(
  process.env.RATE_LIMIT_ORDERS_PER_INTERVAL ?? "10",
);
const ALLOWED_REQUESTS_PER_INTERVAL = toPositiveNumber(
  process.env.RATE_LIMIT_REQUESTS_PER_INTERVAL ?? "200",
);

const rateLimiter: LRUCache<string, RateLimitData> = new LRUCache({
  max: 20000,
});

/**
 * Rate limit the provided token
 * @param {RateLimitIpOptions} opts object containing the token (usually the user ip) and whether to limit the orders per internal on top of limiting the requests
 * @returns the new rate limit data of the provided token
 */
export const rateLimit = ({
  token,
  limitOrders,
}: RateLimitIpOptions): RateLimitData => {
  console.log(`Running rate limiter on token : ${token}`);

  const data = rateLimiter.get(token);
  const remainingTTL = rateLimiter.getRemainingTTL(token);

  if (data) {
    const { remainingOrders, remainingRequests } = data;

    const newData: RateLimitData = {
      remainingOrders: limitOrders
        ? // prevent going below 0
          remainingOrders - 1 > 0
          ? remainingOrders - 1
          : 0
        : remainingOrders,
      remainingRequests: remainingRequests - 1 > 0 ? remainingRequests - 1 : 0,
    };

    rateLimiter.set(token, newData, { ttl: remainingTTL });
    return newData;
  } else {
    const data = {
      remainingOrders:
        ALLOWED_ORDERS_PER_INTERVAL > 0 ? ALLOWED_ORDERS_PER_INTERVAL : 10,
      remainingRequests:
        ALLOWED_REQUESTS_PER_INTERVAL > 0 ? ALLOWED_REQUESTS_PER_INTERVAL : 200,
    };
    rateLimiter.set(token, data, {
      ttl,
    });
    return data;
  }
};
