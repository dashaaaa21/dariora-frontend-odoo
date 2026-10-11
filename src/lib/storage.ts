/**
 * Abstracted storage layer for local/session storage
 */

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

class SessionStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}

export class Storage {
  constructor(private adapter: StorageAdapter = new LocalStorageAdapter()) {}

  get<T>(key: string, defaultValue?: T): T | null {
    const item = this.adapter.getItem(key);
    if (!item) return defaultValue ?? null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return defaultValue ?? null;
    }
  }

  set<T>(key: string, value: T): void {
    this.adapter.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.adapter.removeItem(key);
  }

  clear(): void {
    this.adapter.clear();
  }

  exists(key: string): boolean {
    return this.adapter.getItem(key) !== null;
  }
}

export const localStorage = new Storage(new LocalStorageAdapter());
export const sessionStorage = new Storage(new SessionStorageAdapter());
