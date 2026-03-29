import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetSignOutAllAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthSignOutAll });

export const signOutAllAction = createAsyncThunk<
    ISignOutAllResponse,
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthSignOutAll, async (_, { rejectWithValue }) => {
    try {
        return await container.cradle.signOutAllUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
