import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to activate an inactive category.
 *
 * @description
 * Sets the category's `isActive` flag to `true` via
 * `activateCategoryUseCase`. Returns 409 if already active.
 */
export const activateCategoryAction = createAsyncThunk<
    ICategoryEntity,
    string,
    { rejectValue: Failure }
>(ActionType.ActivateCategory, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activateCategoryUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
