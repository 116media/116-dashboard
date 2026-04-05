import { useEffect, useState } from "react";

/**
 * Debounces a value by the specified delay.
 *
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds (default: 400)
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};
