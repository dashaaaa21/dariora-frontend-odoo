import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import { getErrorMessage } from '@/lib/error-handler';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (
      endpoint: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
      body?: any,
      options?: UseApiOptions
    ) => {
      try {
        setState({ data: null, loading: true, error: null });

        let data;
        if (method === 'GET') {
          data = await apiClient.get<T>(endpoint);
        } else if (method === 'POST') {
          data = await apiClient.post<T>(endpoint, body);
        } else if (method === 'PUT') {
          data = await apiClient.put<T>(endpoint, body);
        } else if (method === 'DELETE') {
          data = await apiClient.delete<T>(endpoint);
        } else if (method === 'PATCH') {
          data = await apiClient.patch<T>(endpoint, body);
        }

        setState({ data, loading: false, error: null });
        options?.onSuccess?.(data);
        return data;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setState({ data: null, loading: false, error: errorMessage });
        options?.onError?.(errorMessage);
        throw error;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    request,
    reset,
  };
}
