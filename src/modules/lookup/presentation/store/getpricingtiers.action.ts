import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetPricingTiersAction = () =>
    lookupSlice.actions.clear({ context: ActionType.GetPricingTiers });

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
    string | undefined,
    { rejectValue: Failure }
>(ActionType.GetPricingTiers, async (search, { rejectWithValue }) => {
    const result = await container.cradle.getAllPricingTiersUseCase.execute(search);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
