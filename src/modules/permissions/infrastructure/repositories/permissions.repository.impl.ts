import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IPermissionActionResponse } from "@/modules/permissions/domain/entities/IPermissionActionResponse";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import { PermissionsMapper } from "@/modules/permissions/infrastructure/mappers/permissions.mapper";
import type { ICreatePermissionCredentials } from "@/modules/permissions/presentation/model/ICreatePermissionCredentials";
import type { IPermissionsQueryParams } from "@/modules/permissions/presentation/model/IPermissionsQueryParams";
import type { IUpdatePermissionCredentials } from "@/modules/permissions/presentation/model/IUpdatePermissionCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Permissions repository implementation using REST API.
 *
 * @class PermissionsRepositoryImpl
 * @implements {IPermissionsRepositoryPort}
 *
 * @description
 * Communicates with the backend API, maps DTOs to domain entities,
 * and wraps results in `Result<T>` — errors are converted to typed
 * Failure values via ProblemMapper.
 */
export class PermissionsRepositoryImpl implements IPermissionsRepositoryPort {
    async getAll(params: IPermissionsQueryParams): Promise<Result<IPermissionPaginatedResult>> {
        try {
            const response = await apiClient.api.adminGetAllPermissions({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                search: params.search || undefined,
                isActive: params.isActive,
                isDeleted: params.isDeleted
            });
            return ok(PermissionsMapper.paginatedResultFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getById(id: string): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminGetPermissionById(id);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async create(data: ICreatePermissionCredentials): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminCreatePermission(data);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async update(
        id: string,
        data: IUpdatePermissionCredentials
    ): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminUpdatePermission(id, data);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activate(id: string): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminActivatePermission(id);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivate(id: string): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminDeactivatePermission(id);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async softDelete(id: string): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminSoftDeletePermission(id);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async hardDelete(id: string): Promise<Result<IPermissionActionResponse>> {
        try {
            const response = await apiClient.api.adminHardDeletePermission(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async restore(id: string): Promise<Result<IPermissionEntity>> {
        try {
            const response = await apiClient.api.adminRestorePermission(id);
            return ok(PermissionsMapper.permissionFromDto(response.data.permission));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
