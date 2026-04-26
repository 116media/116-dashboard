import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for promotion level create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const PromotionLevelsValidator = {
    /**
     * Validates promotion level name field.
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
     * Validates promotion level duration field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    durationDays: (label: string): Rule[] => [ValidatorUtils.required(label)],

    /**
     * Validates promotion level price field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    priceUsd: (label: string): Rule[] => [ValidatorUtils.required(label)]
} as const;
