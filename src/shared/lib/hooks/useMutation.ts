// src/shared/lib/hooks/useMutation.ts
import { useState } from 'react';

type MutationFn<T, R> = (data: T) => Promise<R>;

export const useMutation = <T, R>(mutationFn: MutationFn<T, R>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: T): Promise<R | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const result = await mutationFn(data);
      return result;
    } catch (err) {
      setError('Error en la operación');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};