import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new package.
 *
 * @description
 * Sends package data to the backend via `createPackageUseCase`.
 * On success, stores the created package in `catalog.createPackage.data`.
 */
export const createPackageAction = createAsyncThunk<
    IPackageEntity,
    { name: string; description: string; flatPriceUsd: number },
    { rejectValue: Failure }
>(ActionType.CreatePackage, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createPackageUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
