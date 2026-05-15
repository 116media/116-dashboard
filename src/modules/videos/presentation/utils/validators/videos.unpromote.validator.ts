import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for video unpromote forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints for unpromote reason.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const VideosUnpromoteValidator = {
    /**
     * Validates unpromote reason field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 500 characters
     */
    reason: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 500)
    ]
} as const;
