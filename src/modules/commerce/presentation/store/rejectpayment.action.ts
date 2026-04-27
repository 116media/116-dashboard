import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IRejectPaymentCredentials } from "@/modules/commerce/presentation/model/IRejectPaymentCredentials";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetRejectPaymentAction = () =>
    commerceSlice.actions.clear({ context: ActionType.RejectPayment });

/**
 * Async thunk to reject an order payment.
 *
 * @description
 * Dispatches `rejectPaymentUseCase` with order ID and optional notes.
 * On success, stores the result in `commerce.rejectPayment.data`.
 * On failure, stores the backend `Failure` in `commerce.rejectPayment.error`.
 */
export const rejectPaymentAction = createAsyncThunk<
    ICommerceActionResponse,
    { orderId: string; data: IRejectPaymentCredentials },
    { rejectValue: Failure }
>(ActionType.RejectPayment, async (params, { rejectWithValue }) => {
    const result = await container.cradle.rejectPaymentUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
