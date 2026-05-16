import type { Rule } from "antd/es/form";
import { PhoneNumberUtil } from "google-libphonenumber";
import { COUNTRY_LIST } from "@/shared/infrastructure/constants/countries";

/**
 * Min/max length configuration for validation.
 *
 * @interface IMinMax
 * @property {number} min - Minimum length (optional)
 * @property {number} max - Maximum length
 */
interface IMinMax {
    min?: number;
    max: number;
}

/**
 * Form validation utility functions for Ant Design forms.
 *
 * @description
 * Provides reusable validation rules with French error messages.
 */
export const ValidatorUtils = {
    /**
     * Creates a required field validation rule.
     *
     * @param {string} name - Field display name for error message
     * @returns {Rule} Ant Design validation rule
     */
    required: (name: string): Rule => ({
        required: true,
        message: `${name} obligatoire`
    }),

    /**
     * Creates a maximum length validation rule.
     *
     * @param {string} name - Field display name for error message
     * @param {number} max - Maximum allowed length
     * @returns {Rule} Ant Design validation rule
     */
    max: (name: string, max: number): Rule => ({
        max,
        message: `${name} doit contenir au maximum ${max} caractères`
    }),

    /**
     * Creates a min/max length validation rule.
     *
     * @param {string} name - Field display name for error message
     * @param {IMinMax} len - Min and max length configuration
     * @returns {Rule} Ant Design validation rule
     */
    minmax: (name: string, len: IMinMax): Rule => {
        const rule = { min: len.min, max: len.max };
        return {
            ...rule,
            message: `${name} doit contenir entre ${len.min} et ${len.max} caractères`
        };
    },

    /**
     * Creates an email validation rule.
     *
     * @param {string} name - Field display name for error message
     * @returns {Rule} Ant Design validation rule
     *
     * @remarks
     * Validates that the input is a valid email format
     */
    email: (name: string): Rule => ({
        type: "email",
        message: `${name} a un format invalide`
    }),

    /**
     * Creates a numeric-only validation rule.
     *
     * @param {string} name - Field display name for error message
     * @returns {Rule} Ant Design validation rule
     *
     * @remarks
     * Validates that the input contains only numbers
     */
    numericOnly: (name: string): Rule => ({
        pattern: /^[0-9]+$/,
        message: `${name} doit contenir uniquement des chiffres`
    }),

    /**
     * Creates a numeric minimum value validation rule.
     *
     * @param {string} name - Field display name for error message
     * @param {number} min - Minimum allowed value
     * @returns {Rule} Ant Design validation rule
     */
    numericMin: (name: string, min: number): Rule => ({
        min,
        type: "number",
        message: `${name} doit être supérieur ou égal à ${min}`
    }),

    // TODO: integrate phone number existence check via Twilio Lookup or NumVerify API on the backend

    /**
     * Creates a phone number validation rule using google-libphonenumber.
     *
     * @param {string} name - Field display name for error message
     * @param {string | undefined} phoneDialCode - International dial code (e.g. "+33")
     * @returns {Rule} Ant Design validation rule
     *
     * @remarks
     * Validates the phone number format and checks region validity
     * using the dial code to resolve the country ISO code.
     */
    phone: (name: string, phoneDialCode: string | undefined): Rule => ({
        validator(_rule: unknown, value: string) {
            if ([null, undefined, ""].includes(value)) {
                return Promise.resolve();
            }

            const regexDialCode = /^\+\d{1,4}$/;
            if (!phoneDialCode || !regexDialCode.test(phoneDialCode)) {
                return Promise.reject("Veuillez d'abord sélectionner un indicatif téléphonique");
            }

            const regexPhone = /^[1-9][0-9]{1,12}$/;
            if (!regexPhone.test(value)) {
                return Promise.reject(`${phoneDialCode}${value} a un format invalide`);
            }

            const fullPhoneNumber = `${phoneDialCode}${value}`;
            const country = COUNTRY_LIST.find((c) => c.dialCode === phoneDialCode);
            const isoCode = country?.isoCode;

            try {
                const phoneUtil = PhoneNumberUtil.getInstance();
                const parsed = phoneUtil.parse(fullPhoneNumber, isoCode);
                return phoneUtil.isValidNumberForRegion(parsed, isoCode)
                    ? Promise.resolve()
                    : Promise.reject(`${name} est invalide pour la région choisie`);
            } catch {
                return Promise.reject(`${name} a un format invalide`);
            }
        }
    })
} as const;
