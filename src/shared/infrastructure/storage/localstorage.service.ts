/**
 * LocalStorage service providing type-safe wrapper around browser's localStorage API.
 *
 * @description
 * Handles serialization/deserialization of complex data types and provides
 * error handling for all localStorage operations.
 *
 * @remarks
 * - Automatically handles JSON serialization for objects and arrays
 * - Returns null if key doesn't exist or on error
 * - Logs errors to console for debugging
 */
export const LocalStorageService = {
    /**
     * Stores a value in localStorage with automatic serialization.
     *
     * @template T - Type of the value to store
     * @param {string} key - The localStorage key
     * @param {T} value - The value to store (string, object, or array)
     *
     * @example
     * ```typescript
     * LocalStorageService.setItem('theme', 'dark');
     * LocalStorageService.setItem('settings', { theme: 'dark', lang: 'fr' });
     * ```
     */
    setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = typeof value === "string" ? value : JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error saving to localStorage: ${key}`, error);
        }
    },

    /**
     * Retrieves and deserializes a value from localStorage.
     *
     * @template T - Expected type of the retrieved value
     * @param {string} key - The localStorage key to retrieve
     * @returns {T | null} The deserialized value or null if not found/error
     *
     * @example
     * ```typescript
     * const theme = LocalStorageService.getItem<string>('theme');
     * const settings = LocalStorageService.getItem<Settings>('settings');
     * ```
     */
    getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            const isJson = item.startsWith("{") || item.startsWith("[");
            return (isJson ? JSON.parse(item) : item) as T;
        } catch (error) {
            console.error(`Error reading from localStorage: ${key}`, error);
            return null;
        }
    },

    /**
     * Removes an item from localStorage.
     *
     * @param {string} key - The localStorage key to remove
     *
     * @example
     * ```typescript
     * LocalStorageService.removeItem('user');
     * ```
     */
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from localStorage: ${key}`, error);
        }
    }
};
