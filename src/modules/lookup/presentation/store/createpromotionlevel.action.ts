import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new promotion level.
 *
 * @description
 * Sends the promotion level name, duration, and price to the
 * backend via `createPromotionLevelUseCase`. Returns 409 if the
 * promotion level name already exists.
 */
export const createPromotionLevelAction = createAsyncThunk<
    IPromotionLevelEntity,
    { name: string; durationDays: number; priceUsd: number },
    { rejectValue: Failure }
>(ActionType.CreatePromotionLevel, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createPromotionLevelUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
