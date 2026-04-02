/**
 * Domain entity for a tag lookup value.
 *
 * @interface ITagEntity
 *
 * @description
 * Represents a tag used to label and categorized content.
 * Mapped from TagDto via the lookup mapper.
 * Does not include audit fields or an active flag.
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Tag display name
 * @property {string} slug - URL-friendly tag identifier
 */
export interface ITagEntity {
    id: string;
    name: string;
    slug: string;
}
