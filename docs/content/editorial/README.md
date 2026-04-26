# Editorial Module — Documentation

> **UI Label:** This module is displayed as **"Édition"** in the dashboard navigation.

Content creation and editorial workflow: **articles**, **videos**, **shorts**, and **lyrics**.

> **Status:** Planned — depends on Catalogue module (categories) being implemented first.

## Overview

The Édition module is the largest sub-module. It manages all content creation with a multi-step editorial workflow for articles and videos:

```
Draft → PendingPayment → PendingReview → Approved → Published
                                       ↘ Rejected (can resubmit)
                                                    ↘ Archived
```

Short videos bypass this workflow — they use simple `activate`/`deactivate`. Lyrics are standalone SEO pages linked to videos or articles.

## Frontend Module Structure

Each editorial resource gets its own top-level module (per user decision):

| Resource | Module Path | Endpoints |
| --- | --- | --- |
| Articles | `src/modules/articles/` | 13 admin + 3 public |
| Videos | `src/modules/videos/` | 15 admin + 3 public |
| Shorts | `src/modules/shorts/` | 7 admin + 2 public |
| Lyrics | `src/modules/lyrics/` | 4 admin + 1 public |

## Backend Endpoints (40 admin)

### Articles (13 admin endpoints)

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/articles` | SuperAdminOnly | Create draft |
| PUT | `/api/v1/admin/articles/{id}` | AdminOrSuperAdmin | Update content |
| PATCH | `/api/v1/admin/articles/{id}/submit` | SuperAdminOnly | Submit for review |
| PATCH | `/api/v1/admin/articles/{id}/approve` | SuperAdminOnly | Approve |
| PATCH | `/api/v1/admin/articles/{id}/publish` | SuperAdminOnly | Publish |
| PATCH | `/api/v1/admin/articles/{id}/reject` | SuperAdminOnly | Reject (with reason) |
| PATCH | `/api/v1/admin/articles/{id}/archive` | SuperAdminOnly | Archive |
| DELETE | `/api/v1/admin/articles/{id}` | SuperAdminOnly | Hard delete |
| POST | `/api/v1/admin/articles/{id}/images` | SuperAdminOnly | Upload image |
| PATCH | `/api/v1/admin/articles/{id}/seo` | AdminOrSuperAdmin | Update SEO |
| PUT | `/api/v1/admin/articles/{id}/tags` | AdminOrSuperAdmin | Replace tags |
| GET | `/api/v1/admin/articles` | AdminOrSuperAdmin | List all |
| GET | `/api/v1/admin/articles/{id}` | AdminOrSuperAdmin | Get by ID |

### Videos (15 admin endpoints)

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/videos` | SuperAdminOnly | Create |
| PUT | `/api/v1/admin/videos/{id}` | AdminOrSuperAdmin | Update |
| PATCH | `/api/v1/admin/videos/{id}/submit` | SuperAdminOnly | Submit |
| PATCH | `/api/v1/admin/videos/{id}/approve` | SuperAdminOnly | Approve |
| PATCH | `/api/v1/admin/videos/{id}/publish` | SuperAdminOnly | Publish |
| PATCH | `/api/v1/admin/videos/{id}/reject` | SuperAdminOnly | Reject |
| PATCH | `/api/v1/admin/videos/{id}/archive` | SuperAdminOnly | Archive |
| DELETE | `/api/v1/admin/videos/{id}` | SuperAdminOnly | Hard delete |
| POST | `/api/v1/admin/videos/{id}/thumbnail` | AdminOrSuperAdmin | Upload thumbnail |
| PATCH | `/api/v1/admin/videos/{id}/youtube` | AdminOnly | Attach YouTube ID |
| PATCH | `/api/v1/admin/videos/{id}/seo` | AdminOrSuperAdmin | Update SEO |
| PUT | `/api/v1/admin/videos/{id}/tags` | AdminOrSuperAdmin | Replace tags |
| PATCH | `/api/v1/admin/videos/{id}/shoot` | AdminOrSuperAdmin | Schedule shoot |
| GET | `/api/v1/admin/videos` | AdminOrSuperAdmin | List all |
| GET | `/api/v1/admin/videos/{id}` | AdminOrSuperAdmin | Get by ID |

### Shorts (7 admin endpoints)

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/shorts` | SuperAdminOnly | Create |
| PATCH | `/api/v1/admin/shorts/{id}/activate` | SuperAdminOnly | Activate |
| PATCH | `/api/v1/admin/shorts/{id}/deactivate` | SuperAdminOnly | Deactivate |
| DELETE | `/api/v1/admin/shorts/{id}` | SuperAdminOnly | Hard delete |
| POST | `/api/v1/admin/shorts/{id}/thumbnail` | AdminOrSuperAdmin | Upload thumbnail |
| GET | `/api/v1/admin/shorts` | AdminOrSuperAdmin | List all |
| GET | `/api/v1/admin/shorts/{id}` | AdminOrSuperAdmin | Get by ID |

### Lyrics (4 admin endpoints)

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/lyrics` | SuperAdminOnly | Create |
| PUT | `/api/v1/admin/lyrics/{id}` | AdminOrSuperAdmin | Update |
| PATCH | `/api/v1/admin/lyrics/{id}/seo` | AdminOrSuperAdmin | Update SEO |
| GET | `/api/v1/admin/lyrics` | AdminOrSuperAdmin | List all |

## Key Enums

- **EnumContentStatus** — Draft, PendingPayment, PendingReview, Approved, Published, Rejected, Archived
- **EnumArticleImageType** — Cover, Body
- **EnumCoreContentType** — Article, Video, Short

## Dependencies

- Catalogue module (categories — every article/video belongs to one)
- Références module (tags — articles and videos can have tags)
