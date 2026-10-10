import { useState, useEffect, useCallback } from 'react';
import { Store } from '@/lib/store';

/**
 * Hook to subscribe to store changes
 */
export function useStore<T>(store: Store<T>): [T, (newState: Partial<T>) => void] {
  const [state, setState] = useState<T>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, [store]);

  const updateState = useCallback(
    (newState: Partial<T>) => {
      store.setState(newState);
    },
    [store]
  );

  return [state, updateState];
}
