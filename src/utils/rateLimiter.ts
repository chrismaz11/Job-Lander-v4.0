interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  skipSuccessfulRequests?: boolean;
}

interface RequestRecord {
  timestamp: number;
  success: boolean;
}

export class RateLimiter {
  private requests = new Map<string, RequestRecord[]>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get existing requests for this key
    let keyRequests = this.requests.get(key) || [];
    
    // Remove expired requests
    keyRequests = keyRequests.filter(req => req.timestamp > windowStart);
    
    // Filter out successful requests if configured
    const relevantRequests = this.config.skipSuccessfulRequests 
      ? keyRequests.filter(req => !req.success)
      : keyRequests;
    
    // Update the map
    this.requests.set(key, keyRequests);
    
    return relevantRequests.length < this.config.maxRequests;
  }

  recordRequest(key: string, success = true): void {
    const keyRequests = this.requests.get(key) || [];
    keyRequests.push({
      timestamp: Date.now(),
      success
    });
    this.requests.set(key, keyRequests);
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    const keyRequests = this.requests.get(key) || [];
    const recentRequests = keyRequests.filter(req => req.timestamp > windowStart);
    
    const relevantRequests = this.config.skipSuccessfulRequests 
      ? recentRequests.filter(req => !req.success)
      : recentRequests;
    
    return Math.max(0, this.config.maxRequests - relevantRequests.length);
  }

  getResetTime(key: string): number {
    const keyRequests = this.requests.get(key) || [];
    if (keyRequests.length === 0) return 0;
    
    const oldestRequest = keyRequests[0];
    return oldestRequest.timestamp + this.config.windowMs;
  }

  clear(key?: string): void {
    if (key) {
      this.requests.delete(key);
    } else {
      this.requests.clear();
    }
  }
}

// Pre-configured rate limiters
export const apiRateLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
  skipSuccessfulRequests: true
});

export const uploadRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60 * 1000 // 1 minute
});

export const aiRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000 // 1 minute
});
