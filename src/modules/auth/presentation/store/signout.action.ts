import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetSignOutAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthSignOut });

export const signOutAction = createAsyncThunk<
    ISignOutResponse,
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthSignOut, async (_, { rejectWithValue }) => {
    try {
        return await container.cradle.signOutUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
