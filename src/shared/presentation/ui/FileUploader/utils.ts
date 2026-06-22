/**
 * Utility functions for the FileUploader component.
 */

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

/**
 * Formats a byte count into a human-readable size string.
 *
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Determines whether a selected File is an image, from its MIME type with an
 * extension fallback.
 *
 * @description
 * Presets that accept both images and PDF cannot decide between an image preview and a
 * document icon from the preset alone, and the local `blob:` preview URL carries no
 * extension for `isImageUrl` to read. Inspecting the actual `File` lets an image render
 * as a preview instead of falling back to the generic file icon.
 *
 * @param file - The selected file
 * @returns true if the file is an image
 */
export const isImageFile = (file: File): boolean => {
    if (file.type) return file.type.startsWith("image/");
    const lower = file.name.toLowerCase();
    return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
};

/**
 * Determines whether a URL points to an image file.
 *
 * @param url - The file URL to check
 * @returns true if the URL is an image
 */
export const isImageUrl = (url: string): boolean => {
    if (typeof url !== "string") return false;

    const lower = url.toLowerCase();
    if (IMAGE_EXTENSIONS.some((ext) => lower.includes(ext))) return true;
    if (lower.endsWith(".pdf") || lower.includes("application/pdf")) return false;
    if (VIDEO_EXTENSIONS.some((ext) => lower.includes(ext))) return false;
    return !lower.startsWith("blob:");
};

const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".avi", ".mkv", ".3gp"];
