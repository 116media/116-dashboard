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
 * Determines whether a URL points to an image file.
 *
 * @param url - The file URL to check
 * @returns true if the URL is an image
 */
export const isImageUrl = (url: string): boolean => {
    const lower = url.toLowerCase();
    if (IMAGE_EXTENSIONS.some((ext) => lower.includes(ext))) return true;
    if (lower.endsWith(".pdf") || lower.includes("application/pdf")) return false;
    if (VIDEO_EXTENSIONS.some((ext) => lower.includes(ext))) return false;
    return !lower.startsWith("blob:");
};

const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".avi", ".mkv", ".3gp"];
