import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import type { IPaymentsQueryParams } from "@/modules/commerce/presentation/model/IPaymentsQueryParams";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetListPaymentsAction = () =>
    commerceSlice.actions.clear({ context: ActionType.ListPayments });

/**
 * Async thunk to fetch a paginated list of payments.
 *
 * @description
 * Dispatches `listPaymentsUseCase` with pagination, status, method, and search params.
 * On success, stores the paginated result in `commerce.listPayments.data`.
 * On failure, stores the backend `Failure` in `commerce.listPayments.error`.
 */
export const listPaymentsAction = createAsyncThunk<
    IPaginatedResult<IPaymentSummaryEntity>,
    IPaymentsQueryParams,
    { rejectValue: Failure }
>(ActionType.ListPayments, async (params, { rejectWithValue }) => {
    const result = await container.cradle.listPaymentsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
