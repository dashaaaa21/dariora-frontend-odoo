import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  onSubmit: (values: T) => Promise<void> | void;
  onError?: (error: Error) => void;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string | undefined>;
  isSubmitting: boolean;
  isDirty: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for form state management
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);
      // Clear error when field is edited
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const fieldValue = type === 'checkbox' ? (e.target as any).checked : value;
      setFieldValue(name as keyof T, fieldValue);
    },
    [setFieldValue]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);
        await options.onSubmit(values);
      } catch (error) {
        options.onError?.(error as Error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, options]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as any);
    setIsDirty(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    setFieldValue,
    setFieldError,
    handleChange,
    handleSubmit,
    reset,
  };
}
