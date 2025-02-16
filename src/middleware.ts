import { rateLimit } from "./lib/rateLimiter";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STATUS_FORBIDDEN, STATUS_TOO_MANY_REQUESTS } from "./lib/constants";
import { apiErrorResponse } from "./lib/utils";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const ip =
    process.env.NODE_ENV === "production"
      ? req.headers.get("x-forwarded-for")
      : req.headers.get("host");
  if (!ip)
    return NextResponse.json("no ip detected", { status: STATUS_FORBIDDEN });

  const isOrderApiUrl = /api\/orders\/?$/i.test(req.url);
  const method = req.method;

  const token = `rl-${ip}`;
  // prevent rate limiting for dev
  if (
    process.env.NODE_ENV === "development" &&
    token === process.env.DEVONLY_BYPASS_TOKEN
  ) {
    console.warn("Bypassed Rate limit du to match with bypassToken");
    return NextResponse.next();
  }

  const limitOrders = method === "POST" && isOrderApiUrl;

  const { remainingOrders, remainingRequests } = rateLimit({
    token,
    // only affect the orders rate limit if the url points to POST orders
    limitOrders,
  });
  if (limitOrders) {
    console.log(
      `[RATE LIMITER] ip token ${token} has ${remainingOrders} remaining orders and ${remainingRequests} remaining requests`,
    );
  }
  // if the user hits the limit, reject all subsequent requests until the ratelimiter is reset
  if (remainingOrders === 0 || remainingRequests === 0) {
    return apiErrorResponse("Too many requests", STATUS_TOO_MANY_REQUESTS);
  }

  return NextResponse.next();
}

// Public routes that should be affected by the rate limiting
export const config = {
  matcher: [
    "/api/orders",
    "/api/products",
    "/api/products/[code]",
    "/api/shipping-locations/[wilaya]",
    "/api/wilayas",
    "/api/towns/[code]",
    "/api/categories/[code]",
    "/api/accounts",
  ],
};
