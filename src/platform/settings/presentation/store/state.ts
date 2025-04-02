import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ISettingsState } from "./type";

/**
 * Initial state for the settings Redux slice.
 *
 * @description
 * Defines initial state for profile operations, account updates,
 * avatar uploads, password changes, and roles display.
 */
export const settingsInitialState: ISettingsState = {
    profile: createInitialState<IUser>(),
    updateAccount: createInitialState<IUser>(),
    updateAvatar: createInitialState<IUser>(),
    changePassword: createInitialState(),
    roles: createInitialState<IRoleWithPermissions[]>()
};
