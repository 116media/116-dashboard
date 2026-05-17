import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetSubmitOrderAction = () =>
    commerceSlice.actions.clear({ context: ActionType.SubmitOrder });

/**
 * Async thunk to submit a draft order for payment.
 *
 * @description
 * Dispatches `submitOrderUseCase` with the order ID.
 * On success, stores the result in `commerce.submitOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.submitOrder.error`.
 */
export const submitOrderAction = createAsyncThunk<
    ICommerceActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.SubmitOrder, async (id, { rejectWithValue }) => {
    const result = await container.cradle.submitOrderUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
