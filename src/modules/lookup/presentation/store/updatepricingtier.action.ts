import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update an existing pricing tier.
 *
 * @description
 * Sends the pricing tier ID and updated fields to the backend
 * via `updatePricingTierUseCase`. Returns 409 if the new name
 * conflicts with an existing pricing tier.
 */
export const updatePricingTierAction = createAsyncThunk<
    IPricingTierEntity,
    { id: string; data: { name: string; description: string } },
    { rejectValue: Failure }
>(ActionType.UpdatePricingTier, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updatePricingTierUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
