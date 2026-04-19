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

/**
 * Async thunk to fetch the current user's profile.
 *
 * @description
 * Retrieves the user's profile data (name, email, avatar, etc.)
 * via `getProfileUseCase`.
 */
export const getProfileAction = createAsyncThunk<IUser, void, { rejectValue: Failure }>(
    ActionType.SettingsGetProfile,
    async (_, { rejectWithValue }) => {
        const result = await container.cradle.getProfileUseCase.execute();

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);

/**
 * Async thunk to update the user's account information.
 *
 * @description
 * Updates account fields (username, country, phone) via
 * `updateAccountUseCase`.
 */
export const updateAccountAction = createAsyncThunk<
    IUser,
    IUpdateAccountCredentials,
    { rejectValue: Failure }
>(ActionType.SettingsUpdateAccount, async (credentials, { rejectWithValue }) => {
    const result = await container.cradle.updateAccountUseCase.execute(credentials);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});

/**
 * Async thunk to upload a new profile avatar.
 *
 * @description
 * Uploads an image file as the user's avatar via
 * `updateAvatarUseCase`.
 */
export const updateAvatarAction = createAsyncThunk<IUser, File, { rejectValue: Failure }>(
    ActionType.SettingsUpdateAvatar,
    async (file, { rejectWithValue }) => {
        const result = await container.cradle.updateAvatarUseCase.execute(file);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
