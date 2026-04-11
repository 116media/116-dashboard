import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to reject an order payment.
 *
 * @description
 * Dispatches `rejectPaymentUseCase` with order ID and optional notes.
 * On success, stores the result in `commerce.rejectPayment.data`.
 * On failure, stores the backend `Failure` in `commerce.rejectPayment.error`.
 */
export const rejectPaymentAction = createAsyncThunk<
    { isSuccess: boolean },
    { orderId: string; notes?: string | null },
    { rejectValue: Failure }
>(ActionType.RejectPayment, async (params, { rejectWithValue }) => {
    const result = await container.cradle.rejectPaymentUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
