/**
 * Form model for creating new lyrics.
 *
 * @interface ICreateLyricsCredentials
 * @property {string} songTitle - Title of the song (required)
 * @property {string} artistName - Name of the artist (required)
 * @property {string} lyricsText - Full lyrics text content (required)
 * @property {string} language - Language code (required)
 * @property {string} [videoId] - Optional linked video UUID
 * @property {string} [articleId] - Optional linked article UUID
 */
export interface ICreateLyricsCredentials {
    songTitle: string;
    artistName: string;
    lyricsText: string;
    language: string;
    videoId?: string;
    articleId?: string;
}
