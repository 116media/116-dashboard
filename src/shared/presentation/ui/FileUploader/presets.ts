/**
 * Upload preset configuration for the shared FileUploader.
 *
 * @description
 * Each preset defines the accepted file extensions, max size,
 * and whether cropping is supported. Presets match the backend
 * validation rules in `FileConstants.cs` and `CloudinaryService.cs`.
 */

/**
 * Accepted file extension configuration.
 *
 * @interface IUploadPreset
 *
 * @property {string[]} extensions - Allowed file extensions (e.g., [".jpg", ".png"])
 * @property {string} accept - HTML accept attribute for the file input
 * @property {number} maxSizeMB - Maximum file size in megabytes
 * @property {boolean} croppable - Whether image cropping is available
 * @property {string} hint - French hint text shown below the dropzone
 */
export interface IUploadPreset {
    extensions: string[];
    accept: string;
    maxSizeMB: number;
    croppable: boolean;
    hint: string;
}

/**
 * Image-only preset for article images, video/short thumbnails.
 * Matches backend `ValidateFile()` — 1 MB, images only.
 */
export const IMAGE_PRESET: IUploadPreset = {
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    accept: "image/jpeg,image/jpg,image/png,image/gif,image/webp",
    maxSizeMB: 1,
    croppable: true,
    hint: "JPG, PNG, GIF ou WebP — 1 Mo max"
};

/**
 * Raw file preset for payment proofs.
 * Matches backend `ValidateRawFile()` — 5 MB, images + PDF.
 */
export const RAW_FILE_PRESET: IUploadPreset = {
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf"],
    accept: "image/jpeg,image/jpg,image/png,image/gif,image/webp,application/pdf",
    maxSizeMB: 5,
    croppable: true,
    hint: "JPG, PNG, GIF, WebP ou PDF — 5 Mo max"
};

/**
 * Avatar preset for profile pictures.
 * Matches backend `ValidateFile()` — 1 MB, images only, always croppable.
 */
export const AVATAR_PRESET: IUploadPreset = {
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    accept: "image/jpeg,image/jpg,image/png,image/gif,image/webp",
    maxSizeMB: 1,
    croppable: true,
    hint: "JPG, PNG, GIF ou WebP — 1 Mo max"
};

/**
 * Video file preset for short video uploads.
 * Matches backend `ValidateVideoFile()` — 100 MB, video formats only.
 */
export const VIDEO_PRESET: IUploadPreset = {
    extensions: [".mp4", ".mov", ".webm", ".avi", ".mkv", ".3gp"],
    accept: "video/mp4,video/quicktime,video/webm,video/x-msvideo,video/x-matroska,video/3gpp",
    maxSizeMB: 100,
    croppable: false,
    hint: "MP4, MOV, WebM, AVI ou MKV — 100 Mo max"
};

/**
 * File extensions that should NOT be cropped even if preset allows cropping.
 * GIF cropping destroys animation, PDF is not an image.
 */
export const NON_CROPPABLE_EXTENSIONS = [".gif", ".pdf"];

/**
 * Checks whether a file should show the crop modal.
 *
 * @param fileName - The file name or path
 * @param preset - The active upload preset
 * @returns true if the file is a croppable image
 */
export const isCroppableFile = (fileName: string, preset: IUploadPreset): boolean => {
    if (!preset.croppable) return false;
    const ext = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
    return !NON_CROPPABLE_EXTENSIONS.includes(ext);
};
