import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for article rejection forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints for rejection.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const ArticlesRejectValidator = {
    /**
     * Validates rejection reason field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 500 characters
     */
    rejectionReason: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 500)
    ]
} as const;
