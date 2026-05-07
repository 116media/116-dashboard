import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to remove a pricing tier from an order item.
 *
 * @description
 * Dispatches `removeItemTierUseCase` with the order, item, and tier IDs.
 * On success, stores the result in `commerce.removeItemTier.data`.
 * On failure, stores the backend `Failure` in `commerce.removeItemTier.error`.
 */
export const removeItemTierAction = createAsyncThunk<
    ICommerceActionResponse,
    { orderId: string; itemId: string; tierId: string },
    { rejectValue: Failure }
>(ActionType.RemoveItemTier, async (params, { rejectWithValue }) => {
    const result = await container.cradle.removeItemTierUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
