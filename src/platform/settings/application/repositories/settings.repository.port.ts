import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";

export interface ISettingsRepositoryPort {
    getProfile(): Promise<IUser>;
    updateAccount(data: IUpdateAccountCredentials): Promise<IUser>;
    updateAvatar(file: File): Promise<IUser>;
    changePassword(data: {
        oldPassword: string;
        newPassword: string;
    }): Promise<IChangePasswordResponse>;
    getRoles(): Promise<IRoleWithPermissions[]>;
}
