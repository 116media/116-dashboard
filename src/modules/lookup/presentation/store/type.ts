import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type {
    IBasicInitialState,
    IBasicInitialStateList
} from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the lookup module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type ILookupState = {
    getContentTypes: IBasicInitialStateList<IContentTypeEntity>;
    createContentType: IBasicInitialState<IContentTypeEntity>;
    updateContentType: IBasicInitialState<IContentTypeEntity>;
    activateContentType: IBasicInitialState<IContentTypeEntity>;
    deactivateContentType: IBasicInitialState<IContentTypeEntity>;
    getPricingTiers: IBasicInitialStateList<IPricingTierEntity>;
    createPricingTier: IBasicInitialState<IPricingTierEntity>;
    updatePricingTier: IBasicInitialState<IPricingTierEntity>;
    activatePricingTier: IBasicInitialState<IPricingTierEntity>;
    deactivatePricingTier: IBasicInitialState<IPricingTierEntity>;
    getPromotionLevels: IBasicInitialStateList<IPromotionLevelEntity>;
    createPromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    updatePromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    activatePromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    deactivatePromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    getTags: IBasicInitialStateList<ITagEntity>;
    createTag: IBasicInitialState<ITagEntity>;
};

export type LookupStateKey = keyof ILookupState;
