import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new customer.
 *
 * @description
 * Sends customer data to the backend via `createCustomerUseCase`.
 * On success, stores the created customer in `catalog.createCustomer.data`.
 */
export const createCustomerAction = createAsyncThunk<
    ICustomerEntity,
    { fullName: string; email: string; phone?: string; company?: string; notes?: string },
    { rejectValue: Failure }
>(ActionType.CreateCustomer, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createCustomerUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
