/**
 * Form model for creating new lyrics.
 *
 * @interface ICreateLyricsCredentials
 * @property {string} songTitle - Title of the song (required)
 * @property {string} artistName - Name of the artist (required)
 * @property {string} lyricsText - Rich text HTML content of the lyrics (required)
 * @property {string} language - ISO 639-1 language code (required)
 * @property {string} [videoId] - Optional linked video UUID
 */
export interface ICreateLyricsCredentials {
    songTitle: string;
    artistName: string;
    lyricsText: string;
    language: string;
    videoId?: string;
}
