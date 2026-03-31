import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetResetPasswordAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthResetPassword });

export const resetPasswordAction = createAsyncThunk<
    IResetPasswordResponse,
    IResetPasswordCredentials,
    { rejectValue: Failure }
>(
    ActionType.AuthResetPassword,
    async (credentials: IResetPasswordCredentials, { rejectWithValue }) => {
        const otpCode = AuthStorageService.getOtpCode();
        const result = await container.cradle.resetPasswordUseCase.execute({
            ...credentials,
            code: otpCode as string
        });
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
