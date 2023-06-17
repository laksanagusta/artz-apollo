import { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setdebounceValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
