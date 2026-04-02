import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update an existing promotion level.
 *
 * @description
 * Sends the promotion level ID and updated fields to the backend
 * via `updatePromotionLevelUseCase`. Returns 409 if the new name
 * conflicts with an existing promotion level.
 */
export const updatePromotionLevelAction = createAsyncThunk<
    IPromotionLevelEntity,
    { id: string; data: { name: string; durationDays: number; priceUsd: number } },
    { rejectValue: Failure }
>(ActionType.UpdatePromotionLevel, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updatePromotionLevelUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
