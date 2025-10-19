interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class SmartCache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  invalidate(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  // Cache with automatic refresh
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl = this.defaultTTL
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached) return cached;

    const data = await fetcher();
    this.set(key, data, ttl);
    return data;
  }

  // Preload critical data
  async preload(keys: Array<{ key: string; fetcher: () => Promise<any>; ttl?: number }>): Promise<void> {
    await Promise.allSettled(
      keys.map(({ key, fetcher, ttl }) => this.getOrFetch(key, fetcher, ttl))
    );
  }
}

export const cache = new SmartCache();
