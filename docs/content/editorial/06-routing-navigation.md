# Phase 6: Routing and Navigation

Path constants, navigation items, route registration, and cross-cutting wiring for all 4 editorial modules.

---

## Path Constants

**File:** `src/shared/presentation/constants/paths.ts`

Add:

```ts
// Articles
export const ARTICLES_PATH = "/articles";

// Videos
export const VIDEOS_PATH = "/videos";

// Shorts
export const SHORTS_PATH = "/shorts";

// Lyrics
export const LYRICS_PATH = "/lyrics";
```

> Articles and videos already have routes referenced in the README. Confirm whether any path constants already exist before adding duplicates.

---

## Navigation Items

**File:** `src/shared/presentation/constants/navigation.ts`

Add 4 entries as the **"Édition"** top-level nav group, positioned after the "Catalogue" group and before Roles/Permissions:

```ts
// Articles
{
    label: "Articles",
    path: ARTICLES_PATH,
    icon: IconFileTextOutlined,
    permission: { resource: "articles", action: "read" }
},

// Videos
{
    label: "Vidéos",
    path: VIDEOS_PATH,
    icon: IconVideoOutlined,
    permission: { resource: "videos", action: "read" }
},

// Shorts
{
    label: "Shorts",
    path: SHORTS_PATH,
    icon: IconPlayCircleOutlined,
    permission: { resource: "shorts", action: "read" }
},

// Lyrics
{
    label: "Paroles",
    path: LYRICS_PATH,
    icon: "IconSoundOutlined",
    permission: { resource: "lyrics", action: "read" }
},
```

> Icon choices must be verified against `src/shared/presentation/ui/Icons/index.tsx`. Use appropriate icons already exported or add new ones. Suggested icons: `FileTextOutlined`, `VideoCameraOutlined`, `PlayCircleOutlined`, `SoundOutlined`.

---

## Route Registration

**File:** `src/routes.tsx`

Add 4 lazy imports:

```tsx
const ArticlesPage = lazy(() => import("@/modules/articles/presentation/pages/ArticlesPage"));
const VideosPage = lazy(() => import("@/modules/videos/presentation/pages/VideosPage"));
const ShortsPage = lazy(() => import("@/modules/shorts/presentation/pages/ShortsPage"));
const LyricsPage = lazy(() => import("@/modules/lyrics/presentation/pages/LyricsPage"));
```

Add 4 `PermissionRoute`-wrapped entries inside the protected DashboardLayout children:

```tsx
// Articles
{
    element: <PermissionRoute permissions={[{ resource: "articles", action: "read" }]} />,
    children: [{ path: ARTICLES_PATH, element: <ArticlesPage /> }]
},

// Videos
{
    element: <PermissionRoute permissions={[{ resource: "videos", action: "read" }]} />,
    children: [{ path: VIDEOS_PATH, element: <VideosPage /> }]
},

// Shorts
{
    element: <PermissionRoute permissions={[{ resource: "shorts", action: "read" }]} />,
    children: [{ path: SHORTS_PATH, element: <ShortsPage /> }]
},

// Lyrics
{
    element: <PermissionRoute permissions={[{ resource: "lyrics", action: "read" }]} />,
    children: [{ path: LYRICS_PATH, element: <LyricsPage /> }]
},
```

---

## Root Reducer

**File:** `src/shared/presentation/store/root.reducer.ts`

Add 4 reducer entries:

```ts
import articlesReducer from "@/modules/articles/presentation/store";
import videosReducer from "@/modules/videos/presentation/store";
import shortsReducer from "@/modules/shorts/presentation/store";
import lyricsReducer from "@/modules/lyrics/presentation/store";

// in combineReducers:
articles: articlesReducer,
videos: videosReducer,
shorts: shortsReducer,
lyrics: lyricsReducer,
```

---

## Service Locator

**File:** `src/shared/infrastructure/service.locator.ts`

### Imports

```ts
import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";

// ... import all 39 use case types (13 articles + 15 videos + 7 shorts + 4 lyrics)

import { registerArticlesDependencies } from "@/modules/articles/infrastructure/dependencies/articles.dependencies";
import { registerVideosDependencies } from "@/modules/videos/infrastructure/dependencies/videos.dependencies";
import { registerShortsDependencies } from "@/modules/shorts/infrastructure/dependencies/shorts.dependencies";
import { registerLyricsDependencies } from "@/modules/lyrics/infrastructure/dependencies/lyrics.dependencies";
```

### Cradle Extension

Extend the `Cradle` interface with all 43 new entries (4 repositories + 39 use cases):

