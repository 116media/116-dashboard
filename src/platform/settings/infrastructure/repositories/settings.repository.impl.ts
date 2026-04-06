import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { SettingsMapper } from "@/platform/settings/infrastructure/mappers/settings.mapper";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { apiClient } from "@/shared/infrastructure/api/client";

export class SettingsRepositoryImpl implements ISettingsRepositoryPort {
    async getProfile(): Promise<IUser> {
        const response = await apiClient.api.adminGetOwnProfile();
        return SettingsMapper.profileFromDto(response.data.user);
    }

    async updateAccount(data: IUpdateAccountCredentials): Promise<IUser> {
        const response = await apiClient.api.adminUpdateOwnProfile({
            userName: data.userName,
            countryName: data.countryName,
            partialPhoneNumber: data.phonePartial,
            countryIsoCode: data.phoneISOCode,
            countryDialCode: data.phoneDialCode
        });
        return SettingsMapper.profileFromDto(response.data.user);
    }

    async updateAvatar(file: File): Promise<IUser> {
        const response = await apiClient.api.adminUpdateAvatar({ avatarFile: file });
        return SettingsMapper.profileFromDto(response.data.user);
    }

    async changePassword(data: {
        oldPassword: string;
        newPassword: string;
    }): Promise<IChangePasswordResponse> {
        const response = await apiClient.api.adminChangePassword(data);
        return SettingsMapper.changePasswordResponseFromDto(response.data);
    }

    async getRoles(): Promise<IRoleWithPermissions[]> {
        const response = await apiClient.api.adminGetOwnRoles();
        return response.data.roles.map(SettingsMapper.roleWithPermissionsFromDto);
    }
}
