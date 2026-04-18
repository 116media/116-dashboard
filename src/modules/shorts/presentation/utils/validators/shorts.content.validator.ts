import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for short video create forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const ShortsContentValidator = {
    /**
     * Validates short video title field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 200 characters
     */
    title: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 200)
    ],

    /**
     * Validates short video slug field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 250 characters
     */
    slug: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 250)
    ]
} as const;
