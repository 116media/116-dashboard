# Phase 5: Redux Store

Single `lookup` slice with 17 action thunks covering all 4 resources.

**Path:** `src/modules/lookup/presentation/store/`

---

## Constants

**File:** `constants.ts`

```ts
export const ActionType = {
    // Content Types
    GetContentTypes: "lookup/getContentTypes",
    CreateContentType: "lookup/createContentType",
    UpdateContentType: "lookup/updateContentType",
    ActivateContentType: "lookup/activateContentType",
    DeactivateContentType: "lookup/deactivateContentType",

    // Pricing Tiers
    GetPricingTiers: "lookup/getPricingTiers",
    CreatePricingTier: "lookup/createPricingTier",
    UpdatePricingTier: "lookup/updatePricingTier",
    ActivatePricingTier: "lookup/activatePricingTier",
    DeactivatePricingTier: "lookup/deactivatePricingTier",

    // Promotion Levels
    GetPromotionLevels: "lookup/getPromotionLevels",
    CreatePromotionLevel: "lookup/createPromotionLevel",
    UpdatePromotionLevel: "lookup/updatePromotionLevel",
    ActivatePromotionLevel: "lookup/activatePromotionLevel",
    DeactivatePromotionLevel: "lookup/deactivatePromotionLevel",

    // Tags
    GetTags: "lookup/getTags",
    CreateTag: "lookup/createTag",
} as const;

export const SliceName = { Lookup: "lookup" } as const;
```

> **Critical:** The suffix after `"lookup/"` must exactly match the state key. `ActionWrapperPending/Fulfilled/Rejected` extracts it via `action.type.split("/")[1]`.

---

## State Type

**File:** `type.ts`

```ts
type ILookupState = {
    // Content Types
    getContentTypes: IBasicInitialState<IContentTypeEntity[]>;
    createContentType: IBasicInitialState<IContentTypeEntity>;
    updateContentType: IBasicInitialState<IContentTypeEntity>;
    activateContentType: IBasicInitialState<IContentTypeEntity>;
    deactivateContentType: IBasicInitialState<IContentTypeEntity>;

    // Pricing Tiers
    getPricingTiers: IBasicInitialState<IPricingTierEntity[]>;
    createPricingTier: IBasicInitialState<IPricingTierEntity>;
    updatePricingTier: IBasicInitialState<IPricingTierEntity>;
    activatePricingTier: IBasicInitialState<IPricingTierEntity>;
    deactivatePricingTier: IBasicInitialState<IPricingTierEntity>;

    // Promotion Levels
    getPromotionLevels: IBasicInitialState<IPromotionLevelEntity[]>;
    createPromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    updatePromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    activatePromotionLevel: IBasicInitialState<IPromotionLevelEntity>;
    deactivatePromotionLevel: IBasicInitialState<IPromotionLevelEntity>;

    // Tags
    getTags: IBasicInitialState<ITagEntity[]>;
    createTag: IBasicInitialState<ITagEntity>;
};

type LookupStateKey = keyof ILookupState;
```

---

## Initial State

**File:** `state.ts`

Uses `createInitialState<T>()` for each key.

---

## Slice

**File:** `index.ts`

Uses `createSlice` with `clear` + `purge` reducers and `addCase` for all 17 actions × 3 lifecycle events (pending/fulfilled/rejected) = 51 `addCase` entries.

---

## Action Files (17 files)

One `createAsyncThunk` per endpoint:

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `getcontenttypes.action.ts` | `void` | `IContentTypeEntity[]` |
| `createcontenttype.action.ts` | `ICreateContentTypeCredentials` | `IContentTypeEntity` |
| `updatecontenttype.action.ts` | `{ id: string; data: IUpdateContentTypeCredentials }` | `IContentTypeEntity` |
| `activatecontenttype.action.ts` | `string` | `IContentTypeEntity` |
| `deactivatecontenttype.action.ts` | `string` | `IContentTypeEntity` |
| `getpricingtiers.action.ts` | `void` | `IPricingTierEntity[]` |
| `createpricingtier.action.ts` | `ICreatePricingTierCredentials` | `IPricingTierEntity` |
| `updatepricingtier.action.ts` | `{ id: string; data: IUpdatePricingTierCredentials }` | `IPricingTierEntity` |
| `activatepricingtier.action.ts` | `string` | `IPricingTierEntity` |
| `deactivatepricingtier.action.ts` | `string` | `IPricingTierEntity` |
| `getpromotionlevels.action.ts` | `void` | `IPromotionLevelEntity[]` |
| `createpromotionlevel.action.ts` | `ICreatePromotionLevelCredentials` | `IPromotionLevelEntity` |
| `updatepromotionlevel.action.ts` | `{ id: string; data: IUpdatePromotionLevelCredentials }` | `IPromotionLevelEntity` |
| `activatepromotionlevel.action.ts` | `string` | `IPromotionLevelEntity` |
| `deactivatepromotionlevel.action.ts` | `string` | `IPromotionLevelEntity` |
| `gettags.action.ts` | `void` | `ITagEntity[]` |
| `createtag.action.ts` | `ICreateTagCredentials` | `ITagEntity` |

---

## Integration

- [x] Add `lookup: lookupReducer` to `root.reducer.ts`
- [x] Extend `Cradle` interface in `service.locator.ts`
- [x] Call `registerLookupDependencies(container)` in `service.locator.ts`

---

## TODO

- [x] Create `constants.ts`
- [x] Create `type.ts`
- [x] Create `state.ts`
- [x] Create all 17 action files
- [x] Create `index.ts` (slice)
- [x] Wire into `root.reducer.ts`
- [x] Wire into `service.locator.ts`
- [x] Create `updatetag.action.ts` and `deletetag.action.ts` (added post-spec)
- [x] Add `updateTag` and `deleteTag` to state type and initial state
