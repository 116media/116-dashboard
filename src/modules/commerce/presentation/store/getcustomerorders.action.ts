import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaginationQueryParams } from "@/modules/commerce/presentation/model/IPaginationQueryParams";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch orders for a specific customer.
 *
 * @description
 * Dispatches `getCustomerOrdersUseCase` with customer ID and pagination params.
 * On success, stores the paginated result in `commerce.getCustomerOrders.data`.
 * On failure, stores the backend `Failure` in `commerce.getCustomerOrders.error`.
 */
export const getCustomerOrdersAction = createAsyncThunk<
    IPaginatedResult<IOrderSummaryEntity>,
    { customerId: string; data: IPaginationQueryParams },
    { rejectValue: Failure }
>(ActionType.GetCustomerOrders, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getCustomerOrdersUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
