import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const count = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(count);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
