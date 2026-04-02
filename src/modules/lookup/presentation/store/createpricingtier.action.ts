import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new pricing tier.
 *
 * @description
 * Sends the pricing tier name and optional description to the
 * backend via `createPricingTierUseCase`. Returns 409 if the
 * pricing tier name already exists.
 */
export const createPricingTierAction = createAsyncThunk<
    IPricingTierEntity,
    { name: string; description?: string },
    { rejectValue: Failure }
>(ActionType.CreatePricingTier, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createPricingTierUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
