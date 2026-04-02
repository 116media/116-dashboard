# Content Module — Documentation

Complete specification for the **Content** domain in the dashboard application. The content domain is split into independent sub-modules, each implemented as a separate frontend module.

## Sub-modules

| Sub-module | UI Label | Description | Module Path | Status |
| --- | --- | --- | --- | --- |
| [Lookup](./lookup/README.md) | **Références** | Reference data: content types, pricing tiers, promotion levels, tags | `src/modules/lookup/` | Planned |
| [Catalog](./catalog/README.md) | **Catalogue** | Product catalog: categories, packages, customers | `src/modules/catalog/` | Planned |
| [Editorial](./editorial/README.md) | **Édition** | Content lifecycle: articles, videos, shorts, lyrics | `src/modules/articles/`, `src/modules/videos/`, `src/modules/shorts/`, `src/modules/lyrics/` | Planned |
| [Commerce](./commerce/README.md) | **Ventes** | Revenue lifecycle: orders, payments | `src/modules/commerce/` | Planned |

> **Interactions** (likes, bookmarks, comments, shares, playlists, ratings) are visitor-only features for the public app. They are excluded from the dashboard — only the admin "delete comment" endpoint is relevant and will be handled within the Editorial sub-module.

## Backend Reference

The backend Content module lives at `apps/backend/src/Modules/Content/Content/` and contains:

- **31 domain entities** across 5 sub-modules
- **97 admin endpoints** (Lookup: 18, Catalog: 21, Editorial: 40, Commerce: 13, Interactions: 27 — mostly public)
- **6 enums**: `EnumCoreContentType`, `EnumArticleImageType`, `EnumContentStatus`, `EnumOrderStatus`, `EnumPaymentMethod`, `EnumPaymentStatus`
- **24 shared DTOs**

## Content Status Workflow (Édition)

Articles and videos follow a 7-step editorial workflow:

```
Draft → PendingPayment → PendingReview → Approved → Published
                                       ↘ Rejected (can resubmit)
                                                    ↘ Archived
```

Short videos bypass this workflow — they use simple `activate`/`deactivate`.

## Order Status Workflow (Ventes)

```
Draft → PendingPayment → Paid
  ↘ Cancelled      ↗
```

## Implementation Order

1. **Références** (`lookup`) — foundation data that everything else depends on
2. **Catalogue** (`catalog`) — categories needed before articles/videos can be created
3. **Édition** (`editorial`) — core content CRUD with workflow (most complex)
4. **Ventes** (`commerce`) — B2B revenue lifecycle (depends on catalog)

## Architecture Reference

All sub-modules follow the same Clean Architecture pattern documented in:

- [Roles & Permissions docs](../roles-permissions/) — the primary CRUD implementation reference
- [Settings docs](../settings/) — the first module implementation reference
- [Dependency injection docs](../dependency-injection/) — Awilix container design
- [Authorization docs](../authorization/) — permission-based access control

## Quick Links

- Backend Content module: `apps/backend/src/Modules/Content/Content/`
- Generated API client: `src/shared/infrastructure/api/generated/116.api.ts`
- Shared Result/Failure types: `src/shared/domain/results/result.ts`, `src/shared/domain/failures/failure.ts`
- ProblemMapper: `src/shared/infrastructure/mappers/problem.mapper.ts`
- DI container: `src/shared/infrastructure/service.locator.ts`
- Shared CRUD components: `src/shared/presentation/ui/` (PageHeader, TableToolbar, CreateEditModal, ActionModal, etc.)
