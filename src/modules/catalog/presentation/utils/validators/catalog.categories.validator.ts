import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for category create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const CategoriesValidator = {
    /**
     * Validates category name field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 80 characters
     */
    name: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 80)
    ],

    /**
     * Validates category description field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 300 characters
     */
    description: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 300)
    ],

    /**
     * Validates content type selection field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    contentTypeId: (label: string): Rule[] => [ValidatorUtils.required(label)],

    /**
     * Validates pricing tier selection field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    pricingTierId: (label: string): Rule[] => [ValidatorUtils.required(label)],

    /**
     * Validates price in USD field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be at least 0
     */
    priceUsd: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.numericMin(label, 0)
    ]
} as const;
