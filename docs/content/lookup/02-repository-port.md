# Phase 2: Repository Port

Single repository port for all 4 lookup resources.

**File:** `src/modules/lookup/application/repositories/lookup.repository.port.ts`

---

## Interface

```ts
interface ILookupRepositoryPort {
    // Content Types (5 methods)
    getAllContentTypes(): Promise<Result<IContentTypeEntity[]>>;
    createContentType(data: ICreateContentTypeCredentials): Promise<Result<IContentTypeEntity>>;
    updateContentType(id: string, data: IUpdateContentTypeCredentials): Promise<Result<IContentTypeEntity>>;
    activateContentType(id: string): Promise<Result<IContentTypeEntity>>;
    deactivateContentType(id: string): Promise<Result<IContentTypeEntity>>;

    // Pricing Tiers (5 methods)
    getAllPricingTiers(): Promise<Result<IPricingTierEntity[]>>;
    createPricingTier(data: ICreatePricingTierCredentials): Promise<Result<IPricingTierEntity>>;
    updatePricingTier(id: string, data: IUpdatePricingTierCredentials): Promise<Result<IPricingTierEntity>>;
    activatePricingTier(id: string): Promise<Result<IPricingTierEntity>>;
    deactivatePricingTier(id: string): Promise<Result<IPricingTierEntity>>;

    // Promotion Levels (5 methods)
    getAllPromotionLevels(): Promise<Result<IPromotionLevelEntity[]>>;
    createPromotionLevel(data: ICreatePromotionLevelCredentials): Promise<Result<IPromotionLevelEntity>>;
    updatePromotionLevel(id: string, data: IUpdatePromotionLevelCredentials): Promise<Result<IPromotionLevelEntity>>;
    activatePromotionLevel(id: string): Promise<Result<IPromotionLevelEntity>>;
    deactivatePromotionLevel(id: string): Promise<Result<IPromotionLevelEntity>>;

    // Tags (2 methods)
    getAllTags(): Promise<Result<ITagEntity[]>>;
    createTag(data: ICreateTagCredentials): Promise<Result<ITagEntity>>;
}
```

## Design Decision

One shared port instead of 4 separate ports because:
- All 4 resources are simple reference data with identical patterns
- They share the same repository implementation class
- They belong to the same backend sub-module
- It avoids 4 tiny port files with 2-5 methods each

---

## TODO

- [ ] Create `lookup.repository.port.ts` with JSDoc on the interface and every method
