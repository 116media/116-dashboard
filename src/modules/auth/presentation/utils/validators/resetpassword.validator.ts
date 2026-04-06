import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for reset password form fields.
 *
 * @description
 * Provides Ant Design Form validation rules for reset password form.
 * All error messages are in French to match the application locale.
 *
 * @remarks
 * - Uses Ant Design's Rule type for type safety
 * - Marked as const to prevent accidental mutation
 */
export const ResetPasswordValidator = {
    /**
     * Validation rules for new password field.
     *
     * @param {string} name - Field display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * Rules:
     * - Required field
     * - Minimum 6 characters
     * - At least 1 uppercase letter
     * - At least 1 lowercase letter
     * - At least 1 digit (0-9)
     */
    newPassword: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\s\S]{6,}$/,
            message: `${name} doit avoir au moins 6 caractères et contenir 1 majuscule, 1 minuscule, 1 chiffre`
        }
    ],

    /**
     * Validation rules for confirm password field.
     *
     * @param {string} name - Field display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * Rules:
     * - Required field
     * - Must match the newPassword field
     */
    confPassword: (name: string): Rule[] => [
        ({ getFieldValue }) => ({
            validator(_rule: unknown, value: string) {
                const isConfPassword = [undefined, "", null].includes(
                    getFieldValue(["confPassword"])
                );

                if (isConfPassword) return Promise.reject(`${name} est requis`);
                if (value !== getFieldValue(["newPassword"])) {
                    return Promise.reject("Les deux mots de passe ne correspondent pas");
                }

                return Promise.resolve();
            }
        })
    ]
} as const;
