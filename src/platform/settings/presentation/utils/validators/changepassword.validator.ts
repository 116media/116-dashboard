import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for the change password form.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Uses centralized ValidatorUtils for consistent validation logic.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const ChangePasswordValidator = {
    /**
     * Validates current password field.
     *
     * @param {string} name - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    oldPassword: (name: string): Rule[] => [ValidatorUtils.required(name)],

    /**
     * Validates new password field.
     *
     * @param {string} name - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be at least 6 characters
     * - Must contain at least 1 uppercase, 1 lowercase, 1 digit
     */
    newPassword: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\s\S]{6,}$/,
            message: `${name} doit avoir au moins 6 caractères et contenir 1 majuscule, 1 minuscule, 1 chiffre`
        }
    ],

    /**
     * Validates confirm password field.
     *
     * @param {string} name - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must match the new password field
     */
    confirmPassword: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        ({ getFieldValue }) => ({
            validator(_: unknown, value: string) {
                if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error("Les mots de passe ne correspondent pas"));
            }
        })
    ]
} as const;
