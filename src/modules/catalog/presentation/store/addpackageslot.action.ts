import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetAddPackageSlotAction = () =>
    catalogSlice.actions.clear({ context: ActionType.AddPackageSlot });

/**
 * Async thunk to add a slot to a package.
 *
 * @description
 * Sends slot data to the backend via `addPackageSlotUseCase`.
 * On success, stores the created slot in `catalog.addPackageSlot.data`.
 */
export const addPackageSlotAction = createAsyncThunk<
    IPackageSlotEntity,
    { packageId: string; data: { categoryId: string; isRequired: boolean; quantity: number } },
    { rejectValue: Failure }
>(ActionType.AddPackageSlot, async (params, { rejectWithValue }) => {
    const result = await container.cradle.addPackageSlotUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
