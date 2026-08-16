import type { IUser } from "@/modules/auth/domain/entities/IUser";
import { AuthMapper } from "@/modules/auth/infrastructure/mappers/auth.mapper";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type {
    AdminChangePasswordResponse,
    RoleWithPermissionsDto,
    UserResponseDto
} from "@/shared/infrastructure/api/generated/116.api";

export const SettingsMapper = {
    profileFromDto(dto: UserResponseDto): IUser {
        return AuthMapper.userFromDto(dto);
    },

    roleWithPermissionsFromDto(dto: RoleWithPermissionsDto): IRoleWithPermissions {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            isActive: dto.isActive,
            isDeleted: dto.isDeleted,
            permissions: AuthMapper.permissionListFromDto(dto.permissions),
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt
        };
    },

    roleWithPermissionsListFromDto(dtos: RoleWithPermissionsDto[]): IRoleWithPermissions[] {
        return dtos.map(SettingsMapper.roleWithPermissionsFromDto);
    },

    changePasswordResponseFromDto(response: AdminChangePasswordResponse): IChangePasswordResponse {
        return {
            isSuccess: response.isSuccess
        };
    }
} as const;
