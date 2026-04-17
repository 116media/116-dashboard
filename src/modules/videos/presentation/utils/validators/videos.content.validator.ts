import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for video content create/edit forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const VideosContentValidator = {
    /**
     * Validates category selection field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     */
    categoryId: (label: string): Rule[] => [ValidatorUtils.required(label)],

    /**
     * Validates video title field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 200 characters
     */
    title: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 200)
    ],

    /**
     * Validates video slug field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 250 characters
     */
    slug: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 250)
    ],

    /**
     * Validates video description field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 2000 characters
     */
    description: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 2000)
    ]
} as const;
