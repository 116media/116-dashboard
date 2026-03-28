import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignOutAllUseCase } from "@/modules/auth/application/usecases/signoutall.usecase";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const authRepository = new AuthRepositoryImpl();
const signOutAllUseCase = new SignOutAllUseCase(authRepository);

export const resetSignOutAllAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthSignOutAll });

export const signOutAllAction = createAsyncThunk<
    ISignOutAllResponse,
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthSignOutAll, async (_, { rejectWithValue }) => {
    try {
        return await signOutAllUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
