import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for lyrics content create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const LyricsContentValidator = {
    /**
     * Validates song title field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 200 characters
     */
    songTitle: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 200)
    ],

    /**
     * Validates artist name field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 100 characters
     */
    artistName: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 100)
    ],

    /**
     * Validates lyrics text field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    lyricsText: (label: string): Rule[] => [ValidatorUtils.required(label)],

    /**
     * Validates language field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 10 characters
     */
    language: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 10)
    ]
} as const;
