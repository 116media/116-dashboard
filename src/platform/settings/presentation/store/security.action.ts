import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetChangePasswordAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsChangePassword });

export const resetGetRolesAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsGetRoles });

/**
 * Async thunk to change the user's password.
 *
 * @description
 * Validates the current password and updates it to the new one
 * via `changePasswordUseCase`.
 */
export const changePasswordAction = createAsyncThunk<
    IChangePasswordResponse,
    { oldPassword: string; newPassword: string },
    { rejectValue: Failure }
>(ActionType.SettingsChangePassword, async (credentials, { rejectWithValue }) => {
    const result = await container.cradle.changePasswordUseCase.execute(credentials);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});

/**
 * Async thunk to fetch the current user's roles with permissions.
 *
 * @description
 * Retrieves the list of roles assigned to the authenticated user,
 * including the permissions associated with each role, via
 * `getRolesUseCase`.
 */
export const getRolesAction = createAsyncThunk<
    IRoleWithPermissions[],
    void,
    { rejectValue: Failure }
>(ActionType.SettingsGetRoles, async (_, { rejectWithValue }) => {
    const result = await container.cradle.getRolesUseCase.execute();

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
