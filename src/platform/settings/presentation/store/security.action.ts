import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangePasswordUseCase } from "@/platform/settings/application/usecases/changepassword.usecase";
import { GetRolesUseCase } from "@/platform/settings/application/usecases/getroles.usecase";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { SettingsRepositoryImpl } from "@/platform/settings/infrastructure/repositories/settings.repository.impl";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const settingsRepository = new SettingsRepositoryImpl();
const changePasswordUseCase = new ChangePasswordUseCase(settingsRepository);
const getRolesUseCase = new GetRolesUseCase(settingsRepository);

export const resetChangePasswordAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsChangePassword });

export const changePasswordAction = createAsyncThunk<
    { isSuccess: boolean },
    { oldPassword: string; newPassword: string },
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsChangePassword, async (credentials, { rejectWithValue }) => {
    try {
        return await changePasswordUseCase.execute(credentials);
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
        return await getRolesUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
