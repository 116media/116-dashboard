import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import type {
    AdminGetAllPermissionsResponse,
    PermissionDto
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Maps permission DTOs from the generated API to domain entities.
 *
 * @description
 * All DTO-to-entity conversion is centralized here. Presentation
 * and domain layers never see raw DTOs.
 */
export const PermissionsMapper = {
    /**
     * Maps a single PermissionDto to an IPermissionEntity domain entity.
     *
     * @param {PermissionDto} dto - The raw DTO from the API response
     * @returns {IPermissionEntity} The mapped domain entity
     */
    permissionFromDto(dto: PermissionDto): IPermissionEntity {
        return {
            id: dto.id,
            resource: dto.resource,
            action: dto.action,
            description: dto.description,
            isActive: dto.isActive,
            isDeleted: dto.isDeleted,
            deletedAt: dto.deletedAt,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps a list of PermissionDto to IPermissionEntity domain entities.
     *
     * @param {PermissionDto[]} dtos - The raw DTOs from the API response
     * @returns {IPermissionEntity[]} The mapped domain entities
     */
    permissionListFromDto(dtos: PermissionDto[]): IPermissionEntity[] {
        return dtos.map(PermissionsMapper.permissionFromDto);
    },

    /**
     * Maps the paginated permissions response to a domain result.
     *
     * @param {AdminGetAllPermissionsResponse} response - The API response
     * @returns {IPermissionPaginatedResult} The mapped paginated result
     */
    paginatedResultFromDto(response: AdminGetAllPermissionsResponse): IPermissionPaginatedResult {
        return {
            items: PermissionsMapper.permissionListFromDto(response.permissions.items),
            pageIndex: response.permissions.pageIndex,
            pageSize: response.permissions.pageSize,
            count: response.permissions.count
        };
    }
} as const;
