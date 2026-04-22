/**
 * Domain entity for a content author profile.
 *
 * @interface IAuthorEntity
 *
 * @description
 * Shared author representation embedded in article, video,
 * short, and lyrics detail entities. Resolved from the Identity
 * module by the backend handler.
 *
 * @property {string} userName - The author's display name
 * @property {string | null} email - The author's email address
 * @property {string | null} avatarUrl - The author's avatar URL from Cloudinary
 * @property {string | null} role - The author's primary role name
 */
export interface IAuthorEntity {
    userName: string;
    email?: string | null;
    avatarUrl?: string | null;
    role?: string | null;
}
