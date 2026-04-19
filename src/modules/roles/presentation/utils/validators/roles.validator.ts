import type { Rule } from "antd/es/form";

/**
 * Validation rules for role create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const RolesValidator = {
    /**
     * Validates role name field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 20 characters
     */
    name: (label: string): Rule[] => [
        { required: true, message: `${label} est requis` },
        { max: 20, message: `${label} doit contenir au maximum 20 caractères` }
    ],

    /**
     * Validates role description field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 300 characters
     */
    description: (label: string): Rule[] => [
        { required: true, message: `${label} est requis` },
        { max: 300, message: `${label} doit contenir au maximum 300 caractères` }
    ]
} as const;
