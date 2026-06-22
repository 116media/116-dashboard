# 01 — Domain Entity & Presentation Models

## 1. `ICategoryEntity` — add `isExclusive` and `posterUrl`

**File:** `src/modules/catalog/domain/entities/ICategoryEntity.ts`

The backend `CategoryDto` already returns `isExclusive` and `posterUrl`. Mirror them on the
domain entity (JSDoc on every property, per dashboard convention).

```ts
/**
 * Whether this category is the currently featured exclusive show.
 * At most one category is exclusive at a time (enforced by the backend).
 */
isExclusive: boolean;

/**
 * Resolved URL of the show's poster image, or null when no poster is set.
 * Only video categories (shows) use a poster.
 */
posterUrl: string | null;
```

> The entity already exposes `isVideoType` / `isArticleType` helpers — the form layer
> uses `isVideoType` to decide whether to show the exclusive toggle (see [04](04-presentation.md)).

## 2. Mapper — map the new fields

**File:** `src/modules/catalog/infrastructure/mappers/catalog.mapper.ts` → `categoryFromDto`

```ts
isExclusive: dto.isExclusive ?? false,
posterUrl: dto.posterUrl ?? null,
```

> After the generated client is regenerated ([06](06-api-and-rules.md)), `dto.isExclusive`
> and `dto.posterUrl` are typed. Until then they may need a temporary cast — do **not** ship
> the cast; regenerate first.

## 3. Presentation credential models

**Folder:** `src/modules/catalog/presentation/model/`

### 3a. Create / Update gain `isExclusive` + optional `poster`

`ICreateCategoryCredentials.ts` and `IUpdateCategoryCredentials.ts` — add:

```ts
/** Whether to mark the category as the exclusive show (video categories only). Defaults to false in the create form. */
isExclusive: boolean;

/** Optional poster image (cropped to 1:1 by default) uploaded alongside create/update. */
poster?: File | null;
```

> Backend Create also requires `isGossip`; confirm the current create credential already
> carries everything the multipart endpoint needs once the client is regenerated. The two
> **new** fields for this feature are `isExclusive` and `poster`.

### 3b. New model: poster upload credentials

**File:** `src/modules/catalog/presentation/model/IUploadCategoryPosterCredentials.ts` (new)

```ts
/**
 * Credentials for uploading (or replacing) a category poster image.
 */
export interface IUploadCategoryPosterCredentials {
    /** The poster image file (multipart field name on the backend is `file`). */
    file: File;
}
```

### 3c. New model: set-exclusive has no body

`set-exclusive` takes only the category id in the route — no credential model needed; the
use case takes the id string directly (see [02](02-repository-and-usecases.md)).

## TODO

- [ ] Add `isExclusive: boolean` and `posterUrl: string | null` to `ICategoryEntity` with JSDoc
- [ ] Map both fields in `CatalogMapper.categoryFromDto`
- [ ] Add `isExclusive` + optional `poster?: File | null` to `ICreateCategoryCredentials`
- [ ] Add `isExclusive` + optional `poster?: File | null` to `IUpdateCategoryCredentials`
- [ ] Create `IUploadCategoryPosterCredentials` model
- [ ] Remove any temporary DTO casts once the generated client is regenerated
