# Lookup Module — Documentation

> **UI Label:** This module is displayed as **"Références"** in the dashboard navigation as its own top-level nav group.
>
> **Status:** **Implemented**

Reference data management for the content domain: **content types**, **pricing tiers**, **promotion levels**, and **tags**.

## Overview

The Lookup module manages the foundational lookup tables that everything else in the content domain depends on. These are flat, non-paginated list resources with simple CRUD and activate/deactivate lifecycle (except tags, which have no status).

| Resource | Endpoints | Backend Auth | Fields | Status |
| --- | --- | --- | --- | --- |
| Content Types | 5 (getAll, create, update, activate, deactivate) | Create: AdminOrSuperAdmin, Update: SuperAdminOnly, Activate/Deactivate: AdminOrSuperAdmin | name, isActive | Done |
| Pricing Tiers | 5 (getAll, create, update, activate, deactivate) | All mutations: SuperAdminOnly, Read: AdminOrSuperAdmin | name, description, isActive | Done |
| Promotion Levels | 5 (getAll, create, update, activate, deactivate) | All mutations: SuperAdminOnly, Read: AdminOrSuperAdmin | name, durationDays, priceUsd, isActive | Done |
| Tags | 4 (getAll, create, update, delete) | Create/Update: AdminOrSuperAdmin, Delete: SuperAdminOnly | name, slug | Done |

## What's Implemented

### All Resources
- Server-side search with debounced input via `useDebounce` hook
- `TableToolbar` with `canFilter` / `canSearch` props (tags use `canFilter={false}`)
- `StatusTag` shared component for consistent active/inactive/deleted display
- Dropdown action items extracted to constants (`*.dropdown.ts`)
- Action modal configs extracted to constants (`*.config.ts`)
- `onSuccess` callbacks in create/update hooks for auto-reload

### Content Types, Pricing Tiers, Promotion Levels
- Full CRUD: create, edit (update), activate, deactivate
- Client-side status filtering (all, active, inactive)
- Action confirmation modals via `ActionModal`
- `CreateEditModal` for create and edit forms

### Tags
- Full CRUD: create, edit (update), delete
- No status filter (tags have no active/inactive state)
- `TagActionModal` for delete confirmation
- `TagForm` supports both CREATE and EDIT modes with `initialValues`
- Auto-generated slug from name via `generateSlug` in hook

## Implementation Specs

| Phase | Spec | Description |
| --- | --- | --- |
| 1 | [01-domain-entities.md](./01-domain-entities.md) | Entity interfaces for all 4 resources |
| 2 | [02-repository-port.md](./02-repository-port.md) | `ILookupRepositoryPort` with all methods |
| 3 | [03-use-cases.md](./03-use-cases.md) | One use case per endpoint |
| 4 | [04-infrastructure.md](./04-infrastructure.md) | Mapper, repository implementation, DI registration |
| 5 | [05-redux-store.md](./05-redux-store.md) | Single slice with action thunks |
| 6 | [06-models-validators-notifications.md](./06-models-validators-notifications.md) | Form credentials, validators, notification configs |
| 7 | [07-constants.md](./07-constants.md) | Dropdown, action config, status per resource |
| 8 | [08-hooks.md](./08-hooks.md) | List, actions, create, update hooks |
| 9 | [09-components.md](./09-components.md) | Forms, table columns, action modals |
| 10 | [10-containers-pages.md](./10-containers-pages.md) | List containers and page wrappers |
| 11 | [11-routing-navigation.md](./11-routing-navigation.md) | Paths, nav items, routes |

## Key Differences from Roles/Permissions

1. **No pagination** — API returns flat arrays
2. **No soft/hard delete** — only activate/deactivate (except tags which have hard delete)
3. **Single shared Redux slice** (`lookup`) with namespaced state keys
4. **Tags are different** — no status, have update/delete instead of activate/deactivate
5. **Single repository port** for all 4 resources
6. **Server-side search** — all getAll methods accept optional `search` param

## Architecture

