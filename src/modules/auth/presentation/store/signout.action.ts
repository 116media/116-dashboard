import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetSignOutAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthSignOut });

export const signOutAction = createAsyncThunk<ISignOutResponse, void, { rejectValue: Failure }>(
    ActionType.AuthSignOut,
    async (_, { rejectWithValue }) => {
        const result = await container.cradle.signOutUseCase.execute();
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
