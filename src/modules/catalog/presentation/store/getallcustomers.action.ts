import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetAllCustomersAction = () =>
    catalogSlice.actions.clear({ context: ActionType.GetAllCustomers });

/**
 * Async thunk to fetch a paginated list of customers.
 *
 * @description
 * Dispatches `getAllCustomersUseCase` with pagination and filter params.
 * On success, stores the paginated result in `catalog.getAllCustomers.data`.
 * On failure, stores the backend `Failure` in `catalog.getAllCustomers.error`.
 */
export const getAllCustomersAction = createAsyncThunk<
    IPaginatedResult<ICustomerEntity>,
    { pageIndex: number; pageSize: number; search?: string },
    { rejectValue: Failure }
>(ActionType.GetAllCustomers, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllCustomersUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
