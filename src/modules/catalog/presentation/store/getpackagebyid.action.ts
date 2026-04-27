import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetPackageByIdAction = () =>
    catalogSlice.actions.clear({ context: ActionType.GetPackageById });

/**
 * Async thunk to fetch a single package by ID.
 *
 * @description
 * Dispatches `getPackageByIdUseCase` with the package ID.
 * On success, stores the result in `catalog.getPackageById.data`.
 */
export const getPackageByIdAction = createAsyncThunk<
    IPackageEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetPackageById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getPackageByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
