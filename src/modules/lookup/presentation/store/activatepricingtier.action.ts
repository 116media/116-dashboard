import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to activate an inactive pricing tier.
 *
 * @description
 * Sets the pricing tier's `isActive` flag to `true` via
 * `activatePricingTierUseCase`. Returns 409 if already active.
 */
export const activatePricingTierAction = createAsyncThunk<
    IPricingTierEntity,
    string,
    { rejectValue: Failure }
>(ActionType.ActivatePricingTier, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activatePricingTierUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
