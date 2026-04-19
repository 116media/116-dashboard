import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IRoleActionResponse } from "@/modules/roles/domain/entities/IRoleActionResponse";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { ICreateRoleCredentials } from "@/modules/roles/presentation/model/ICreateRoleCredentials";
import type { IRolesQueryParams } from "@/modules/roles/presentation/model/IRolesQueryParams";
import type { IUpdateRoleCredentials } from "@/modules/roles/presentation/model/IUpdateRoleCredentials";
import type { Result } from "@/shared/domain/results/result";

/**
 * Repository port (interface) for role CRUD operations.
 *
 * @description
 * Defines the contract for role data access. All methods return
 * `Result<T>` — errors are represented as typed `Failure` values.
 */
export interface IRolesRepositoryPort {
    /**
     * Fetches a paginated list of roles with optional search and status filters.
     *
     * @param {IRolesQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IRolePaginatedResult>>} `ok(IRolePaginatedResult)` on success, `err(Failure)` on failure
     */
    getAll(params: IRolesQueryParams): Promise<Result<IRolePaginatedResult>>;

    /**
     * Fetches a single role by ID, including its assigned permissions.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    getById(id: string): Promise<Result<IRoleWithPermissions>>;

    /**
     * Creates a new role.
     *
     * @param {ICreateRoleCredentials} data - Role name and description
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    create(data: ICreateRoleCredentials): Promise<Result<IRoleEntity>>;

    /**
     * Updates an existing role's name and/or description.
     *
     * @param {string} id - Role UUID
     * @param {IUpdateRoleCredentials} data - Fields to update
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    update(id: string, data: IUpdateRoleCredentials): Promise<Result<IRoleEntity>>;

    /**
     * Activates an inactive role.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    activate(id: string): Promise<Result<IRoleEntity>>;

    /**
     * Deactivates an active role.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    deactivate(id: string): Promise<Result<IRoleEntity>>;

    /**
     * Soft deletes a role (marks as deleted, preserves data).
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    softDelete(id: string): Promise<Result<IRoleEntity>>;

    /**
     * Permanently deletes a role and its associations.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleActionResponse>>} `ok(IRoleActionResponse)` on success, `err(Failure)` on failure
     */
    hardDelete(id: string): Promise<Result<IRoleActionResponse>>;

    /**
     * Restores a soft-deleted role.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    restore(id: string): Promise<Result<IRoleEntity>>;

    /**
     * Assigns a single permission to a role.
     *
     * @param {string} roleId - Role UUID
     * @param {string} permissionId - Permission UUID
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    assignPermission(roleId: string, permissionId: string): Promise<Result<IRoleWithPermissions>>;

    /**
     * Removes a single permission from a role.
     *
     * @param {string} roleId - Role UUID
     * @param {string} permissionId - Permission UUID
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    removePermission(roleId: string, permissionId: string): Promise<Result<IRoleWithPermissions>>;

    /**
     * Replaces all permissions on a role with the given set.
     *
     * @param {string} roleId - Role UUID
     * @param {string[]} permissionIds - Array of permission UUIDs
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    bulkUpdatePermissions(
        roleId: string,
        permissionIds: string[]
    ): Promise<Result<IRoleWithPermissions>>;
}