```
src/modules/lookup/
├── application/
│   ├── repositories/
│   │   └── lookup.repository.port.ts       # Single port for all 4 resources
│   └── usecases/
│       ├── getallcontenttypes.usecase.ts
│       ├── createcontenttype.usecase.ts
│       ├── updatecontenttype.usecase.ts
│       ├── activatecontenttype.usecase.ts
│       ├── deactivatecontenttype.usecase.ts
│       ├── getallpricingtiers.usecase.ts
│       ├── createpricingtier.usecase.ts
│       ├── updatepricingtier.usecase.ts
│       ├── activatepricingtier.usecase.ts
│       ├── deactivatepricingtier.usecase.ts
│       ├── getallpromotionlevels.usecase.ts
│       ├── createpromotionlevel.usecase.ts
│       ├── updatepromotionlevel.usecase.ts
│       ├── activatepromotionlevel.usecase.ts
│       ├── deactivatepromotionlevel.usecase.ts
│       ├── getalltags.usecase.ts
│       ├── createtag.usecase.ts
│       ├── updatetag.usecase.ts
│       └── deletetag.usecase.ts
├── domain/entities/
│   ├── IContentTypeEntity.ts
│   ├── IPricingTierEntity.ts
│   ├── IPromotionLevelEntity.ts
│   ├── ITagEntity.ts
│   └── ITagActionResponse.ts
├── infrastructure/
│   ├── dependencies/lookup.dependencies.ts
│   ├── mappers/lookup.mapper.ts
│   └── repositories/lookup.repository.impl.ts
└── presentation/
    ├── components/
    │   ├── forms/
    │   │   ├── ContentTypeForm/
    │   │   ├── PricingTierForm/
    │   │   ├── PromotionLevelForm/
    │   │   └── TagForm/
    │   ├── tables/
    │   │   ├── ContentTypesTable/columns.tsx
    │   │   ├── PricingTiersTable/columns.tsx
    │   │   ├── PromotionLevelsTable/columns.tsx
    │   │   └── TagsTable/columns.tsx
    │   └── ui/
    │       └── TagActionModal/
    ├── constants/
    │   ├── lookup.content-types.config.ts
    │   ├── lookup.content-types.dropdown.ts
    │   ├── lookup.content-types.status.ts
    │   ├── lookup.pricing-tiers.config.ts
    │   ├── lookup.pricing-tiers.dropdown.ts
    │   ├── lookup.pricing-tiers.status.ts
    │   ├── lookup.promotion-levels.config.ts
    │   ├── lookup.promotion-levels.dropdown.ts
    │   ├── lookup.promotion-levels.status.ts
    │   ├── lookup.tags.config.ts
    │   └── lookup.tags.dropdown.ts
    ├── containers/
    │   ├── ContentTypesListContainer/
    │   ├── PricingTiersListContainer/
    │   ├── PromotionLevelsListContainer/
    │   └── TagsListContainer/
    ├── hooks/
    │   ├── UseContentTypesList.ts
    │   ├── UseCreateContentType.ts
    │   ├── UseUpdateContentType.ts
    │   ├── UseContentTypeActions.ts
    │   ├── UsePricingTiersList.ts
    │   ├── UseCreatePricingTier.ts
    │   ├── UseUpdatePricingTier.ts
    │   ├── UsePricingTierActions.ts
    │   ├── UsePromotionLevelsList.ts
    │   ├── UseCreatePromotionLevel.ts
    │   ├── UseUpdatePromotionLevel.ts
    │   ├── UsePromotionLevelActions.ts
    │   ├── UseTagsList.ts
    │   ├── UseCreateTag.ts
    │   ├── UseUpdateTag.ts
    │   └── UseTagActions.ts
    ├── model/
    │   ├── ICreateContentTypeCredentials.ts
    │   ├── ICreatePricingTierCredentials.ts
    │   ├── ICreatePromotionLevelCredentials.ts
    │   ├── ICreateTagCredentials.ts
    │   └── IUpdateTagCredentials.ts
    ├── pages/
    │   └── LookupPage/
    ├── store/
    │   ├── constants.ts
    │   ├── index.ts
    │   ├── state.ts
    │   ├── type.ts
    │   └── *.action.ts (19 action files)
    └── utils/
        ├── notification/
        │   ├── lookup.content-types.notification.ts
        │   ├── lookup.pricing-tiers.notification.ts
        │   ├── lookup.promotion-levels.notification.ts
        │   └── lookup.tags.notification.ts
        └── validators/
            ├── lookup.content-types.validator.ts
            ├── lookup.pricing-tiers.validator.ts
            ├── lookup.promotion-levels.validator.ts
            └── lookup.tags.validator.ts
```

## Routes

> **Note:** The URL prefix uses `/references/` to match the "Références" UI nav group label.

| Path | Tab | Container |
| --- | --- | --- |
| `/references` | defaults to `content-types` | ContentTypesListContainer |
| `/references/content-types` | Types de contenu | ContentTypesListContainer |
| `/references/pricing-tiers` | Niveaux tarifaires | PricingTiersListContainer |
| `/references/promotion-levels` | Promotions | PromotionLevelsListContainer |
| `/references/tags` | Tags | TagsListContainer |

## Navigation

The Références group appears in the SideNav as a Popover with 4 sub-items:
- Types de contenu (`IconAppstoreOutlined`)
- Niveaux tarifaires (`IconDollarOutlined`)
- Promotions (`IconStarOutlined`)
- Tags (`IconTagOutlined`)

Parent icon: `IconGroupOutlined`

## Quick Links

- Backend Lookup module: `apps/backend/src/Modules/Content/Content/Application/Lookup/`
- Generated API methods: `adminGetAllContentTypes`, `adminGetAllPricingTiers`, `adminGetAllPromotionLevels`, `adminGetAllTags`
- Repository port: `src/modules/lookup/application/repositories/lookup.repository.port.ts`
- Redux slice: `src/modules/lookup/presentation/store/index.ts`
- DI registration: `src/modules/lookup/infrastructure/dependencies/lookup.dependencies.ts`
