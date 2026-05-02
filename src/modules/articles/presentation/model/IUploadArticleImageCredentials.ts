import type { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";

/**
 * Form model for uploading an article image.
 *
 * @interface IUploadArticleImageCredentials
 * @property {File} file - Image file to upload
 * @property {ArticleImageType} imageType - Type of image (e.g. cover, inline)
 */
export interface IUploadArticleImageCredentials {
    file: File;
    imageType: ArticleImageType;
}
