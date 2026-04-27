import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { activateContentTypeAction } from "./activatecontenttype.action";
import { activatePricingTierAction } from "./activatepricingtier.action";
import { activatePromotionLevelAction } from "./activatepromotionlevel.action";
import { SliceName } from "./constants";
import { createContentTypeAction } from "./createcontenttype.action";
import { createPricingTierAction } from "./createpricingtier.action";
import { createPromotionLevelAction } from "./createpromotionlevel.action";
import { createTagAction } from "./createtag.action";
import { deactivateContentTypeAction } from "./deactivatecontenttype.action";
import { deactivatePricingTierAction } from "./deactivatepricingtier.action";
import { deactivatePromotionLevelAction } from "./deactivatepromotionlevel.action";
import { deleteTagAction } from "./deletetag.action";
import { getContentTypesAction } from "./getcontenttypes.action";
import { getPricingTiersAction } from "./getpricingtiers.action";
import { getPromotionLevelsAction } from "./getpromotionlevels.action";
import { getTagsAction } from "./gettags.action";
import { lookupInitialState } from "./state";
import type { LookupStateKey } from "./type";
import { updateContentTypeAction } from "./updatecontenttype.action";
import { updatePricingTierAction } from "./updatepricingtier.action";
import { updatePromotionLevelAction } from "./updatepromotionlevel.action";
import { updateTagAction } from "./updatetag.action";

/**
 * Redux slice for the lookup module.
 *
 * @description
 * Manages state for 17 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const lookupSlice = createSlice({
    name: SliceName.Lookup,
    initialState: lookupInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<LookupStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get all content types
            .addCase(getContentTypesAction.pending, ActionWrapperPending)
            .addCase(getContentTypesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getContentTypesAction.rejected, ActionWrapperRejected)
            // create content type
            .addCase(createContentTypeAction.pending, ActionWrapperPending)
            .addCase(createContentTypeAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createContentTypeAction.rejected, ActionWrapperRejected)
            // update content type
            .addCase(updateContentTypeAction.pending, ActionWrapperPending)
            .addCase(updateContentTypeAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateContentTypeAction.rejected, ActionWrapperRejected)
            // activate content type
            .addCase(activateContentTypeAction.pending, ActionWrapperPending)
            .addCase(activateContentTypeAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activateContentTypeAction.rejected, ActionWrapperRejected)
            // deactivate content type
            .addCase(deactivateContentTypeAction.pending, ActionWrapperPending)
            .addCase(deactivateContentTypeAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivateContentTypeAction.rejected, ActionWrapperRejected)
            // get all pricing tiers
            .addCase(getPricingTiersAction.pending, ActionWrapperPending)
            .addCase(getPricingTiersAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getPricingTiersAction.rejected, ActionWrapperRejected)
            // create pricing tier
            .addCase(createPricingTierAction.pending, ActionWrapperPending)
            .addCase(createPricingTierAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createPricingTierAction.rejected, ActionWrapperRejected)
            // update pricing tier
            .addCase(updatePricingTierAction.pending, ActionWrapperPending)
            .addCase(updatePricingTierAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updatePricingTierAction.rejected, ActionWrapperRejected)
            // activate pricing tier
            .addCase(activatePricingTierAction.pending, ActionWrapperPending)
            .addCase(activatePricingTierAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activatePricingTierAction.rejected, ActionWrapperRejected)
            // deactivate pricing tier
            .addCase(deactivatePricingTierAction.pending, ActionWrapperPending)
            .addCase(deactivatePricingTierAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivatePricingTierAction.rejected, ActionWrapperRejected)
            // get all promotion levels
            .addCase(getPromotionLevelsAction.pending, ActionWrapperPending)
            .addCase(getPromotionLevelsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getPromotionLevelsAction.rejected, ActionWrapperRejected)
            // create promotion level
            .addCase(createPromotionLevelAction.pending, ActionWrapperPending)
            .addCase(createPromotionLevelAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createPromotionLevelAction.rejected, ActionWrapperRejected)
            // update promotion level
            .addCase(updatePromotionLevelAction.pending, ActionWrapperPending)
            .addCase(updatePromotionLevelAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updatePromotionLevelAction.rejected, ActionWrapperRejected)
            // activate promotion level
            .addCase(activatePromotionLevelAction.pending, ActionWrapperPending)
            .addCase(activatePromotionLevelAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activatePromotionLevelAction.rejected, ActionWrapperRejected)
            // deactivate promotion level
            .addCase(deactivatePromotionLevelAction.pending, ActionWrapperPending)
            .addCase(deactivatePromotionLevelAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivatePromotionLevelAction.rejected, ActionWrapperRejected)
            // get all tags
            .addCase(getTagsAction.pending, ActionWrapperPending)
            .addCase(getTagsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getTagsAction.rejected, ActionWrapperRejected)
            // create tag
            .addCase(createTagAction.pending, ActionWrapperPending)
            .addCase(createTagAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createTagAction.rejected, ActionWrapperRejected)
            // update tag
            .addCase(updateTagAction.pending, ActionWrapperPending)
            .addCase(updateTagAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateTagAction.rejected, ActionWrapperRejected)
            // delete tag
            .addCase(deleteTagAction.pending, ActionWrapperPending)
            .addCase(deleteTagAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteTagAction.rejected, ActionWrapperRejected);
    }
});

export default lookupSlice.reducer;
