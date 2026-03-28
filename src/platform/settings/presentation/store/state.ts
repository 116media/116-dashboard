import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ISettingsState } from "./type";

export const settingsInitialState: ISettingsState = {
    profile: createInitialState<IUser>(),
    updateAccount: createInitialState<IUser>(),
    updateAvatar: createInitialState<IUser>(),
    changePassword: createInitialState(),
    roles: createInitialState<IRoleWithPermissions[]>()
};
