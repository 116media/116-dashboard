/**
 * Domain entity for a content type lookup value.
 *
 * @interface IContentTypeEntity
 *
 * @description
 * Represents a content type used to classify content items.
 * Mapped from ContentTypeDto via the lookup mapper.
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Content type name
 * @property {boolean} isActive - Whether the content type is currently active
 * @property {string | null} createdAt - ISO 8601 creation timestamp
 * @property {string | null} updatedAt - ISO 8601 last update timestamp
 * @property {string | null} createdBy - Creator identifier
 * @property {string | null} updatedBy - Last updater identifier
 */
export interface IContentTypeEntity {
    id: string;
    name: string;
    isActive: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
