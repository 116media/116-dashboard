import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetGetProfileAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsGetProfile });

export const resetUpdateAccountAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsUpdateAccount });

export const resetUpdateAvatarAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsUpdateAvatar });

export const getProfileAction = createAsyncThunk<IUser, void, { rejectValue: Failure }>(
    ActionType.SettingsGetProfile,
    async (_, { rejectWithValue }) => {
        const result = await container.cradle.getProfileUseCase.execute();
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);

export const updateAccountAction = createAsyncThunk<
    IUser,
    IUpdateAccountCredentials,
    { rejectValue: Failure }
>(ActionType.SettingsUpdateAccount, async (credentials, { rejectWithValue }) => {
    const result = await container.cradle.updateAccountUseCase.execute(credentials);
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});

export const updateAvatarAction = createAsyncThunk<IUser, File, { rejectValue: Failure }>(
    ActionType.SettingsUpdateAvatar,
    async (file, { rejectWithValue }) => {
        const result = await container.cradle.updateAvatarUseCase.execute(file);
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
