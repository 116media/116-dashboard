import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetActivatePromotionLevelAction = () =>
    lookupSlice.actions.clear({ context: ActionType.ActivatePromotionLevel });

/**
 * Async thunk to activate an inactive promotion level.
 *
 * @description
 * Sets the promotion level's `isActive` flag to `true` via
 * `activatePromotionLevelUseCase`. Returns 409 if already active.
 */
export const activatePromotionLevelAction = createAsyncThunk<
    IPromotionLevelEntity,
    string,
    { rejectValue: Failure }
>(ActionType.ActivatePromotionLevel, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activatePromotionLevelUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
