import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetChangePasswordAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsChangePassword });

export const changePasswordAction = createAsyncThunk<
    IChangePasswordResponse,
    { oldPassword: string; newPassword: string },
    { rejectValue: Failure }
>(ActionType.SettingsChangePassword, async (credentials, { rejectWithValue }) => {
    const result = await container.cradle.changePasswordUseCase.execute(credentials);
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});

export const resetGetRolesAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsGetRoles });

export const getRolesAction = createAsyncThunk<
    IRoleWithPermissions[],
    void,
    { rejectValue: Failure }
>(ActionType.SettingsGetRoles, async (_, { rejectWithValue }) => {
    const result = await container.cradle.getRolesUseCase.execute();
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
