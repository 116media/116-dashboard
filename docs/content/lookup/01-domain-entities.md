# Phase 1: Domain Entities

Entity interfaces for the 4 lookup resources.

**Module path:** `src/modules/lookup/domain/entities/`

---

## `IContentTypeEntity.ts`

```ts
interface IContentTypeEntity {
    id: string;
    name: string;
    isActive: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `ContentTypeDto` which includes auditable fields.

---

## `IPricingTierEntity.ts`

```ts
interface IPricingTierEntity {
    id: string;
    name: string;
    description?: string | null;
    isActive: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `PricingTierDto` which includes auditable fields.

---

## `IPromotionLevelEntity.ts`

```ts
interface IPromotionLevelEntity {
    id: string;
    name: string;
    durationDays: number;
    priceUsd: number;
    isActive: boolean;
}
```

Maps from backend `PromotionLevelDto`. No audit fields in the DTO.

---

## `ITagEntity.ts`

```ts
interface ITagEntity {
    id: string;
    name: string;
    slug: string;
}
```

Maps from backend `TagDto`. No audit fields, no `isActive`.

---

## TODO

- [ ] Create `IContentTypeEntity.ts` with JSDoc
- [ ] Create `IPricingTierEntity.ts` with JSDoc
- [ ] Create `IPromotionLevelEntity.ts` with JSDoc
- [ ] Create `ITagEntity.ts` with JSDoc
