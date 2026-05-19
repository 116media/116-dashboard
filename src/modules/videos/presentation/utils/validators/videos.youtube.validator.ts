import type { Rule } from "antd/es/form";
import { isValidYoutubeUrl } from "@/modules/videos/presentation/utils/youtube/youtube.utils";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

/**
 * Validation rules for YouTube video URL forms.
 *
 * @description
 * Provides reusable validation rules for Ant Design Form components.
 * Matches the backend's FluentValidation constraints for YouTube URLs.
 */
export const VideosYoutubeValidator = {
    /**
     * Validates YouTube video URL field.
     *
     * @param {string} label - Display name for error messages
     * @returns {Rule[]} Array of validation rules
     */
    youtubeVideoUrl: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 200),
        {
            validator: (_: Rule, value: string) => {
                if (!value || isValidYoutubeUrl(value)) return Promise.resolve();
                return Promise.reject(new Error("Veuillez saisir une URL YouTube valide."));
            }
        }
    ]
} as const;
