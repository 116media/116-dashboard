import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for article SEO metadata forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints for SEO fields.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const ArticlesSeoValidator = {
    /**
     * Validates SEO meta title field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 70 characters
     */
    metaTitle: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 70)
    ],

    /**
     * Validates SEO meta description field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 160 characters
     */
    metaDescription: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 160)
    ]
} as const;
