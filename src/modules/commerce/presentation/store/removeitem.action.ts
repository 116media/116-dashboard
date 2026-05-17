import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetRemoveItemAction = () =>
    commerceSlice.actions.clear({ context: ActionType.RemoveItem });

/**
 * Async thunk to remove a content item from an order.
 *
 * @description
 * Dispatches `removeItemUseCase` with the order and item IDs.
 * On success, stores the result in `commerce.removeItem.data`.
 * On failure, stores the backend `Failure` in `commerce.removeItem.error`.
 */
export const removeItemAction = createAsyncThunk<
    ICommerceActionResponse,
    { orderId: string; itemId: string },
    { rejectValue: Failure }
>(ActionType.RemoveItem, async (params, { rejectWithValue }) => {
    const result = await container.cradle.removeItemUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
