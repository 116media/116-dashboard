import { createContainer, InjectionMode } from "awilix";
import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ForgotPasswordUseCase } from "@/modules/auth/application/usecases/forgotpassword.usecase";
import type { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import type { ResendOtpUseCase } from "@/modules/auth/application/usecases/resendotp.usecase";
import type { ResetPasswordUseCase } from "@/modules/auth/application/usecases/resetpassword.usecase";
import type { SignOutUseCase } from "@/modules/auth/application/usecases/signout.usecase";
import type { SignOutAllUseCase } from "@/modules/auth/application/usecases/signoutall.usecase";
import type { VerifyOtpUseCase } from "@/modules/auth/application/usecases/verifyotp.usecase";
import { registerAuthDependencies } from "@/modules/auth/infrastructure/dependencies/auth.dependencies";
import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { ActivatePermissionUseCase } from "@/modules/permissions/application/usecases/activatepermission.usecase";
import type { CreatePermissionUseCase } from "@/modules/permissions/application/usecases/createpermission.usecase";
import type { DeactivatePermissionUseCase } from "@/modules/permissions/application/usecases/deactivatepermission.usecase";
import type { GetAllPermissionsUseCase } from "@/modules/permissions/application/usecases/getallpermissions.usecase";
import type { GetPermissionByIdUseCase } from "@/modules/permissions/application/usecases/getpermissionbyid.usecase";
import type { HardDeletePermissionUseCase } from "@/modules/permissions/application/usecases/harddeletepermission.usecase";
import type { RestorePermissionUseCase } from "@/modules/permissions/application/usecases/restorepermission.usecase";
import type { SoftDeletePermissionUseCase } from "@/modules/permissions/application/usecases/softdeletepermission.usecase";
import type { UpdatePermissionUseCase } from "@/modules/permissions/application/usecases/updatepermission.usecase";
import { registerPermissionsDependencies } from "@/modules/permissions/infrastructure/dependencies/permissions.dependencies";
import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { ActivateRoleUseCase } from "@/modules/roles/application/usecases/activaterole.usecase";
import type { AssignPermissionUseCase } from "@/modules/roles/application/usecases/assignpermission.usecase";
import type { BulkUpdatePermissionsUseCase } from "@/modules/roles/application/usecases/bulkupdatepermissions.usecase";
import type { CreateRoleUseCase } from "@/modules/roles/application/usecases/createrole.usecase";
import type { DeactivateRoleUseCase } from "@/modules/roles/application/usecases/deactivaterole.usecase";
import type { GetAllRolesUseCase } from "@/modules/roles/application/usecases/getallroles.usecase";
import type { GetRoleByIdUseCase } from "@/modules/roles/application/usecases/getrolebyid.usecase";
import type { HardDeleteRoleUseCase } from "@/modules/roles/application/usecases/harddeleterole.usecase";
import type { RemovePermissionUseCase } from "@/modules/roles/application/usecases/removepermission.usecase";
import type { RestoreRoleUseCase } from "@/modules/roles/application/usecases/restorerole.usecase";
import type { SoftDeleteRoleUseCase } from "@/modules/roles/application/usecases/softdeleterole.usecase";
import type { UpdateRoleUseCase } from "@/modules/roles/application/usecases/updaterole.usecase";
import { registerRolesDependencies } from "@/modules/roles/infrastructure/dependencies/roles.dependencies";
import type { IDeviceStorageDataSource } from "@/platform/session/application/data-sources/device.storage.datasource.port";
import type { IDeviceRepositoryPort } from "@/platform/session/application/repositories/device.repository.port";
import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { GetSessionsUseCase } from "@/platform/session/application/usecases/getsessions.usecase";
import type { InitializeDeviceUseCase } from "@/platform/session/application/usecases/initialize.device.usecase";
import type { RefreshTokenUseCase } from "@/platform/session/application/usecases/refresh-token.usecase";
import type { RevokeSessionUseCase } from "@/platform/session/application/usecases/revokesession.usecase";
import { registerSessionDependencies } from "@/platform/session/infrastructure/dependencies/session.dependencies";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { ChangePasswordUseCase } from "@/platform/settings/application/usecases/changepassword.usecase";
import type { GetProfileUseCase } from "@/platform/settings/application/usecases/getprofile.usecase";
import type { GetRolesUseCase } from "@/platform/settings/application/usecases/getroles.usecase";
import type { UpdateAccountUseCase } from "@/platform/settings/application/usecases/updateaccount.usecase";
import type { UpdateAvatarUseCase } from "@/platform/settings/application/usecases/updateavatar.usecase";
import { registerSettingsDependencies } from "@/platform/settings/infrastructure/dependencies/settings.dependencies";

/**
 * Cradle type defining all dependencies available in the DI container.
 *
 * @interface Cradle
 *
 * @description
 * Maps registration names to their resolved types for full type-safe
 * access via `container.cradle`. Each property corresponds to a
 * registration in a per-module dependency file.
 */
export interface Cradle {
    // Data sources
    deviceStorageDataSource: IDeviceStorageDataSource;

    // Repositories
    authRepository: IAuthRepositoryPort;
    sessionRepository: SessionRepositoryPort;
    settingsRepository: ISettingsRepositoryPort;
    deviceRepository: IDeviceRepositoryPort;
    roleRepository: IRolesRepositoryPort;

    // Auth use cases
    loginUseCase: LoginUseCase;
    forgotPasswordUseCase: ForgotPasswordUseCase;
    verifyOtpUseCase: VerifyOtpUseCase;
    resendOtpUseCase: ResendOtpUseCase;
    resetPasswordUseCase: ResetPasswordUseCase;
    signOutUseCase: SignOutUseCase;
    signOutAllUseCase: SignOutAllUseCase;

    // Session use cases
    refreshTokenUseCase: RefreshTokenUseCase;
    getSessionsUseCase: GetSessionsUseCase;
    revokeSessionUseCase: RevokeSessionUseCase;
    initializeDeviceUseCase: InitializeDeviceUseCase;

    // Settings use cases
    getProfileUseCase: GetProfileUseCase;
    updateAccountUseCase: UpdateAccountUseCase;
    updateAvatarUseCase: UpdateAvatarUseCase;
    changePasswordUseCase: ChangePasswordUseCase;
    getRolesUseCase: GetRolesUseCase;

    // Roles use cases
    activateRoleUseCase: ActivateRoleUseCase;
    assignPermissionUseCase: AssignPermissionUseCase;
    bulkUpdatePermissionsUseCase: BulkUpdatePermissionsUseCase;
    createRoleUseCase: CreateRoleUseCase;
    deactivateRoleUseCase: DeactivateRoleUseCase;
    getAllRolesUseCase: GetAllRolesUseCase;
    getRoleByIdUseCase: GetRoleByIdUseCase;
    hardDeleteRoleUseCase: HardDeleteRoleUseCase;
    removePermissionUseCase: RemovePermissionUseCase;
    restoreRoleUseCase: RestoreRoleUseCase;
    softDeleteRoleUseCase: SoftDeleteRoleUseCase;
    updateRoleUseCase: UpdateRoleUseCase;

    // Permissions repository
    permissionsRepository: IPermissionsRepositoryPort;

    // Permissions use cases
    getAllPermissionsUseCase: GetAllPermissionsUseCase;
    getPermissionByIdUseCase: GetPermissionByIdUseCase;
    createPermissionUseCase: CreatePermissionUseCase;
    updatePermissionUseCase: UpdatePermissionUseCase;
    activatePermissionUseCase: ActivatePermissionUseCase;
    deactivatePermissionUseCase: DeactivatePermissionUseCase;
    softDeletePermissionUseCase: SoftDeletePermissionUseCase;
    hardDeletePermissionUseCase: HardDeletePermissionUseCase;
    restorePermissionUseCase: RestorePermissionUseCase;
}

/**
 * Awilix DI container — the composition root for the dashboard.
 *
 * @description
 * Creates a single container with PROXY injection mode and strict lifetime
 * checks. Each feature module registers its own dependencies via a
 * dedicated registration function, mirroring the mobile app's get_it pattern.
 */
const container = createContainer<Cradle>({
    injectionMode: InjectionMode.PROXY,
    strict: true
});

registerSessionDependencies(container);
registerAuthDependencies(container);
registerSettingsDependencies(container);
registerRolesDependencies(container);
registerPermissionsDependencies(container);

export default container;
