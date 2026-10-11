/**
 * Caching utilities with TTL support
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class Cache<T = any> {
  private store = new Map<string, CacheEntry<T>>();

  set(key: string, value: T, ttlMs: number = 5 * 60 * 1000): void {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key: string): T | null {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  getOrSet(key: string, factory: () => T, ttlMs?: number): T {
    const cached = this.get(key);
    if (cached !== null) {
      return cached;
    }

    const value = factory();
    this.set(key, value, ttlMs);
    return value;
  }
}

export const apiCache = new Cache();
