import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IRoleActionResponse } from "@/modules/roles/domain/entities/IRoleActionResponse";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import { RolesMapper } from "@/modules/roles/infrastructure/mappers/roles.mapper";
import type { ICreateRoleCredentials } from "@/modules/roles/presentation/model/ICreateRoleCredentials";
import type { IRolesQueryParams } from "@/modules/roles/presentation/model/IRolesQueryParams";
import type { IUpdateRoleCredentials } from "@/modules/roles/presentation/model/IUpdateRoleCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Roles repository implementation using REST API.
 *
 * @class RolesRepositoryImpl
 * @implements {IRolesRepositoryPort}
 *
 * @description
 * Communicates with the backend API, maps DTOs to domain entities,
 * and wraps results in `Result<T>` — errors are converted to typed
 * Failure values via ProblemMapper.
 */
export class RolesRepositoryImpl implements IRolesRepositoryPort {
    async getAll(params: IRolesQueryParams): Promise<Result<IRolePaginatedResult>> {
        try {
            const response = await apiClient.api.adminGetAllRoles({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                search: params.search || undefined,
                isActive: params.isActive,
                isDeleted: params.isDeleted
            });
            return ok(RolesMapper.paginatedResultFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getById(id: string): Promise<Result<IRoleWithPermissions>> {
        try {
            const response = await apiClient.api.adminGetRoleById(id);
            return ok(RolesMapper.roleWithPermissionsFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async create(data: ICreateRoleCredentials): Promise<Result<IRoleEntity>> {
        try {
            const response = await apiClient.api.adminCreateRole(data);
            return ok(RolesMapper.roleFromDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async update(id: string, data: IUpdateRoleCredentials): Promise<Result<IRoleEntity>> {
        try {
            const response = await apiClient.api.adminUpdateRole(id, data);
            return ok(RolesMapper.roleFromDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activate(id: string): Promise<Result<IRoleEntity>> {
        try {
            const response = await apiClient.api.adminActivateRole(id);
            return ok(RolesMapper.roleFromDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivate(id: string): Promise<Result<IRoleEntity>> {
        try {
            const response = await apiClient.api.adminDeactivateRole(id);
            return ok(RolesMapper.roleFromDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async softDelete(id: string): Promise<Result<IRoleEntity>> {
        try {
            const response = await apiClient.api.adminSoftDeleteRole(id);
            return ok(RolesMapper.roleFromDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async hardDelete(id: string): Promise<Result<IRoleActionResponse>> {
        try {
            const response = await apiClient.api.adminHardDeleteRole(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async restore(id: string): Promise<Result<IRoleEntity>> {
        try {
            const response = await apiClient.api.adminRestoreRole(id);
            return ok(RolesMapper.roleFromDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async assignPermission(
        roleId: string,
        permissionId: string
    ): Promise<Result<IRoleWithPermissions>> {
        try {
            const response = await apiClient.api.adminAssignPermissionToRole(roleId, {
                permissionId
            });
            return ok(RolesMapper.roleWithPermissionsFromRoleDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async removePermission(
        roleId: string,
        permissionId: string
    ): Promise<Result<IRoleWithPermissions>> {
        try {
            const response = await apiClient.api.adminRemovePermissionFromRole(
                roleId,
                permissionId
            );
            return ok(RolesMapper.roleWithPermissionsFromRoleDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async bulkUpdatePermissions(
        roleId: string,
        permissionIds: string[]
    ): Promise<Result<IRoleWithPermissions>> {
        try {
            const response = await apiClient.api.adminBulkUpdateRolePermissions(roleId, {
                permissionIds
            });
            return ok(RolesMapper.roleWithPermissionsFromRoleDto(response.data.role));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
