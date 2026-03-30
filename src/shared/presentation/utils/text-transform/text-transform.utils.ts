/**
 * Splits a string into an array of words.
 *
 * Handles camelCase, PascalCase, snake_case, kebab-case,
 * dot.case, path/case, spaces, and mixed formats.
 */
function split(value: string): string[] {
    return value
        .replace(/([a-z\d])([A-Z])/g, "$1\0$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1\0$2")
        .split(/[\0\s_\-./\\]+/)
        .filter(Boolean);
}

/**
 * String case transformation utility.
 *
 * @description
 * Provides methods to convert strings between common naming conventions:
 * camelCase, PascalCase, Capital Case, snake_case, kebab-case,
 * CONSTANT_CASE, and others.
 *
 * @example
 * ```typescript
 * TextTransform.capitalCase("superAdmin") // "Super Admin"
 * TextTransform.snakeCase("TestValue")    // "test_value"
 * TextTransform.kebabCase("TEST_VALUE")   // "test-value"
 * ```
 */
export const TextTransform = {
    /**
     * @example TextTransform.camelCase("TEST_VALUE") // "testValue"
     */
    camelCase(value: string): string {
        const words = split(value);
        return words
            .map((word, i) =>
                i === 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join("");
    },

    /**
     * @example TextTransform.pascalCase("test value") // "TestValue"
     */
    pascalCase(value: string): string {
        return split(value)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
    },

    /**
     * @example TextTransform.capitalCase("testValue") // "Test Value"
     */
    capitalCase(value: string): string {
        return split(value)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    },

    /**
     * @example TextTransform.constantCase("testValue") // "TEST_VALUE"
     */
    constantCase(value: string): string {
        return split(value)
            .map((word) => word.toUpperCase())
            .join("_");
    },

    /**
     * @example TextTransform.snakeCase("testValue") // "test_value"
     */
    snakeCase(value: string): string {
        return split(value)
            .map((word) => word.toLowerCase())
            .join("_");
    },

    /**
     * @example TextTransform.kebabCase("testValue") // "test-value"
     */
    kebabCase(value: string): string {
        return split(value)
            .map((word) => word.toLowerCase())
            .join("-");
    },

    /**
     * @example TextTransform.dotCase("testValue") // "test.value"
     */
    dotCase(value: string): string {
        return split(value)
            .map((word) => word.toLowerCase())
            .join(".");
    },

    /**
     * @example TextTransform.noCase("testValue") // "test value"
     */
    noCase(value: string): string {
        return split(value)
            .map((word) => word.toLowerCase())
            .join(" ");
    },

    /**
     * @example TextTransform.pathCase("testValue") // "test/value"
     */
    pathCase(value: string): string {
        return split(value)
            .map((word) => word.toLowerCase())
            .join("/");
    },

    /**
     * @example TextTransform.sentenceCase("testValue") // "Test value"
     */
    sentenceCase(value: string): string {
        const words = split(value).map((word) => word.toLowerCase());
        if (words.length === 0) return "";
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(" ");
    },

    /**
     * @example TextTransform.pascalSnakeCase("testValue") // "Test_Value"
     */
    pascalSnakeCase(value: string): string {
        return split(value)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("_");
    },

    /**
     * @example TextTransform.trainCase("testValue") // "Test-Value"
     */
    trainCase(value: string): string {
        return split(value)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("-");
    }
};
