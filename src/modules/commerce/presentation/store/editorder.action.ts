import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IEditOrderCredentials } from "@/modules/commerce/presentation/model/IEditOrderCredentials";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetEditOrderAction = () =>
    commerceSlice.actions.clear({ context: ActionType.EditOrder });

/**
 * Async thunk to edit a draft order.
 *
 * @description
 * Dispatches `editOrderUseCase` with the order ID and update data.
 * On success, stores the updated order summary in `commerce.editOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.editOrder.error`.
 */
export const editOrderAction = createAsyncThunk<
    IOrderSummaryEntity,
    { id: string; data: IEditOrderCredentials },
    { rejectValue: Failure }
>(ActionType.EditOrder, async (params, { rejectWithValue }) => {
    const result = await container.cradle.editOrderUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
