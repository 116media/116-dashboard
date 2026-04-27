import {
    createInitialState,
    createInitialStateList
} from "@/shared/presentation/store/action.wrapper";
import type { ILookupState } from "./type";

/**
 * Initial state for the lookup Redux slice.
 *
 * @description
 * Defines initial state for all lookup-related operations.
 * List operations use `createInitialStateList` to initialize
 * data as `[]` instead of `{}`, preventing "not a function"
 * errors when Ant Design Table calls `.some()` on the data.
 */
export const lookupInitialState: ILookupState = {
    getContentTypes: createInitialStateList(),
    createContentType: createInitialState(),
    updateContentType: createInitialState(),
    activateContentType: createInitialState(),
    deactivateContentType: createInitialState(),
    getPricingTiers: createInitialStateList(),
    createPricingTier: createInitialState(),
    updatePricingTier: createInitialState(),
    activatePricingTier: createInitialState(),
    deactivatePricingTier: createInitialState(),
    getPromotionLevels: createInitialStateList(),
    createPromotionLevel: createInitialState(),
    updatePromotionLevel: createInitialState(),
    activatePromotionLevel: createInitialState(),
    deactivatePromotionLevel: createInitialState(),
    getTags: createInitialStateList(),
    createTag: createInitialState(),
    updateTag: createInitialState(),
    deleteTag: createInitialState()
};
