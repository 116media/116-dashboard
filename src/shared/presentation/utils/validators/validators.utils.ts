import type { Rule } from "antd/es/form";

/**
 * Min/max length configuration for validation.
 *
 * @interface IMinMax
 * @property {number} min - Minimum length (optional)
 * @property {number} max - Maximum length
 */
interface IMinMax {
    min?: number;
    max: number;
}

/**
 * Form validation utility functions for Ant Design forms.
 *
 * @description
 * Provides reusable validation rules with French error messages.
 */
export const ValidatorUtils = {
    /**
     * Creates a required field validation rule.
     *
     * @param {string} name - Field display name for error message
     * @returns {Rule} Ant Design validation rule
     */
    required: (name: string): Rule => ({
        required: true,
        message: `${name} obligatoire`
    }),

    /**
     * Creates a maximum length validation rule.
     *
     * @param {string} name - Field display name for error message
     * @param {number} max - Maximum allowed length
     * @returns {Rule} Ant Design validation rule
     */
    max: (name: string, max: number): Rule => ({
        max,
        message: `${name} doit contenir au maximum ${max} caractères`
    }),

    /**
     * Creates a min/max length validation rule.
     *
     * @param {string} name - Field display name for error message
     * @param {IMinMax} len - Min and max length configuration
     * @returns {Rule} Ant Design validation rule
     */
    minmax: (name: string, len: IMinMax): Rule => {
        const rule = { min: len.min, max: len.max };
        return {
            ...rule,
            message: `${name} doit contenir entre ${len.min} et ${len.max} caractères`
        };
    },

    /**
     * Creates an email validation rule.
     *
     * @param {string} name - Field display name for error message
     * @returns {Rule} Ant Design validation rule
     *
     * @remarks
     * Validates that the input is a valid email format
     */
    email: (name: string): Rule => ({
        type: "email",
        message: `${name} a un format invalide`
    }),

    /**
     * Creates a numeric-only validation rule.
     *
     * @param {string} name - Field display name for error message
     * @returns {Rule} Ant Design validation rule
     *
     * @remarks
     * Validates that the input contains only numbers
     */
    numericOnly: (name: string): Rule => ({
        pattern: /^[0-9]+$/,
        message: `${name} doit contenir uniquement des chiffres`
    })
} as const;
