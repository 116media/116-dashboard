# Phase 8: Hooks

Custom hooks following the 4-hook pattern per resource: List, Actions, Create, Update.

**Path:** `src/modules/lookup/presentation/hooks/`

---

## Content Types (4 hooks)

### `UseContentTypesList.ts`

- Dispatches `getContentTypesAction()` on mount
- Manages `statusFilter` state (`"all" | "active" | "inactive"`)
- Filters the flat array client-side by `isActive`
- Exposes: `items`, `loading`, `error`, `statusFilter`, `onStatusFilterChange`, `reload`

### `UseContentTypeActions.ts`

- Selects `activateContentType` and `deactivateContentType` from store
- `onActivate(id)` → dispatch → `showNotification` → `reload()`
- `onDeactivate(id)` → dispatch → `showNotification` → `reload()`
- Exposes: `loading`, `error`, `onActivate`, `onDeactivate`

### `UseCreateContentType.ts`

- `useForm<ICreateContentTypeCredentials>()`
- `success` state for `FormSuccessResult`
- `onSubmit` → dispatch `createContentTypeAction` → set success
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

### `UseUpdateContentType.ts`

- `useForm<IUpdateContentTypeCredentials>()`
- Pre-populates form when `selectedEntity` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetUpdate`

---

## Pricing Tiers (4 hooks)

Same pattern as content types but with `IPricingTierEntity` types.

### `UsePricingTiersList.ts`
### `UsePricingTierActions.ts`
### `UseCreatePricingTier.ts`
### `UseUpdatePricingTier.ts`

---

## Promotion Levels (4 hooks)

Same pattern as content types but with `IPromotionLevelEntity` types.

### `UsePromotionLevelsList.ts`
### `UsePromotionLevelActions.ts`
### `UseCreatePromotionLevel.ts`
### `UseUpdatePromotionLevel.ts`

---

## Tags (2 hooks)

Tags are simpler — no status filter, no actions, no update.

### `UseTagsList.ts`

- Dispatches `getTagsAction()` on mount
- No status filter (tags have no `isActive`)
- Exposes: `items`, `loading`, `error`, `reload`

### `UseCreateTag.ts`

- `useForm<ICreateTagCredentials>()`
- `success` state
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

---

## Key Differences from Roles Hooks

1. **No pagination** — list hooks dispatch a simple `void` action, not paginated query params
2. **Client-side filtering** — status filter works on the full array, not server-side `isActive`/`isDeleted` query params
3. **No search** — lookup resources are small lists, no search input needed
4. **Tags have no actions hook** — no activate/deactivate

---

## TODO

- [ ] Create 4 content type hooks with JSDoc
- [ ] Create 4 pricing tier hooks with JSDoc
- [ ] Create 4 promotion level hooks with JSDoc
- [ ] Create 2 tag hooks with JSDoc
