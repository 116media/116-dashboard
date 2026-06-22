# 06 — API Client & Business Rules

## 1. Regenerate the API client (do this first)

The backend changed in ways the current generated client does not know about:

- `POST /admin/categories/{contentTypeId}` and `PUT /admin/categories/{id}` are now
  `multipart/form-data` and carry `IsExclusive` (+ optional `Poster`).
- `CategoryDto` gained `isExclusive` and `posterUrl`.
- Two new endpoints: `PATCH /admin/categories/{id}/set-exclusive` and
  `PUT /admin/categories/{id}/poster`.

Regenerate against the running backend Swagger (the script already exists in `package.json`):

```bash
# backend must be running on :5025
yarn api:generate
```

This rewrites `src/shared/infrastructure/api/generated/116.api.ts`. Expected new/changed methods
(confirm exact names after generation — `swagger-typescript-api` derives them from `operationId`):

| Purpose | Likely generated method |
| --- | --- |
| Set exclusive | `adminSetExclusiveCategory(id)` |
| Upload poster | `adminUploadCategoryPoster(id, { file })` |
| Create category | `adminCreateCategory(contentTypeId, multipartBody)` |
| Update category | `adminUpdateCategory(id, multipartBody)` |

> The generated client auto-wraps file fields in `FormData` (see the article-image upload). If
> method names differ from the table, update [02](02-repository-and-usecases.md) impls to match
> the generated names — the generated client is the source of truth for signatures.

## 2. Business rules the UI must enforce / handle

| Rule | Backend behavior | Dashboard handling |
| --- | --- | --- |
| Video-only | non-video → `400 OnlyVideoCategoryCanBeExclusive` | only show the exclusive toggle/action for `isVideoType` categories |
| Active-only | inactive → `400 CannotMakeInactiveExclusive` | hide/disable the action when `!isActive`; disable the form toggle when editing an inactive category |
| Mutex (one exclusive) | setting a new exclusive auto-unsets the previous | always `reload()` the list after a successful set so the swap is visible |
| Poster optional | poster stored on Cloudinary, returned as `posterUrl` | preview `posterUrl`; allow upload/replace; treat as optional |
| No unset endpoint | only `set-exclusive` exists | to remove exclusivity, edit the category with `isExclusive=false` (see README open question) |

## 3. Error → notification mapping

All four admin endpoints surface errors as `IApiProblemDetails` → normalized to `Failure` by the
shared error handler. Build the error notification from the `Failure` at runtime (title/detail);
do not hardcode. Key cases to expect:

| HTTP | Backend message key | Meaning to convey |
| --- | --- | --- |
| 400 | `OnlyVideoCategoryCanBeExclusive` | only video categories can be exclusive |
| 400 | `CannotMakeInactiveExclusive` | activate the category first |
| 400 | `FileRequired` | a poster file is required |
| 401 / 403 | — | not authorized (SuperAdmin only) |
| 404 | — | category not found |
| 429 | — | rate limited (poster upload uses the stricter `FileUpload` policy) |

## 4. Authorization

All exclusive/poster admin actions are **SuperAdmin-only** on the backend. Gate the UI the same
way the dashboard already gates super-admin actions (`useAuthorization().isSuperAdmin` and/or the
`PermissionRoute` guarding the catalog route) so non-super-admins never see the action.

## TODO

- [ ] Run `yarn api:generate` against the updated backend and commit the regenerated client
- [ ] Reconcile repository impl method names with the actual generated signatures
- [ ] Enforce video-only + active-only visibility on the toggle and table action
- [ ] Always `reload()` after a successful set-exclusive (mutex)
- [ ] Surface backend errors via the shared `Failure` → notification path
- [ ] Gate all new actions behind SuperAdmin
