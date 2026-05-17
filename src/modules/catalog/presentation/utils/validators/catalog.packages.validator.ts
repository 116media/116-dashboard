import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for package create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const PackagesValidator = {
    /**
     * Validates package name field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 100 characters
     */
    name: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 100)
    ],

    /**
     * Validates package description field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 500 characters
     */
    description: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 500)
    ],

    /**
     * Validates slot category selection field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    categoryId: (label: string): Rule[] => [ValidatorUtils.required(label)],

    /**
     * Validates slot quantity field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be at least 1
     */
    quantity: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.numericMin(label, 1)
    ]
} as const;
