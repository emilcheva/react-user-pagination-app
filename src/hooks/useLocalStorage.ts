import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const initial = JSON.parse(saved);
      return initial;
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
    }
  }
  return defaultValue;
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
