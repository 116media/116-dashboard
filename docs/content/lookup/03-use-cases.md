# Phase 3: Use Cases

One use case file per endpoint. All implement `IResultUseCase<TReq, TRes>`.

**Path:** `src/modules/lookup/application/usecases/`

---

## Content Types (5 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getallcontenttypes.usecase.ts` | `void` | `IContentTypeEntity[]` |
| `createcontenttype.usecase.ts` | `ICreateContentTypeCredentials` | `IContentTypeEntity` |
| `updatecontenttype.usecase.ts` | `{ id: string; data: IUpdateContentTypeCredentials }` | `IContentTypeEntity` |
| `activatecontenttype.usecase.ts` | `string` (id) | `IContentTypeEntity` |
| `deactivatecontenttype.usecase.ts` | `string` (id) | `IContentTypeEntity` |

## Pricing Tiers (5 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getallpricingtiers.usecase.ts` | `void` | `IPricingTierEntity[]` |
| `createpricingtier.usecase.ts` | `ICreatePricingTierCredentials` | `IPricingTierEntity` |
| `updatepricingtier.usecase.ts` | `{ id: string; data: IUpdatePricingTierCredentials }` | `IPricingTierEntity` |
| `activatepricingtier.usecase.ts` | `string` (id) | `IPricingTierEntity` |
| `deactivatepricingtier.usecase.ts` | `string` (id) | `IPricingTierEntity` |

## Promotion Levels (5 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getallpromotionlevels.usecase.ts` | `void` | `IPromotionLevelEntity[]` |
| `createpromotionlevel.usecase.ts` | `ICreatePromotionLevelCredentials` | `IPromotionLevelEntity` |
| `updatepromotionlevel.usecase.ts` | `{ id: string; data: IUpdatePromotionLevelCredentials }` | `IPromotionLevelEntity` |
| `activatepromotionlevel.usecase.ts` | `string` (id) | `IPromotionLevelEntity` |
| `deactivatepromotionlevel.usecase.ts` | `string` (id) | `IPromotionLevelEntity` |

## Tags (2 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getalltags.usecase.ts` | `void` | `ITagEntity[]` |
| `createtag.usecase.ts` | `ICreateTagCredentials` | `ITagEntity` |

## Pattern

Each use case follows the same structure as the roles module:

```ts
export class CreateContentTypeUseCase implements IResultUseCase<ICreateContentTypeCredentials, IContentTypeEntity> {
    private readonly lookupRepository: ILookupRepositoryPort;

    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    async execute(data: ICreateContentTypeCredentials): Promise<Result<IContentTypeEntity>> {
        return this.lookupRepository.createContentType(data);
    }
}
```

---

## TODO

- [ ] Create all 17 use case files with JSDoc
