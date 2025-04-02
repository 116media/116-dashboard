import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type { IUnknownObject } from "@/shared/domain/entities/IUnknownObject";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the settings module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type ISettingsState = {
    profile: IBasicInitialState<IUser>;
    updateAccount: IBasicInitialState<IUser>;
    updateAvatar: IBasicInitialState<IUser>;
    changePassword: IBasicInitialState<IUnknownObject>;
    roles: IBasicInitialState<IRoleWithPermissions[]>;
};

export type SettingsStateKey = keyof ISettingsState;
