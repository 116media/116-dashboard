import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a single customer by ID.
 *
 * @description
 * Dispatches `getCustomerByIdUseCase` with the customer ID.
 * On success, stores the result in `catalog.getCustomerById.data`.
 */
export const getCustomerByIdAction = createAsyncThunk<
    ICustomerEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetCustomerById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getCustomerByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
