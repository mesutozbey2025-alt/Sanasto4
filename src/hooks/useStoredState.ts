import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

function readStored<T>(key: string, defaults: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as unknown;
    if (typeof defaults === 'object' && defaults !== null && typeof parsed === 'object' && parsed !== null) {
      return { ...(defaults as object), ...(parsed as object) } as T;
    }
    return parsed as T;
  } catch {
    return defaults;
  }
}

export function useStoredState<T>(
  key: string,
  defaults: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readStored(key, defaults));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
