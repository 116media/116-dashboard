/**
 * Full CRUD permission entity mapped from PermissionDto.
 *
 * @interface IPermissionEntity
 *
 * @description
 * Represents a permission in the access control system.
 * A permission is uniquely identified by its resource+action compound key
 * (e.g. "users.create", "articles.delete").
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} resource - Resource name (max 15 chars, e.g. "users", "articles")
 * @property {string} action - Action name (max 15 chars, e.g. "create", "read", "delete")
 * @property {string} description - Permission description (max 300 chars)
 * @property {boolean} isActive - Whether the permission is currently active
 * @property {boolean} isDeleted - Whether the permission has been soft-deleted
 * @property {string | null} deletedAt - ISO 8601 deletion timestamp
 * @property {string | null} createdAt - ISO 8601 creation timestamp
 * @property {string | null} updatedAt - ISO 8601 last update timestamp
 * @property {string | null} createdBy - Creator identifier
 * @property {string | null} updatedBy - Last updater identifier
 */
export interface IPermissionEntity {
    id: string;
    resource: string;
    action: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
