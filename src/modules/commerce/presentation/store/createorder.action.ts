import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new content order.
 *
 * @description
 * Dispatches `createOrderUseCase` with customer and optional package data.
 * On success, stores the created order summary in `commerce.createOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.createOrder.error`.
 */
export const createOrderAction = createAsyncThunk<
    IOrderSummaryEntity,
    { customerId: string; packageId?: string | null },
    { rejectValue: Failure }
>(ActionType.CreateOrder, async (params, { rejectWithValue }) => {
    const result = await container.cradle.createOrderUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
