/**
 * In-memory sliding window rate limiter for registration, login, and sensitive APIs.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  const record = memoryStore.get(identifier) || { timestamps: [] };
  // Filter out timestamps outside current window
  const validTimestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (validTimestamps.length >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: Math.ceil((validTimestamps[0] + windowMs - now) / 1000),
    };
  }

  validTimestamps.push(now);
  memoryStore.set(identifier, { timestamps: validTimestamps });

  return {
    success: true,
    remaining: limit - validTimestamps.length,
    resetTime: Math.ceil(windowMs / 1000),
  };
}
