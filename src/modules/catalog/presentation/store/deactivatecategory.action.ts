import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeactivateCategoryAction = () =>
    catalogSlice.actions.clear({ context: ActionType.DeactivateCategory });

/**
 * Async thunk to deactivate an active category.
 *
 * @description
 * Sets the category's `isActive` flag to `false` via
 * `deactivateCategoryUseCase`. Returns 409 if already inactive.
 */
export const deactivateCategoryAction = createAsyncThunk<
    ICategoryEntity,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivateCategory, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivateCategoryUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
