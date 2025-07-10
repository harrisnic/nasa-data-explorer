import NodeCache from 'node-cache';

class CacheService {
    private cache: NodeCache;

    constructor(ttlSeconds: number = 3600) { // Default TTL of 1 hour
        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2, // Check for expired keys at 20% of TTL
        });
    }

    // Get value from cache
    get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    // Set value in cache
    set<T>(key: string, value: T, ttl: number = 3600): boolean {
        return this.cache.set(key, value, ttl);
    }

    // Delete value from cache
    del(key: string): number {
        return this.cache.del(key);
    }

    // Clear all values from cache
    flush(): void {
        this.cache.flushAll();
    }

    // Get multiple values from cache
    getMultiple<T>(keys: string[]): { [key: string]: T } {
        return this.cache.mget<T>(keys);
    }

    // Check if key exists in cache
    has(key: string): boolean {
        return this.cache.has(key);
    }
}

// Create and export a singleton instance
export const cacheService = new CacheService();
