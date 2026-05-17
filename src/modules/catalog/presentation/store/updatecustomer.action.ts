import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateCustomerAction = () =>
    catalogSlice.actions.clear({ context: ActionType.UpdateCustomer });

/**
 * Async thunk to update an existing customer.
 *
 * @description
 * Sends updated customer data to the backend via `updateCustomerUseCase`.
 * On success, stores the updated customer in `catalog.updateCustomer.data`.
 */
export const updateCustomerAction = createAsyncThunk<
    ICustomerEntity,
    {
        id: string;
        data: { fullName: string; email: string; phone?: string; company?: string; notes?: string };
    },
    { rejectValue: Failure }
>(ActionType.UpdateCustomer, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateCustomerUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
