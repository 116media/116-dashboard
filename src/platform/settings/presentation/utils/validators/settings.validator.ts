import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for the account info edit form.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Uses centralized ValidatorUtils for consistent validation logic.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const SettingsValidator = {
    /**
     * Validates username field.
     *
     * @param {string} name - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be between 2 and 50 characters
     */
    userName: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        ValidatorUtils.minmax(name, { min: 2, max: 50 })
    ],

    /**
     * Validates country name field.
     *
     * @param {string} name - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    countryName: (name: string): Rule[] => [ValidatorUtils.required(name)],

    /**
     * Validates phone number field.
     *
     * @param {string} name - Display name for error messages
     * @param {string} phoneDialCode - Country dial code for phone validation
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be a valid phone number for the selected country
     */
    phonePartial: (name: string, phoneDialCode?: string): Rule[] => [
        ValidatorUtils.required(name),
        ValidatorUtils.phone(name, phoneDialCode)
    ]
} as const;
