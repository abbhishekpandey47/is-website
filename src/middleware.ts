import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import type { NextRequest } from 'next/server';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiting configuration
const RATE_LIMIT = 5; // 5 requests
const WINDOW_SIZE = 60; // 60 seconds (1 minute)

export async function middleware(request: NextRequest) {
  // Only apply rate limiting to /api/support POST requests
  if (request.nextUrl.pathname === '/api/support' && request.method === 'POST') {
    try {
      const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
      const key = `rate-limit:${ip}`;

      // Get current request count
      const current = await redis.get<number>(key);
      
      if (current !== null && current >= RATE_LIMIT) {
        // Calculate retry after time
        const ttl = await redis.ttl(key);
        const retryAfter = ttl > 0 ? ttl : WINDOW_SIZE;
        
        return new NextResponse(
          JSON.stringify({ 
            error: 'Too many requests', 
            message: 'Rate limit exceeded. Please try again later.' 
          }), 
          { 
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': RATE_LIMIT.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': (Math.floor(Date.now() / 1000) + retryAfter).toString()
            }
          }
        );
      }

      // Increment the rate limit counter
      const pipeline = redis.pipeline();
      pipeline.incr(key);
      if (current === null) {
        pipeline.expire(key, WINDOW_SIZE);
      }
      await pipeline.exec();

      // Add rate limit headers to the response
      const response = NextResponse.next();
      const remaining = RATE_LIMIT - (current || 0) - 1;
      
      response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString());
      response.headers.set('X-RateLimit-Remaining', Math.max(0, remaining).toString());
      response.headers.set('X-RateLimit-Reset', (Math.floor(Date.now() / 1000) + WINDOW_SIZE).toString());
      
      return response;
    } catch (error) {
      console.error('Rate limiter error:', error);
      // In case of Redis failure, we'll allow the request through
      // This is a fail-open approach to avoid blocking legitimate traffic
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware will run on
export const config = {
  matcher: '/api/support',
};
