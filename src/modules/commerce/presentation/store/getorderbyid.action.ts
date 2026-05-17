import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetOrderByIdAction = () =>
    commerceSlice.actions.clear({ context: ActionType.GetOrderById });

/**
 * Async thunk to fetch a single order by ID.
 *
 * @description
 * Dispatches `getOrderByIdUseCase` with the order ID.
 * On success, stores the order detail in `commerce.getOrderById.data`.
 * On failure, stores the backend `Failure` in `commerce.getOrderById.error`.
 */
export const getOrderByIdAction = createAsyncThunk<
    IOrderDetailEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetOrderById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getOrderByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
