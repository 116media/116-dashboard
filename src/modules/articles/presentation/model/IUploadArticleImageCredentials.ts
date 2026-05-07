import type { EnumArticleImageType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Form model for uploading an article image.
 *
 * @interface IUploadArticleImageCredentials
 * @property {File} file - Image file to upload
 * @property {EnumArticleImageType} imageType - Type of image (e.g. cover, inline)
 */
export interface IUploadArticleImageCredentials {
    file: File;
    imageType: EnumArticleImageType;
}
