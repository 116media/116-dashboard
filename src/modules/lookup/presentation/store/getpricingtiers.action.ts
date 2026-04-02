import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch all pricing tiers.
 *
 * @description
 * Dispatches `getAllPricingTiersUseCase` to retrieve the full list
 * of pricing tiers. On success, stores the result in
 * `lookup.getPricingTiers.data`.
 */
export const getPricingTiersAction = createAsyncThunk<
    IPricingTierEntity[],
    void,
    { rejectValue: Failure }
>(ActionType.GetPricingTiers, async (_, { rejectWithValue }) => {
    const result = await container.cradle.getAllPricingTiersUseCase.execute();

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
