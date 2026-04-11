import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to attach a pricing tier to an order item.
 *
 * @description
 * Dispatches `addTierToItemUseCase` with order, item, and pricing tier IDs.
 * On success, stores the created item tier in `commerce.addTierToItem.data`.
 * On failure, stores the backend `Failure` in `commerce.addTierToItem.error`.
 */
export const addTierToItemAction = createAsyncThunk<
    IItemTierEntity,
    { orderId: string; itemId: string; pricingTierId: string },
    { rejectValue: Failure }
>(ActionType.AddTierToItem, async (params, { rejectWithValue }) => {
    const result = await container.cradle.addTierToItemUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
