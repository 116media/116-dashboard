import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaginationQueryParams } from "@/modules/commerce/presentation/model/IPaginationQueryParams";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch orders awaiting payment.
 *
 * @description
 * Dispatches `listPendingPaymentOrdersUseCase` with pagination params.
 * On success, stores the paginated result in `commerce.listPendingPaymentOrders.data`.
 * On failure, stores the backend `Failure` in `commerce.listPendingPaymentOrders.error`.
 */
export const listPendingPaymentOrdersAction = createAsyncThunk<
    IPaginatedResult<IOrderSummaryEntity>,
    IPaginationQueryParams,
    { rejectValue: Failure }
>(ActionType.ListPendingPaymentOrders, async (params, { rejectWithValue }) => {
    const result = await container.cradle.listPendingPaymentOrdersUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
