# Phase 1: Domain Entities

Entity interfaces for the 4 editorial resources and shared enums.

**Module paths:**

- `src/modules/articles/domain/entities/`
- `src/modules/videos/domain/entities/`
- `src/modules/shorts/domain/entities/`
- `src/modules/lyrics/domain/entities/`

**Shared enums path:** `src/shared/domain/enums/`

---

## Shared Enum — `EContentStatus`

**File:** `src/shared/domain/enums/EContentStatus.ts`

```ts
enum EContentStatus {
    Draft = "Draft",
    PendingPayment = "PendingPayment",
    PendingReview = "PendingReview",
    Approved = "Approved",
    Published = "Published",
    Rejected = "Rejected",
    Archived = "Archived",
}
```

Maps from backend `EnumContentStatus`. Used by articles and videos. Shorts and lyrics do not use this enum.

---

## Articles

### `IArticleEntity.ts`

```ts
interface IArticleEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    headline: string;
    body: string; // HTML string (rich text)
    coverImageUrl: string;
    authorId: string;
    status: EContentStatus;
    rejectionReason?: string | null;
    isPromoted: boolean;
    promotedUntil?: string | null;
    publishedAt?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    images: IArticleImageEntity[];
    tags: ITagEntity[];
    readTimeInMinutes: number;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `ArticleDetailDto`. The `body` field contains raw HTML produced by the rich text editor.

### `IArticleSummaryEntity.ts`

```ts
interface IArticleSummaryEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    headline: string;
    coverImageUrl: string;
    authorId: string;
    status: EContentStatus;
    isPromoted: boolean;
    publishedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `ArticleSummaryDto`. Used in list views and table rows.

### `IArticleImageEntity.ts`

```ts
interface IArticleImageEntity {
    id: string;
    url: string;
    storageKey: string;
    type: EArticleImageType;
}
```

### Shared enum — `EArticleImageType`

```ts
enum EArticleImageType {
    Cover = "Cover",
    Body = "Body",
}
```

---

## Videos

### `IVideoEntity.ts`

```ts
interface IVideoEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    description: string;
    thumbnailUrl: string;
    thumbnailStorageKey: string;
    authorId: string;
    status: EContentStatus;
    rejectionReason?: string | null;
    youtubeVideoUrl?: string | null;
    isPromoted: boolean;
    promotedUntil?: string | null;
    hasLyrics: boolean;
    shootingScheduledAt?: string | null;
    publishedAt?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    tags: ITagEntity[];
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `VideoDetailDto`.

### `IVideoSummaryEntity.ts`

```ts
interface IVideoSummaryEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    thumbnailUrl: string;
    authorId: string;
    status: EContentStatus;
    youtubeVideoUrl?: string | null;
    isPromoted: boolean;
    hasLyrics: boolean;
    publishedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `VideoSummaryDto`. Used in list views and table rows.

---

## Shorts

### `IShortVideoEntity.ts`

```ts
interface IShortVideoEntity {
    id: string;
    title: string;
    slug: string;
    videoUrl: string;
    thumbnailUrl: string;
    hasFullVideo: boolean;
    isActive: boolean;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    bookmarkCount: number;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `ShortVideoDto`. No `status` — shorts use `isActive` only.

---

## Lyrics

### `ILyricsEntity.ts`

```ts
interface ILyricsEntity {
    id: string;
    songTitle: string;
    artistName: string;
    lyricsText: string;
    language: string;
    videoId?: string | null;
    articleId?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `LyricsDto`. A lyrics record links to either a video or an article (or neither), but not both.

---

## Shared Tag Entity

`ITagEntity` is already defined in the lookup module. The editorial modules import it from there:

```ts
// In articles/videos domain or shared domain
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
```

---

## TODO

- [ ] Create `src/shared/domain/enums/EContentStatus.ts` with JSDoc
- [ ] Create `src/shared/domain/enums/EArticleImageType.ts` with JSDoc
- [ ] Create `src/modules/articles/domain/entities/IArticleEntity.ts` with JSDoc
- [ ] Create `src/modules/articles/domain/entities/IArticleSummaryEntity.ts` with JSDoc
- [ ] Create `src/modules/articles/domain/entities/IArticleImageEntity.ts` with JSDoc
- [ ] Create `src/modules/videos/domain/entities/IVideoEntity.ts` with JSDoc
- [ ] Create `src/modules/videos/domain/entities/IVideoSummaryEntity.ts` with JSDoc
- [ ] Create `src/modules/shorts/domain/entities/IShortVideoEntity.ts` with JSDoc
- [ ] Create `src/modules/lyrics/domain/entities/ILyricsEntity.ts` with JSDoc
