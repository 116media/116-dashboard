import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to deactivate an active pricing tier.
 *
 * @description
 * Sets the pricing tier's `isActive` flag to `false` via
 * `deactivatePricingTierUseCase`. Returns 409 if already inactive.
 */
export const deactivatePricingTierAction = createAsyncThunk<
    IPricingTierEntity,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivatePricingTier, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivatePricingTierUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
