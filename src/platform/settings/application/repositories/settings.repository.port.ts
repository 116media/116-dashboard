import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import type { Result } from "@/shared/domain/results/result";

export interface ISettingsRepositoryPort {
    /**
     * Fetches the current authenticated user's profile.
     *
     * @returns `ok(IUser)` on success, `err(Failure)` on failure
     */
    getProfile(): Promise<Result<IUser>>;

    /**
     * Updates the user's account information (name, country, phone).
     *
     * @param data - Updated account fields
     * @returns `ok(IUser)` with the updated profile on success, `err(Failure)` on failure
     */
    updateAccount(data: IUpdateAccountCredentials): Promise<Result<IUser>>;

    /**
     * Uploads a new avatar image for the user.
     *
     * @param file - The image file to upload
     * @returns `ok(IUser)` with the updated profile on success, `err(Failure)` on failure
     */
    updateAvatar(file: File): Promise<Result<IUser>>;

    /**
     * Changes the user's password.
     *
     * @param data - Current and new password
     * @returns `ok(IChangePasswordResponse)` on success, `err(Failure)` on failure
     */
    changePassword(data: {
        oldPassword: string;
        newPassword: string;
    }): Promise<Result<IChangePasswordResponse>>;

    /**
     * Fetches the roles and permissions assigned to the current user.
     *
     * @returns `ok(IRoleWithPermissions[])` on success, `err(Failure)` on failure
     */
    getRoles(): Promise<Result<IRoleWithPermissions[]>>;
}
