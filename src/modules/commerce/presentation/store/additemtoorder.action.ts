import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetAddItemToOrderAction = () =>
    commerceSlice.actions.clear({ context: ActionType.AddItemToOrder });

/**
 * Async thunk to add a content item to an order.
 *
 * @description
 * Dispatches `addItemToOrderUseCase` with content item data.
 * On success, stores the created order item in `commerce.addItemToOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.addItemToOrder.error`.
 */
export const addItemToOrderAction = createAsyncThunk<
    IOrderItemEntity,
    { orderId: string; data: IAddOrderItemCredentials },
    { rejectValue: Failure }
>(ActionType.AddItemToOrder, async (params, { rejectWithValue }) => {
    const result = await container.cradle.addItemToOrderUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
