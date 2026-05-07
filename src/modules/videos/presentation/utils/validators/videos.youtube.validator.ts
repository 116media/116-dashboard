import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for YouTube video ID forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints for YouTube ID.
 *
 * @remarks
 * All methods return Rule arrays compatible with Ant Design Form's rules prop.
 */
export const VideosYoutubeValidator = {
    /**
     * Validates YouTube video ID field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     *
     * @remarks
     * - Required field
     * - Must not exceed 20 characters
     */
    youtubeVideoId: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 20)
    ]
} as const;
