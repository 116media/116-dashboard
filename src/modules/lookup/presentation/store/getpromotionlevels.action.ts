import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetPromotionLevelsAction = () =>
    lookupSlice.actions.clear({ context: ActionType.GetPromotionLevels });

/**
 * Async thunk to fetch all promotion levels.
 *
 * @description
 * Dispatches `getAllPromotionLevelsUseCase` to retrieve the full list
 * of promotion levels. On success, stores the result in
 * `lookup.getPromotionLevels.data`.
 */
export const getPromotionLevelsAction = createAsyncThunk<
    IPromotionLevelEntity[],
    string | undefined,
    { rejectValue: Failure }
>(ActionType.GetPromotionLevels, async (search, { rejectWithValue }) => {
    const result = await container.cradle.getAllPromotionLevelsUseCase.execute(search);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
