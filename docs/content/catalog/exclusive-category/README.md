# Exclusive Category (Show) — Dashboard Spec

## Context

A **category is a show**. The backend lets a super admin mark **one** video category as the
**exclusive** show and attach a **poster** image to it. The exclusive show is what the public
site renders on the homepage after the promotion feed (two-column layout: poster + tag + title
+ description + "Watch Now", next to a column of video cards).

The backend is **already implemented** (see `apps/backend/docs/exclusive-category/` and the
code under `apps/backend/src/Modules/Content/Content/`). The dashboard now **fully exposes** it:
the catalog module can mark a video category as exclusive, upload/replace a category poster, and
surface `isExclusive` in the table.

> **Status: implemented.** The historical "to-do" framing below is kept for traceability. The
> implementation follows the standalone-file-upload pattern — **Create/Update are JSON** (with
> `isExclusive`, no poster) and the **poster is uploaded via the dedicated endpoint only**. See
> `apps/backend/docs/standalone-file-upload-pattern.md`.

This spec follows the existing catalog module conventions (clean architecture: domain →
application → infrastructure → presentation, Redux Toolkit slices, generated Axios client, Ant
Design forms). It is **scoped to the admin dashboard** — the public homepage rendering belongs to
the public frontend and is out of scope.

## Backend API this consumes (source of truth)

All admin endpoints require **SuperAdmin** and an active account. `CategoryDto` already carries
`isExclusive: boolean` and `posterUrl: string | null`.

| Action | Method · Route | Body | Notes |
| --- | --- | --- | --- |
| Create category | `POST /api/v1/admin/categories/{contentTypeId}` | `application/json` | JSON body incl. `isExclusive` (bool); **no poster** |
| Update category | `PUT /api/v1/admin/categories/{id}` | `application/json` | JSON body incl. `isExclusive` (bool); **no poster** |
| Set exclusive | `PATCH /api/v1/admin/categories/{id}/set-exclusive` | none | dedicated action; mutex auto-handled server-side |
| Upload poster | `PUT /api/v1/admin/categories/{id}/poster` | `multipart/form-data`, field `file` | dedicated single-file endpoint; replaces existing poster; `FileUpload` rate limit |
| Get exclusive (public) | `GET /api/v1/public/categories/exclusive?pageIndex=&pageSize=` | none | **not used by the dashboard** — public frontend only |

Backend rules the dashboard UI must respect (see [06-api-and-rules.md](06-api-and-rules.md)):

1. **Only `Video` categories** can be exclusive — non-video returns `400 OnlyVideoCategoryCanBeExclusive`.
2. **Inactive categories** cannot be exclusive — returns `400 CannotMakeInactiveExclusive`.
3. **Mutex** — at most one exclusive category exists; setting a new one auto-unsets the previous (server-side). The UI must **reload the list** after the action to reflect the swap.
4. **Poster** is optional, stored on Cloudinary, returned as `posterUrl`.

## Decisions baked into this spec

1. **"Make exclusive" uses the dedicated `set-exclusive` endpoint**, not the generic update — it is a single, side-effecting action (mirrors how `activate`/`deactivate` are separate from update). See [02](02-repository-and-usecases.md).
2. **No dedicated "unset exclusive" endpoint exists.** Removing exclusivity is done by editing the category (`update` with `isExclusive=false`) or by making another category exclusive. This is called out as an [open question](#open-questions).
3. **`isExclusive` toggle in the form is shown only for `Video` content types** — mirroring how `isGossip` is shown only for `Article` (see `CategoryForm`).
4. **Poster upload reuses the article-image upload pattern** (`UseUploadCategoryPoster` → usecase → repository → generated client with `FormData`). The poster uploader is shown in **EDIT mode only** (it needs an existing category id), mirroring how the article cover is uploaded after the draft exists.
5. **The generated API client must be regenerated** (`yarn api:generate`) because Create/Update are JSON (no poster) and the poster/set-exclusive endpoints were added. Done.

## Spec files

| Doc | Contents |
| --- | --- |
| [01-domain-and-models.md](01-domain-and-models.md) | `ICategoryEntity` + presentation credential model changes, mapper |
| [02-repository-and-usecases.md](02-repository-and-usecases.md) | repository port methods, new use cases, DI registration |
| [03-store-redux.md](03-store-redux.md) | action thunks, slice state keys, reducers |
| [04-presentation.md](04-presentation.md) | form fields, action modal, table column, hooks, container wiring |
| [05-validation-notifications-constants.md](05-validation-notifications-constants.md) | validators, notifications, action config |
| [06-api-and-rules.md](06-api-and-rules.md) | client regeneration, business rules, error → notification mapping |
| [07-file-inventory-and-todo.md](07-file-inventory-and-todo.md) | full file inventory + master TODO checklist |

## Open questions

- **Unset exclusive:** there is no `unset-exclusive` endpoint. Confirm the intended UX — (a) edit category with `isExclusive=false`, (b) add a backend `unset-exclusive` endpoint, or (c) only ever swap to a different exclusive. This spec assumes (a) until decided.
- **Poster constraints:** the backend poster validator only checks "file required" — confirm accepted mime types and max size to enforce client-side (this spec defaults to image/jpeg + image/png, see [05](05-validation-notifications-constants.md)).
- **Remove poster:** no endpoint clears a poster (upload only replaces). Confirm whether "remove poster" is needed.
