/**
 * Domain entity for a lyrics record.
 *
 * @interface ILyricsEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} songTitle - Title of the song
 * @property {string} artistName - Name of the artist
 * @property {string} lyricsText - Full lyrics content
 * @property {string} language - Language code of the lyrics
 * @property {string | null} videoId - Optional linked video UUID
 * @property {string | null} articleId - Optional linked article UUID
 * @property {string | null} metaTitle - SEO meta title
 * @property {string | null} metaDescription - SEO meta description
 * @property {string | null} metaKeywords - SEO meta keywords
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface ILyricsEntity {
    id: string;
    songTitle: string;
    artistName: string;
    lyricsText: string;
    language: string;
    videoId?: string | null;
    articleId?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
