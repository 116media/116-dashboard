/**
 * Form model for updating an existing lyrics record.
 *
 * @interface IUpdateLyricsCredentials
 * @property {string} songTitle - Title of the song (required)
 * @property {string} artistName - Name of the artist (required)
 * @property {string} lyricsText - Rich text HTML content of the lyrics (required)
 * @property {string} language - ISO 639-1 language code (required)
 * @property {string} [videoId] - Optional linked video UUID
 */
export interface IUpdateLyricsCredentials {
    songTitle: string;
    artistName: string;
    lyricsText: string;
    language: string;
    videoId?: string;
}
