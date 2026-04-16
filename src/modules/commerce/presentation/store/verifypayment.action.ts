import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IVerifyPaymentCredentials } from "@/modules/commerce/presentation/model/IVerifyPaymentCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to verify an order payment.
 *
 * @description
 * Dispatches `verifyPaymentUseCase` with order ID and receipt URL.
 * On success, stores the result in `commerce.verifyPayment.data`.
 * On failure, stores the backend `Failure` in `commerce.verifyPayment.error`.
 */
export const verifyPaymentAction = createAsyncThunk<
    ICommerceActionResponse,
    { orderId: string; data: IVerifyPaymentCredentials },
    { rejectValue: Failure }
>(ActionType.VerifyPayment, async (params, { rejectWithValue }) => {
    const result = await container.cradle.verifyPaymentUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
