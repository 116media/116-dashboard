import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignOutUseCase } from "@/modules/auth/application/usecases/signout.usecase";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const authRepository = new AuthRepositoryImpl();
const signOutUseCase = new SignOutUseCase(authRepository);

export const resetSignOutAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthSignOut });

export const signOutAction = createAsyncThunk<
    ISignOutResponse,
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthSignOut, async (_, { rejectWithValue }) => {
    try {
        return await signOutUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
