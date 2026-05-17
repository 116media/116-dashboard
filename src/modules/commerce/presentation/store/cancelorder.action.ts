import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetCancelOrderAction = () =>
    commerceSlice.actions.clear({ context: ActionType.CancelOrder });

/**
 * Async thunk to cancel an order.
 *
 * @description
 * Dispatches `cancelOrderUseCase` with the order ID.
 * On success, stores the result in `commerce.cancelOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.cancelOrder.error`.
 */
export const cancelOrderAction = createAsyncThunk<
    ICommerceActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.CancelOrder, async (id, { rejectWithValue }) => {
    const result = await container.cradle.cancelOrderUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
