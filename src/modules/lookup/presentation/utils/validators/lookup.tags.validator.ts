import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for tag create forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const TagsValidator = {
    /**
     * Validates tag name field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 50 characters
     */
    name: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 50)
    ],

    /**
     * Validates tag slug field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 50 characters
     * - Must be lowercase with hyphens only
     */
    slug: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 50),
        {
            pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
            message: `${label} doit être en minuscules avec des tirets`
        }
    ]
} as const;
