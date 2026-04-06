import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import { GetProfileUseCase } from "@/platform/settings/application/usecases/getprofile.usecase";
import { UpdateAccountUseCase } from "@/platform/settings/application/usecases/updateaccount.usecase";
import { UpdateAvatarUseCase } from "@/platform/settings/application/usecases/updateavatar.usecase";
import { SettingsRepositoryImpl } from "@/platform/settings/infrastructure/repositories/settings.repository.impl";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const settingsRepository = new SettingsRepositoryImpl();
const getProfileUseCase = new GetProfileUseCase(settingsRepository);
const updateAccountUseCase = new UpdateAccountUseCase(settingsRepository);
const updateAvatarUseCase = new UpdateAvatarUseCase(settingsRepository);

export const resetGetProfileAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsGetProfile });

export const getProfileAction = createAsyncThunk<IUser, void, { rejectValue: IApiProblemDetails }>(
    ActionType.SettingsGetProfile,
    async (_, { rejectWithValue }) => {
        try {
            return await getProfileUseCase.execute();
        } catch (error) {
            return rejectWithValue(error as IApiProblemDetails);
        }
    }
);

export const resetUpdateAccountAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsUpdateAccount });

export const updateAccountAction = createAsyncThunk<
    IUser,
    IUpdateAccountCredentials,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsUpdateAccount, async (credentials, { rejectWithValue }) => {
    try {
        return await updateAccountUseCase.execute(credentials);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

export const resetUpdateAvatarAction = () =>
    settingsSlice.actions.clear({ context: ActionType.SettingsUpdateAvatar });

export const updateAvatarAction = createAsyncThunk<
    IUser,
    File,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsUpdateAvatar, async (file, { rejectWithValue }) => {
    try {
        return await updateAvatarUseCase.execute(file);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
