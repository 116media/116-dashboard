import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type {
    AdminGetAllRolesResponse,
    AdminGetRoleByIdResponse,
    PermissionDto,
    RoleDto,
    RoleWithPermissionsDto
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Maps role DTOs from the generated API to domain entities.
 *
 * @description
 * All DTO-to-entity conversion is centralized here. Presentation
 * and domain layers never see raw DTOs.
 */
export const RolesMapper = {
    /**
     * Maps a single RoleDto to an IRoleEntity domain entity.
     *
     * @param {RoleDto} dto - The raw DTO from the API response
     * @returns {IRoleEntity} The mapped domain entity
     */
    roleFromDto(dto: RoleDto): IRoleEntity {
        return {
            id: dto.id,
            name: dto.name,
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
     * Maps a list of RoleDto to IRoleEntity domain entities.
     *
     * @param {RoleDto[]} dtos - The raw DTOs from the API response
     * @returns {IRoleEntity[]} The mapped domain entities
     */
    roleListFromDto(dtos: RoleDto[]): IRoleEntity[] {
        return dtos.map(RolesMapper.roleFromDto);
    },

    /**
     * Maps a PermissionDto to an IPermissionEntity.
     *
     * @param {PermissionDto} dto - The raw permission DTO
     * @returns {IPermissionEntity} The mapped permission entity
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
     * @param {PermissionDto[]} dtos - The raw permission DTOs
     * @returns {IPermissionEntity[]} The mapped permission entities
     */
    permissionListFromDto(dtos: PermissionDto[]): IPermissionEntity[] {
        return dtos.map(RolesMapper.permissionFromDto);
    },

    /**
     * Maps the paginated roles response to a domain result.
     *
     * @param {AdminGetAllRolesResponse} response - The API response
     * @returns {IRolePaginatedResult} The mapped paginated result
     */
    paginatedResultFromDto(response: AdminGetAllRolesResponse): IRolePaginatedResult {
        return {
            items: RolesMapper.roleListFromDto(response.roles.items),
            pageIndex: response.roles.pageIndex,
            pageSize: response.roles.pageSize,
            count: response.roles.count
        };
    },

    /**
     * Maps the role-by-ID response (role + permissions) to a domain entity.
     *
     * @param {AdminGetRoleByIdResponse} response - The API response with role and permissions
     * @returns {IRoleWithPermissions} The mapped role with permissions
     */
    roleWithPermissionsFromDto(response: AdminGetRoleByIdResponse): IRoleWithPermissions {
        return {
            ...RolesMapper.roleFromDto(response.role),
            permissions: RolesMapper.permissionListFromDto(response.permissions)
        };
    },

    /**
     * Maps a RoleWithPermissionsDto (from association endpoints) to a domain entity.
     *
     * @param {RoleWithPermissionsDto} dto - The DTO with embedded permissions
     * @returns {IRoleWithPermissions} The mapped role with permissions
     */
    roleWithPermissionsFromRoleDto(dto: RoleWithPermissionsDto): IRoleWithPermissions {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            isActive: dto.isActive,
            isDeleted: dto.isDeleted,
            deletedAt: dto.deletedAt,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            permissions: RolesMapper.permissionListFromDto(dto.permissions)
        };
    }
} as const;
