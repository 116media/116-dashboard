import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to cancel an order.
 *
 * @description
 * Dispatches `cancelOrderUseCase` with the order ID.
 * On success, stores the result in `commerce.cancelOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.cancelOrder.error`.
 */
export const cancelOrderAction = createAsyncThunk<
    { isSuccess: boolean },
    string,
    { rejectValue: Failure }
>(ActionType.CancelOrder, async (id, { rejectWithValue }) => {
    const result = await container.cradle.cancelOrderUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
