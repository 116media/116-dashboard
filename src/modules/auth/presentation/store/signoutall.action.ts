import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetSignOutAllAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthSignOutAll });

export const signOutAllAction = createAsyncThunk<
    ISignOutAllResponse,
    void,
    { rejectValue: Failure }
>(ActionType.AuthSignOutAll, async (_, { rejectWithValue }) => {
    const result = await container.cradle.signOutAllUseCase.execute();
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
