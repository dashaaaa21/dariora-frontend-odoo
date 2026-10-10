/**
 * Simple state management store
 */

type Listener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

// Auth store
export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

export const authStore = new Store<AuthState>({
  isAuthenticated: false,
  user: null,
  token: null,
});

// UI store
export interface UIState {
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
  notifications: any[];
}

export const uiStore = new Store<UIState>({
  sidebarOpen: true,
  theme: 'dark',
  notifications: [],
});