```ts
// Repositories
articlesRepository: IArticlesRepositoryPort;
videosRepository: IVideosRepositoryPort;
shortsRepository: IShortsRepositoryPort;
lyricsRepository: ILyricsRepositoryPort;

// Articles use cases (13)
getAllArticlesUseCase: GetAllArticlesUseCase;
getArticleByIdUseCase: GetArticleByIdUseCase;
createArticleUseCase: CreateArticleUseCase;
updateArticleUseCase: UpdateArticleUseCase;
submitArticleUseCase: SubmitArticleUseCase;
approveArticleUseCase: ApproveArticleUseCase;
publishArticleUseCase: PublishArticleUseCase;
rejectArticleUseCase: RejectArticleUseCase;
archiveArticleUseCase: ArchiveArticleUseCase;
deleteArticleUseCase: DeleteArticleUseCase;
uploadArticleImageUseCase: UploadArticleImageUseCase;
updateArticleSeoUseCase: UpdateArticleSeoUseCase;
updateArticleTagsUseCase: UpdateArticleTagsUseCase;

// Videos use cases (15)
getAllVideosUseCase: GetAllVideosUseCase;
getVideoByIdUseCase: GetVideoByIdUseCase;
createVideoUseCase: CreateVideoUseCase;
updateVideoUseCase: UpdateVideoUseCase;
submitVideoUseCase: SubmitVideoUseCase;
approveVideoUseCase: ApproveVideoUseCase;
publishVideoUseCase: PublishVideoUseCase;
rejectVideoUseCase: RejectVideoUseCase;
archiveVideoUseCase: ArchiveVideoUseCase;
deleteVideoUseCase: DeleteVideoUseCase;
uploadVideoThumbnailUseCase: UploadVideoThumbnailUseCase;
attachYoutubeIdUseCase: AttachYoutubeVideoUrlUseCase;
updateVideoSeoUseCase: UpdateVideoSeoUseCase;
updateVideoTagsUseCase: UpdateVideoTagsUseCase;
scheduleShootUseCase: ScheduleShootUseCase;

// Shorts use cases (7)
getAllShortsUseCase: GetAllShortsUseCase;
getShortByIdUseCase: GetShortByIdUseCase;
createShortUseCase: CreateShortUseCase;
activateShortUseCase: ActivateShortUseCase;
deactivateShortUseCase: DeactivateShortUseCase;
deleteShortUseCase: DeleteShortUseCase;
uploadShortThumbnailUseCase: UploadShortThumbnailUseCase;

// Lyrics use cases (4)
getAllLyricsUseCase: GetAllLyricsUseCase;
createLyricsUseCase: CreateLyricsUseCase;
updateLyricsUseCase: UpdateLyricsUseCase;
updateLyricsSeoUseCase: UpdateLyricsSeoUseCase;
```

### Registration Calls

```ts
registerArticlesDependencies(container);
registerVideosDependencies(container);
registerShortsDependencies(container);
registerLyricsDependencies(container);
```

---

## Icons

**File:** `src/shared/presentation/ui/Icons/index.tsx`

Export any new icons needed for navigation. Suggested additions:

```ts
export { FileTextOutlined as IconFileTextOutlined } from "@ant-design/icons";
export { VideoCameraOutlined as IconVideoCameraOutlined } from "@ant-design/icons";
export { PlayCircleOutlined as IconPlayCircleOutlined } from "@ant-design/icons";
export { SoundOutlined as IconSoundOutlined } from "@ant-design/icons";
```

> Verify against existing exports to avoid duplicate re-exports. Some icons may already be present.

---

## Shared Components

The following shared components are referenced by multiple editorial modules and should live in the shared presentation layer:

**Path:** `src/shared/presentation/components/`

### `ContentStatusTag`

Renders a colored `Tag` component for each `EContentStatus` value:

| Status | Label | Color |
| --- | --- | --- |
| `Draft` | "Brouillon" | `default` |
| `PendingPayment` | "paiement en cours" | `orange` |
| `PendingReview` | "En attente de revue" | `blue` |
| `Approved` | "Approuvé" | `cyan` |
| `Published` | "Publié" | `green` |
| `Rejected` | "Rejeté" | `red` |
| `Archived` | "Archivé" | `volcano` |

Used by: `ArticlesTable`, `VideosTable`.

### `CategorySelect`

A `Select` component that loads categories from the catalog store. Accepts `value`, `onChange`, and optional `disabled` props. Used by: `ArticleContentForm`, `VideoContentForm`.

### `TagMultiSelect`

A `Select` with `mode="multiple"` that loads tags from the lookup store. Accepts `value: string[]` and `onChange: (ids: string[]) => void`. Used by: `ArticleTagsForm`, `VideoTagsForm`.

---

## Module Dependency Summary

| Module | Depends on |
| --- | --- |
| Articles | Catalog (categories), Lookup (tags) |
| Videos | Catalog (categories), Lookup (tags), Lyrics (hasLyrics flag) |
| Shorts | None |
| Lyrics | Videos (videoId select), Articles (articleId select) |

> Load articles and videos lists into their respective stores before rendering the `LyricsContentForm` `videoId`/`articleId` selects. Use summary entities for the select options to avoid heavy payloads.

---

## TODO

- [ ] Add 4 path constants to `paths.ts`
- [ ] Add 4 navigation items to `navigation.ts`
- [ ] Add 4 lazy imports and 4 `PermissionRoute` entries to `routes.tsx`
- [ ] Add `articles`, `videos`, `shorts`, `lyrics` reducers to `root.reducer.ts`
- [ ] Extend `Cradle` interface with 43 entries in `service.locator.ts`
- [ ] Call all 4 `register*Dependencies` in `service.locator.ts`
- [ ] Export any needed icons in `Icons/index.tsx`
- [ ] Create shared `ContentStatusTag` component
- [ ] Create shared `CategorySelect` component
- [ ] Create shared `TagMultiSelect` component
- [ ] Confirm that `EContentStatus` enum is shared (not duplicated per module)
