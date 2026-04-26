# Phase 4: Infrastructure

Mapper, repository implementation, and DI registration.

**Path:** `src/modules/lookup/infrastructure/`

---

## Mapper

**File:** `mappers/lookup.mapper.ts`

```ts
export const LookupMapper = {
    contentTypeFromDto(dto: ContentTypeDto): IContentTypeEntity,
    pricingTierFromDto(dto: PricingTierDto): IPricingTierEntity,
    promotionLevelFromDto(dto: PromotionLevelDto): IPromotionLevelEntity,
    tagFromDto(dto: TagDto): ITagEntity,
} as const;
```

Each method maps the generated DTO fields to the domain entity interface. Only include fields that the DTO actually provides.

---

## Repository Implementation

**File:** `repositories/lookup.repository.impl.ts`

Implements `ILookupRepositoryPort`. Each method follows the try/catch pattern:

```ts
async getAllContentTypes(): Promise<Result<IContentTypeEntity[]>> {
    try {
        const response = await apiClient.api.adminGetAllContentTypes();
        return ok(response.data.items.map(LookupMapper.contentTypeFromDto));
    } catch (error) {
        return err(ProblemMapper.toFailure(error));
    }
}
```

### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `getAllContentTypes` | `apiClient.api.adminGetAllContentTypes()` |
| `createContentType` | `apiClient.api.createContentType(data)` |
| `updateContentType` | `apiClient.api.adminUpdateContentType(id, data)` |
| `activateContentType` | `apiClient.api.activateContentType(id)` |
| `deactivateContentType` | `apiClient.api.adminDeactivateContentType(id)` |
| `getAllPricingTiers` | `apiClient.api.adminGetAllPricingTiers()` |
| `createPricingTier` | `apiClient.api.createPricingTier(data)` |
| `updatePricingTier` | `apiClient.api.adminUpdatePricingTier(id, data)` |
| `activatePricingTier` | `apiClient.api.activatePricingTier(id)` |
| `deactivatePricingTier` | `apiClient.api.adminDeactivatePricingTier(id)` |
| `getAllPromotionLevels` | `apiClient.api.adminGetAllPromotionLevels()` |
| `createPromotionLevel` | `apiClient.api.adminCreatePromotionLevel(data)` |
| `updatePromotionLevel` | `apiClient.api.adminUpdatePromotionLevel(id, data)` |
| `activatePromotionLevel` | `apiClient.api.activatePromotionLevel(id)` |
| `deactivatePromotionLevel` | `apiClient.api.adminDeactivatePromotionLevel(id)` |
| `getAllTags` | `apiClient.api.publicGetAllTags()` |
| `createTag` | `apiClient.api.adminCreateTag(data)` |

> **Important:** Verify exact method names against the generated API client before implementing. Some methods may be named differently (e.g., `createContentType` vs `adminCreateContentType`).

---

## DI Registration

**File:** `dependencies/lookup.dependencies.ts`

```ts
export function registerLookupDependencies(container: AwilixContainer): void {
    container.register({
        lookupRepository: asClass(LookupRepositoryImpl).singleton(),

        // Content Types
        getAllContentTypesUseCase: asClass(GetAllContentTypesUseCase).transient(),
        createContentTypeUseCase: asClass(CreateContentTypeUseCase).transient(),
        updateContentTypeUseCase: asClass(UpdateContentTypeUseCase).transient(),
        activateContentTypeUseCase: asClass(ActivateContentTypeUseCase).transient(),
        deactivateContentTypeUseCase: asClass(DeactivateContentTypeUseCase).transient(),

        // Pricing Tiers
        getAllPricingTiersUseCase: asClass(GetAllPricingTiersUseCase).transient(),
        createPricingTierUseCase: asClass(CreatePricingTierUseCase).transient(),
        updatePricingTierUseCase: asClass(UpdatePricingTierUseCase).transient(),
        activatePricingTierUseCase: asClass(ActivatePricingTierUseCase).transient(),
        deactivatePricingTierUseCase: asClass(DeactivatePricingTierUseCase).transient(),

        // Promotion Levels
        getAllPromotionLevelsUseCase: asClass(GetAllPromotionLevelsUseCase).transient(),
        createPromotionLevelUseCase: asClass(CreatePromotionLevelUseCase).transient(),
        updatePromotionLevelUseCase: asClass(UpdatePromotionLevelUseCase).transient(),
        activatePromotionLevelUseCase: asClass(ActivatePromotionLevelUseCase).transient(),
        deactivatePromotionLevelUseCase: asClass(DeactivatePromotionLevelUseCase).transient(),

        // Tags
        getAllTagsUseCase: asClass(GetAllTagsUseCase).transient(),
        createTagUseCase: asClass(CreateTagUseCase).transient(),
    });
}
```

Call `registerLookupDependencies(container)` in `service.locator.ts` and extend the `Cradle` interface with all 18 entries.

---

## TODO

- [ ] Create `lookup.mapper.ts` with JSDoc
- [ ] Create `lookup.repository.impl.ts` with JSDoc
- [ ] Create `lookup.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`
