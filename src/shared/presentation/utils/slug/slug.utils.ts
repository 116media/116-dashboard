/**
 * Slug generation utilities.
 *
 * @description
 * Provides functions to generate URL-friendly slugs from text.
 * Used across the dashboard for creating articles, videos,
 * tags, categories, and any other content with slug fields.
 */

/**
 * Converts a string to a URL-friendly slug.
 *
 * @description
 * Transforms text to lowercase, replaces spaces and special
 * characters with hyphens, removes non-alphanumeric characters,
 * strips diacritics, and trims leading/trailing hyphens.
 *
 * @param {string} text - The text to slugify
 * @returns {string} The slugified string
 *
 * @example
 * ```ts
 * slugify("Fally Ipupa") // "fally-ipupa"
 * slugify("116 Le Focus") // "116-le-focus"
 * slugify("  Hello   World  ") // "hello-world"
 * slugify("café & crème") // "cafe-creme"
 * ```
 */
export const slugify = (text: string): string => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
};

/**
 * Generates a random alphanumeric suffix for slug uniqueness.
 *
 * @description
 * Produces a mix of lowercase letters and digits to minimize
 * collision probability across concurrent slug generations.
 *
 * @param {number} [length=8] - Number of characters in the suffix
 * @returns {string} A random alphanumeric string
 *
 * @example
 * ```ts
 * generateSuffix()  // "a3x9k2m7"
 * generateSuffix(6) // "b4r8w1"
 * ```
 */
const generateSuffix = (length = 8): string => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let suffix = "";
    for (let i = 0; i < length; i++) {
        suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    return suffix;
};

/**
 * Generates a URL-friendly slug from text with an optional
 * unique suffix to prevent collisions.
 *
 * @param {string} text - The text to slugify
 * @param {object} [options] - Generation options
 * @param {boolean} [options.unique=false] - Append a random alphanumeric suffix
 * @param {number} [options.suffixLength=8] - Length of the random suffix
 * @returns {string} The generated slug
 */
export const generateSlug = (
    text: string,
    options?: { unique?: boolean; suffixLength?: number }
): string => {
    const base = slugify(text);
    return options?.unique ? `${base}-${generateSuffix(options.suffixLength)}` : base;
};