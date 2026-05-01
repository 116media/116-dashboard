import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a paginated list of orders.
 *
 * @description
 * Dispatches `listOrdersUseCase` with pagination, status, and search params.
 * On success, stores the paginated result in `commerce.listOrders.data`.
 * On failure, stores the backend `Failure` in `commerce.listOrders.error`.
 */
export const listOrdersAction = createAsyncThunk<
    IPaginatedResult<IOrderSummaryEntity>,
    {
        pageIndex: number;
        pageSize: number;
        status?: EnumOrderStatus;
        customerId?: string;
        search?: string;
    },
    { rejectValue: Failure }
>(ActionType.ListOrders, async (params, { rejectWithValue }) => {
    const result = await container.cradle.listOrdersUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
