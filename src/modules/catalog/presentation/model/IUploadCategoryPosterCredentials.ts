/**
 * Form model for uploading (or replacing) a category poster image.
 *
 * @interface IUploadCategoryPosterCredentials
 * @property {File} file - The poster image file (multipart field name `file` on the backend)
 */
export interface IUploadCategoryPosterCredentials {
    file: File;
}
