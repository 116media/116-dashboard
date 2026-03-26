import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for the forgot password form.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Uses centralized ValidationUtils for consistent validation logic.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const ForgotPasswordValidator = {
    /**
     * Validates email field.
     *
     * @param {string} fieldName - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be valid email format
     */
    email: (fieldName: string): Rule[] => [
        ValidatorUtils.required(fieldName),
        ValidatorUtils.email(fieldName)
    ],

    /**
     * Validates OTP field.
     *
     * @param {string} fieldName - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must contain only numbers
     * - Must be exactly 6 characters
     */
    otp: (fieldName: string): Rule[] => [
        ValidatorUtils.required(fieldName),
        ValidatorUtils.numericOnly(fieldName),
        ValidatorUtils.minmax(fieldName, { min: 6, max: 6 })
    ]
} as const;
