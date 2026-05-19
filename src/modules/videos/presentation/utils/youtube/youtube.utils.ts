/**
 * YouTube video URL and ID utilities.
 *
 * @description
 * YouTube video IDs are exactly 11 characters and use the base64url
 * alphabet: uppercase letters, lowercase letters, digits, hyphens,
 * and underscores (`[A-Za-z0-9_-]{11}`).
 *
 * Supported URL formats:
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/embed/dQw4w9WgXcQ
 * - https://www.youtube.com/shorts/dQw4w9WgXcQ
 */

const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

const YOUTUBE_URL_HOSTS = ["youtube.com", "www.youtube.com", "youtu.be", "www.youtu.be"];

/**
 * Returns true when the given string is a valid YouTube video URL.
 *
 * @param {string | null | undefined} url - The candidate YouTube URL
 * @returns {boolean} Whether the URL points to a YouTube video
 */
export const isValidYoutubeUrl = (url: string | null | undefined): boolean => {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        if (!YOUTUBE_URL_HOSTS.includes(parsed.hostname)) return false;
        return extractYoutubeId(url) !== null;
    } catch {
        return false;
    }
};

/**
 * Extracts a YouTube video ID from a URL.
 *
 * @param {string | null | undefined} url - A YouTube video URL
 * @returns {string | null} The extracted 11-character video ID, or null if not found
 */
export const extractYoutubeId = (url: string | null | undefined): string | null => {
    if (!url) return null;

    try {
        const parsed = new URL(url);

        // https://youtu.be/<id>
        if (parsed.hostname === "youtu.be" || parsed.hostname === "www.youtu.be") {
            const id = parsed.pathname.slice(1).split("/")[0];
            return YOUTUBE_ID_REGEX.test(id) ? id : null;
        }

        // https://www.youtube.com/watch?v=<id>
        const vParam = parsed.searchParams.get("v");
        if (vParam && YOUTUBE_ID_REGEX.test(vParam)) return vParam;

        // https://www.youtube.com/embed/<id>
        // https://www.youtube.com/shorts/<id>
        const pathMatch = parsed.pathname.match(/\/(?:embed|shorts|v)\/([A-Za-z0-9_-]{11})/);
        if (pathMatch) return pathMatch[1];
    } catch {
        // Not a valid URL
    }

    return null;
};
