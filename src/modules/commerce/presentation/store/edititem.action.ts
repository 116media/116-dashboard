import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IEditItemCredentials } from "@/modules/commerce/presentation/model/IEditItemCredentials";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetEditItemAction = () =>
    commerceSlice.actions.clear({ context: ActionType.EditItem });

/**
 * Async thunk to edit a content item within an order.
 *
 * @description
 * Dispatches `editItemUseCase` with item update data.
 * On success, stores the updated order item in `commerce.editItem.data`.
 * On failure, stores the backend `Failure` in `commerce.editItem.error`.
 */
export const editItemAction = createAsyncThunk<
    IOrderItemEntity,
    { orderId: string; itemId: string; data: IEditItemCredentials },
    { rejectValue: Failure }
>(ActionType.EditItem, async (params, { rejectWithValue }) => {
    const result = await container.cradle.editItemUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
