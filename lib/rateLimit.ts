// Simple in-memory sliding window rate limiter (Fix 07 from 20 Fixes Checklist)
// Protects login, contact form, and AI APIs against brute-force and DDoS

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of ipMap.entries()) {
      if (now > record.resetTime) {
        ipMap.delete(key);
      }
    }
  }, 60 * 1000);
}

export function checkRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const record = ipMap.get(identifier);

  if (!record || now > record.resetTime) {
    ipMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}
