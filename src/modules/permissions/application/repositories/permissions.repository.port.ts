import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IPermissionActionResponse } from "@/modules/permissions/domain/entities/IPermissionActionResponse";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import type { ICreatePermissionCredentials } from "@/modules/permissions/presentation/model/ICreatePermissionCredentials";
import type { IPermissionsQueryParams } from "@/modules/permissions/presentation/model/IPermissionsQueryParams";
import type { IUpdatePermissionCredentials } from "@/modules/permissions/presentation/model/IUpdatePermissionCredentials";
import type { Result } from "@/shared/domain/results/result";

/**
 * Repository port (interface) for permission CRUD operations.
 *
 * @description
 * Defines the contract for permission data access. All methods
 * return `Result<T>` — errors are represented as typed `Failure` values.
 */
export interface IPermissionsRepositoryPort {
    /**
     * Fetches a paginated list of permissions.
     *
     * @param {IPermissionsQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IPermissionPaginatedResult>>} `ok(IPermissionPaginatedResult)` on success, `err(Failure)` on failure
     */
    getAll(params: IPermissionsQueryParams): Promise<Result<IPermissionPaginatedResult>>;

    /**
     * Fetches a single permission by ID.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    getById(id: string): Promise<Result<IPermissionEntity>>;

    /**
     * Creates a new permission.
     *
     * @param {ICreatePermissionCredentials} data - Resource, action, and description
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    create(data: ICreatePermissionCredentials): Promise<Result<IPermissionEntity>>;

    /**
     * Updates an existing permission.
     *
     * @param {string} id - Permission UUID
     * @param {IUpdatePermissionCredentials} data - Fields to update
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    update(id: string, data: IUpdatePermissionCredentials): Promise<Result<IPermissionEntity>>;

    /**
     * Activates an inactive permission.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    activate(id: string): Promise<Result<IPermissionEntity>>;

    /**
     * Deactivates an active permission.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    deactivate(id: string): Promise<Result<IPermissionEntity>>;

    /**
     * Soft deletes a permission.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    softDelete(id: string): Promise<Result<IPermissionEntity>>;

    /**
     * Permanently deletes a permission.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionActionResponse>>} `ok(IPermissionActionResponse)` on success, `err(Failure)` on failure
     */
    hardDelete(id: string): Promise<Result<IPermissionActionResponse>>;

    /**
     * Restores a soft-deleted permission.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    restore(id: string): Promise<Result<IPermissionEntity>>;
}
