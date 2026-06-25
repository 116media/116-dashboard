# 07 — File Inventory & Master TODO

All paths under `apps/dashboard/`.

## New files

| # | File | Purpose |
| --- | --- | --- |
| 1 | `src/modules/catalog/presentation/model/IUploadCategoryPosterCredentials.ts` | poster upload credentials |
| 2 | `src/modules/catalog/application/usecases/setexclusivecategory.usecase.ts` | set-exclusive use case (+ interface) |
| 3 | `src/modules/catalog/application/usecases/uploadcategoryposter.usecase.ts` | upload-poster use case (+ interface) |
| 4 | `src/modules/catalog/presentation/store/setexclusivecategory.action.ts` | set-exclusive thunk |
| 5 | `src/modules/catalog/presentation/store/uploadcategoryposter.action.ts` | upload-poster thunk |
| 6 | `src/modules/catalog/presentation/hooks/UseSetExclusiveCategory.ts` | set-exclusive hook |
| 7 | `src/modules/catalog/presentation/hooks/UseUploadCategoryPoster.ts` | upload-poster hook |

## Modified files

| # | File | Change |
| --- | --- | --- |
| 1 | `src/modules/catalog/domain/entities/ICategoryEntity.ts` | add `isExclusive`, `posterUrl` |
| 2 | `src/modules/catalog/infrastructure/mappers/catalog.mapper.ts` | map both fields in `categoryFromDto` |
| 3 | `src/modules/catalog/presentation/model/ICreateCategoryCredentials.ts` | add `isExclusive`, optional `poster` |
| 4 | `src/modules/catalog/presentation/model/IUpdateCategoryCredentials.ts` | add `isExclusive`, optional `poster` |
| 5 | `src/modules/catalog/application/repositories/catalog.repository.port.ts` | add `setExclusiveCategory`, `uploadCategoryPoster` |
| 6 | `src/modules/catalog/infrastructure/repositories/catalog.repository.impl.ts` | implement both; make create/update multipart |
| 7 | `src/modules/catalog/infrastructure/dependencies/catalog.dependencies.ts` | register 2 use cases (+ cradle types) |
| 8 | `src/modules/catalog/presentation/store/constants.ts` | 2 new `ActionType`s |
| 9 | `src/modules/catalog/presentation/store/type.ts` | 2 new state keys |
| 10 | `src/modules/catalog/presentation/store/state.ts` | 2 new initial states |
| 11 | `src/modules/catalog/presentation/store/index.ts` | 6 `addCase` + purge union |
| 12 | `src/modules/catalog/presentation/components/forms/CategoryForm/index.tsx` | exclusive toggle (video-only) + poster uploader |
| 13 | `src/modules/catalog/presentation/components/ui/CategoryActionModal/index.tsx` | handle `setExclusive` action |
| 14 | `src/modules/catalog/presentation/constants/catalog.categories.config.ts` | `setExclusive` config entry |
| 15 | `src/modules/catalog/presentation/constants/catalog.categories.dropdown.ts` | `"setExclusive"` union member |
| 16 | `src/modules/catalog/presentation/components/tables/CategoriesTable/columns.tsx` | exclusive tag column + conditional dropdown item |
| 17 | `src/modules/catalog/presentation/containers/CategoriesListContainer/index.tsx` | wire set-exclusive + poster hooks/modal |
| 18 | `src/modules/catalog/presentation/utils/validators/catalog.categories.validator.ts` | `poster` validator |
| 19 | `src/modules/catalog/presentation/utils/notification/catalog.categories.notification.ts` | `setExclusiveSuccess`, `uploadPosterSuccess` |
| 20 | `src/shared/infrastructure/api/generated/116.api.ts` | regenerated (`yarn api:generate`) |

## Master TODO (suggested order)

### Phase 1 — Contracts & client
- [ ] Run `yarn api:generate` against the updated backend; commit the regenerated client ([06](06-api-and-rules.md))
- [ ] Add `isExclusive` + `posterUrl` to `ICategoryEntity` and map them ([01](01-domain-and-models.md))
- [ ] Add `isExclusive` + optional `poster` to create/update credential models; add `IUploadCategoryPosterCredentials` ([01](01-domain-and-models.md))

### Phase 2 — Application & infrastructure
- [ ] Add `setExclusiveCategory` + `uploadCategoryPoster` to the repository port ([02](02-repository-and-usecases.md))
- [ ] Create both use cases (+ interfaces) ([02](02-repository-and-usecases.md))
- [ ] Implement both in the repository impl; switch create/update to multipart ([02](02-repository-and-usecases.md))
- [ ] Register the use cases in DI + cradle types ([02](02-repository-and-usecases.md))

### Phase 3 — Store
- [ ] Add action types, state keys, initial states ([03](03-store-redux.md))
- [ ] Create both thunks ([03](03-store-redux.md))
- [ ] Wire 6 `addCase` entries + purge union ([03](03-store-redux.md))

### Phase 4 — Presentation
- [ ] Create `UseSetExclusiveCategory` + `UseUploadCategoryPoster` hooks ([04](04-presentation.md))
- [ ] Add optional poster uploader to `CategoryForm` with **default 1:1 aspect ratio** (create + edit), preview `posterUrl` ([04](04-presentation.md))
- [ ] Add `isExclusive` switch to `CategoryForm` (create + edit), **default false**, video-only ([04](04-presentation.md))
- [ ] Prefill current `isExclusive` + poster preview on edit ([04](04-presentation.md))
- [ ] Add `setExclusive` action config + union member ([04](04-presentation.md), [05](05-validation-notifications-constants.md))
- [ ] Add exclusive tag column (+ optional poster thumbnail) + conditional dropdown item to the table ([04](04-presentation.md))
- [ ] Wire everything in `CategoriesListContainer` ([04](04-presentation.md))

### Phase 5 — Validation, notifications, rules
- [ ] Add `poster` validator (reuse shared image rule; confirm mime/size) ([05](05-validation-notifications-constants.md))
- [ ] Add `setExclusiveSuccess` + `uploadPosterSuccess` notifications ([05](05-validation-notifications-constants.md))
- [ ] Enforce video-only + active-only visibility; `reload()` after set (mutex); SuperAdmin gating ([06](06-api-and-rules.md))

### Cross-cutting conventions (apply to every file)
- [ ] JSDoc on every exported interface, function, hook, component, constant
- [ ] French UI labels; theme tokens in styling (no hardcoded colors)
- [ ] `Result` ok/err + shared `Failure` → notification error path
- [ ] Type-check + lint clean (`yarn` build / biome)

## Totals

| Type | Count |
| --- | --- |
| New files | 7 |
| Modified files | 20 (incl. regenerated client) |
| **Total** | **~27 files** |

## Resolve before/while building (from the README open questions)

- [ ] Decide the **unset-exclusive** UX (edit with `isExclusive=false` vs new backend endpoint)
- [ ] Confirm poster **mime types / max size** (and whether a "remove poster" action is needed)
