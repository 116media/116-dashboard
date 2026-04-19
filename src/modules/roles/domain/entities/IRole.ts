/**
 * Full CRUD role entity mapped from RoleDto.
 *
 * @interface IRoleEntity
 *
 * @description
 * Represents a role in the access control system with all audit
 * and lifecycle fields. Distinct from the auth module's slim `IRole`
 * (which only carries id/name/description for session context).
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Role name (max 20 chars, unique)
 * @property {string} description - Role description (max 300 chars)
 * @property {boolean} isActive - Whether the role is currently active
 * @property {boolean} isDeleted - Whether the role has been soft-deleted
 * @property {string | null} deletedAt - ISO 8601 deletion timestamp
 * @property {string | null} createdAt - ISO 8601 creation timestamp
 * @property {string | null} updatedAt - ISO 8601 last update timestamp
 * @property {string | null} createdBy - Creator identifier
 * @property {string | null} updatedBy - Last updater identifier
 */
export interface IRoleEntity {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
