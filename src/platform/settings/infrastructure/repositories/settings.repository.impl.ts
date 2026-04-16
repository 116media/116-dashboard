import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { SettingsMapper } from "@/platform/settings/infrastructure/mappers/settings.mapper";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

export class SettingsRepositoryImpl implements ISettingsRepositoryPort {
    async getProfile(): Promise<Result<IUser>> {
        try {
            const response = await apiClient.api.adminGetOwnProfile();
            return ok(SettingsMapper.profileFromDto(response.data.user));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateAccount(data: IUpdateAccountCredentials): Promise<Result<IUser>> {
        try {
            const response = await apiClient.api.adminUpdateOwnProfile({
                userName: data.userName,
                countryName: data.countryName,
                partialPhoneNumber: data.phonePartial,
                countryIsoCode: data.phoneISOCode,
                countryDialCode: data.phoneDialCode
            });
            return ok(SettingsMapper.profileFromDto(response.data.user));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateAvatar(file: File): Promise<Result<IUser>> {
        try {
            const response = await apiClient.api.adminUpdateAvatar({ avatarFile: file });
            return ok(SettingsMapper.profileFromDto(response.data.user));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async changePassword(data: {
        oldPassword: string;
        newPassword: string;
    }): Promise<Result<IChangePasswordResponse>> {
        try {
            const response = await apiClient.api.adminChangePassword(data);
            return ok(SettingsMapper.changePasswordResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getRoles(): Promise<Result<IRoleWithPermissions[]>> {
        try {
            const response = await apiClient.api.adminGetOwnRoles();
            return ok(response.data.roles.map(SettingsMapper.roleWithPermissionsFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
