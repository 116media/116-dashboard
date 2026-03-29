import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetGetProfileAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsGetProfile });

export const resetUpdateAccountAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsUpdateAccount });

export const resetUpdateAvatarAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsUpdateAvatar });

export const getProfileAction = createAsyncThunk<IUser, void, { rejectValue: IApiProblemDetails }>(
    ActionType.SettingsGetProfile,
    async (_, { rejectWithValue }) => {
        try {
            return await container.cradle.getProfileUseCase.execute();
        } catch (error) {
            return rejectWithValue(error as IApiProblemDetails);
        }
    }
);

export const updateAccountAction = createAsyncThunk<
    IUser,
    IUpdateAccountCredentials,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsUpdateAccount, async (credentials, { rejectWithValue }) => {
    try {
        return await container.cradle.updateAccountUseCase.execute(credentials);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

export const updateAvatarAction = createAsyncThunk<
    IUser,
    File,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsUpdateAvatar, async (file, { rejectWithValue }) => {
    try {
        return await container.cradle.updateAvatarUseCase.execute(file);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
