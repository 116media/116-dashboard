import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetChangePasswordAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsChangePassword });

export const changePasswordAction = createAsyncThunk<
    { isSuccess: boolean },
    { oldPassword: string; newPassword: string },
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsChangePassword, async (credentials, { rejectWithValue }) => {
    try {
        return await container.cradle.changePasswordUseCase.execute(credentials);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

export const resetGetRolesAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsGetRoles });

export const getRolesAction = createAsyncThunk<
    IRoleWithPermissions[],
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsGetRoles, async (_, { rejectWithValue }) => {
    try {
        return await container.cradle.getRolesUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
