/**
 * Redux action type constants for the lookup module.
 */
export const ActionType = {
    GetContentTypes: "lookup/getContentTypes",
    CreateContentType: "lookup/createContentType",
    UpdateContentType: "lookup/updateContentType",
    ActivateContentType: "lookup/activateContentType",
    DeactivateContentType: "lookup/deactivateContentType",
    GetPricingTiers: "lookup/getPricingTiers",
    CreatePricingTier: "lookup/createPricingTier",
    UpdatePricingTier: "lookup/updatePricingTier",
    ActivatePricingTier: "lookup/activatePricingTier",
    DeactivatePricingTier: "lookup/deactivatePricingTier",
    GetPromotionLevels: "lookup/getPromotionLevels",
    CreatePromotionLevel: "lookup/createPromotionLevel",
    UpdatePromotionLevel: "lookup/updatePromotionLevel",
    ActivatePromotionLevel: "lookup/activatePromotionLevel",
    DeactivatePromotionLevel: "lookup/deactivatePromotionLevel",
    GetTags: "lookup/getTags",
    CreateTag: "lookup/createTag"
} as const;

/**
 * Redux slice name for the lookup module.
 */
export const SliceName = {
    Lookup: "lookup"
} as const;
