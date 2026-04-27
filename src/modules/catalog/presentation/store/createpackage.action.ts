import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetCreatePackageAction = () =>
    catalogSlice.actions.clear({ context: ActionType.CreatePackage });

/**
 * Async thunk to create a new package.
 *
 * @description
 * Sends package data to the backend via `createPackageUseCase`.
 * On success, stores the created package in `catalog.createPackage.data`.
 */
export const createPackageAction = createAsyncThunk<
    IPackageEntity,
    { name: string; description: string },
    { rejectValue: Failure }
>(ActionType.CreatePackage, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createPackageUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
