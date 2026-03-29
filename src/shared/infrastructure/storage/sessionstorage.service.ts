/**
 * SessionStorage service providing type-safe wrapper around browser's sessionStorage API.
 *
 * @description
 * Handles serialization/deserialization of complex data types and provides
 * error handling for all sessionStorage operations.
 *
 * @remarks
 * - Automatically handles JSON serialization for objects and arrays
 * - Returns null if key doesn't exist or on error
 * - Data is cleared automatically when the browser tab closes
 * - Logs errors to console for debugging
 */
export const SessionStorageService = {
    /**
     * Stores a value in sessionStorage with automatic serialization.
     *
     * @template T - Type of the value to store
     * @param {string} key - The sessionStorage key
     * @param {T} value - The value to store (string, object, or array)
     *
     * @example
     * ```typescript
     * SessionStorageService.setItem('session-expired', 'true');
     * ```
     */
    setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = typeof value === "string" ? value : JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error saving to sessionStorage: ${key}`, error);
        }
    },

    /**
     * Retrieves and deserializes a value from sessionStorage.
     *
     * @template T - Expected type of the retrieved value
     * @param {string} key - The sessionStorage key to retrieve
     * @returns {T | null} The deserialized value or null if not found/error
     *
     * @example
     * ```typescript
     * const expired = SessionStorageService.getItem<string>('session-expired');
     * ```
     */
    getItem<T>(key: string): T | null {
        try {
            const item = sessionStorage.getItem(key);
            if (!item) return null;

            const isJson = item.startsWith("{") || item.startsWith("[");
            return (isJson ? JSON.parse(item) : item) as T;
        } catch (error) {
            console.error(`Error reading from sessionStorage: ${key}`, error);
            return null;
        }
    },

    /**
     * Removes an item from sessionStorage.
     *
     * @param {string} key - The sessionStorage key to remove
     *
     * @example
     * ```typescript
     * SessionStorageService.removeItem('session-expired');
     * ```
     */
    removeItem(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from sessionStorage: ${key}`, error);
        }
    }
};
