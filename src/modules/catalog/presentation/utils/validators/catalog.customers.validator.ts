import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for customer create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const CustomersValidator = {
    /**
     * Validates customer full name field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 100 characters
     */
    fullName: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 100)
    ],

    /**
     * Validates customer email field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must be a valid email address
     * - Must not exceed 200 characters
     */
    email: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        { type: "email", message: `${label} doit être une adresse email valide` },
        ValidatorUtils.max(label, 200)
    ],

    /**
     * Validates customer phone field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Must not exceed 20 characters
     */
    phone: (label: string): Rule[] => [ValidatorUtils.max(label, 20)],

    /**
     * Validates customer company field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Must not exceed 100 characters
     */
    company: (label: string): Rule[] => [ValidatorUtils.max(label, 100)],

    /**
     * Validates customer notes field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Must not exceed 500 characters
     */
    notes: (label: string): Rule[] => [ValidatorUtils.max(label, 500)]
} as const;
