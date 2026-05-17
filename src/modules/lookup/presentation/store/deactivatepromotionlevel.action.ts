import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeactivatePromotionLevelAction = () =>
    lookupSlice.actions.clear({ context: ActionType.DeactivatePromotionLevel });

/**
 * Async thunk to deactivate an active promotion level.
 *
 * @description
 * Sets the promotion level's `isActive` flag to `false` via
 * `deactivatePromotionLevelUseCase`. Returns 409 if already inactive.
 */
export const deactivatePromotionLevelAction = createAsyncThunk<
    IPromotionLevelEntity,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivatePromotionLevel, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivatePromotionLevelUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
