import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to remove a slot from a package.
 *
 * @description
 * Removes the specified slot via `removePackageSlotUseCase`.
 * On success, stores `{ isSuccess: true }` in `catalog.removePackageSlot.data`.
 */
export const removePackageSlotAction = createAsyncThunk<
    { isSuccess: boolean },
    { packageId: string; slotId: string },
    { rejectValue: Failure }
>(ActionType.RemovePackageSlot, async (params, { rejectWithValue }) => {
    const result = await container.cradle.removePackageSlotUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
