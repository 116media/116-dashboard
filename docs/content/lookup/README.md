# Lookup Module — Documentation

> **UI Label:** This module is displayed as **"Références"** in the dashboard navigation as its own top-level nav group.

Reference data management for the content domain: **content types**, **pricing tiers**, **promotion levels**, and **tags**.

## Overview

The Lookup module manages the foundational lookup tables that everything else in the content domain depends on. These are flat, non-paginated list resources with simple CRUD and activate/deactivate lifecycle (except tags, which have no status).

| Resource | Endpoints | Backend Auth | Fields |
| --- | --- | --- | --- |
| Content Types | 5 | Create: AdminOrSuperAdmin, Update: SuperAdminOnly, Activate/Deactivate: AdminOrSuperAdmin | name, isActive |
| Pricing Tiers | 5 | All mutations: SuperAdminOnly, Read: AdminOrSuperAdmin | name, description, isActive |
| Promotion Levels | 5 | All mutations: SuperAdminOnly, Read: AdminOrSuperAdmin | name, durationDays, priceUsd, isActive |
| Tags | 2 | Create: AdminOrSuperAdmin, Read: Anonymous | name, slug |

## Implementation Specs

| Phase | Spec | Description | Files |
| --- | --- | --- | --- |
| 1 | [01-domain-entities.md](./01-domain-entities.md) | Entity interfaces for all 4 resources | 4 |
| 2 | [02-repository-port.md](./02-repository-port.md) | `ILookupRepositoryPort` with 17 methods | 1 |
| 3 | [03-use-cases.md](./03-use-cases.md) | One use case per endpoint | 17 |
| 4 | [04-infrastructure.md](./04-infrastructure.md) | Mapper, repository implementation, DI registration | 3 |
| 5 | [05-redux-store.md](./05-redux-store.md) | Single slice with 17 action thunks | 21 |
| 6 | [06-models-validators-notifications.md](./06-models-validators-notifications.md) | Form credentials, validators, notification configs | 15 |
| 7 | [07-constants.md](./07-constants.md) | Dropdown, action config, status per resource | 10 |
| 8 | [08-hooks.md](./08-hooks.md) | List, actions, create, update hooks | 14 |
| 9 | [09-components.md](./09-components.md) | Forms, table columns, action modals | 11 |
| 10 | [10-containers-pages.md](./10-containers-pages.md) | List containers and page wrappers | 12 |
| 11 | [11-routing-navigation.md](./11-routing-navigation.md) | Paths, nav items, routes, root reducer, service locator | 5 modified |

## Key Differences from Roles/Permissions

1. **No pagination** — API returns flat arrays
2. **No soft/hard delete** — only activate/deactivate
3. **Single shared Redux slice** (`lookup`) with namespaced state keys
4. **Tags are simpler** — no status, no activate/deactivate, no action modal
5. **Single repository port** for all 4 resources

## Routes

> **Note:** The URL prefix uses `/references/` to match the "Références" UI nav group label.

| Path | Page |
| --- | --- |
| `/references/content-types` | ContentTypesPage |
| `/references/pricing-tiers` | PricingTiersPage |
| `/references/promotion-levels` | PromotionLevelsPage |
| `/references/tags` | TagsPage |

## Quick Links

- Backend Lookup module: `apps/backend/src/Modules/Content/Content/Application/Lookup/`
- Generated API methods: `adminGetAllContentTypes`, `adminGetAllPricingTiers`, `adminGetAllPromotionLevels`, `publicGetAllTags`
