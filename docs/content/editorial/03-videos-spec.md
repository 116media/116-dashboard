# Phase 3: Videos Module Spec

Full spec for the videos module — 15 admin endpoints with a 7-step editorial workflow plus thumbnail upload, YouTube ID attachment, and shoot scheduling.

**Module path:** `src/modules/videos/`

---

## Endpoints Reference

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/videos` | SuperAdminOnly | Créer une vidéo |
| PUT | `/api/v1/admin/videos/{id}` | AdminOrSuperAdmin | Modifier le contenu |
| PATCH | `/api/v1/admin/videos/{id}/submit` | SuperAdminOnly | Soumettre pour revue |
| PATCH | `/api/v1/admin/videos/{id}/approve` | SuperAdminOnly | Approuver |
| PATCH | `/api/v1/admin/videos/{id}/publish` | SuperAdminOnly | Publier |
| PATCH | `/api/v1/admin/videos/{id}/reject` | SuperAdminOnly | Rejeter (avec raison) |
| PATCH | `/api/v1/admin/videos/{id}/archive` | SuperAdminOnly | Archiver |
| DELETE | `/api/v1/admin/videos/{id}` | SuperAdminOnly | Supprimer définitivement |
| POST | `/api/v1/admin/videos/{id}/thumbnail` | AdminOrSuperAdmin | Importer la miniature |
| PATCH | `/api/v1/admin/videos/{id}/youtube` | AdminOnly | Associer un ID YouTube |
| PATCH | `/api/v1/admin/videos/{id}/seo` | AdminOrSuperAdmin | Mettre à jour le SEO |
| PUT | `/api/v1/admin/videos/{id}/tags` | AdminOrSuperAdmin | Remplacer les tags |
| PATCH | `/api/v1/admin/videos/{id}/shoot` | AdminOrSuperAdmin | Planifier le tournage |
| GET | `/api/v1/admin/videos` | AdminOrSuperAdmin | Lister toutes les vidéos |
| GET | `/api/v1/admin/videos/{id}` | AdminOrSuperAdmin | Obtenir par identifiant |

---

## Repository Port

**File:** `src/modules/videos/application/repositories/videos.repository.port.ts`

```ts
interface IVideosRepositoryPort {
    getAllVideos(params: IVideosQueryParams): Promise<Result<IPaginatedResult<IVideoSummaryEntity>>>;
    getVideoById(id: string): Promise<Result<IVideoEntity>>;
    createVideo(data: ICreateVideoCredentials): Promise<Result<IVideoEntity>>;
    updateVideo(id: string, data: IUpdateVideoCredentials): Promise<Result<IVideoEntity>>;
    submitVideo(id: string): Promise<Result<IVideoEntity>>;
    approveVideo(id: string): Promise<Result<IVideoEntity>>;
    publishVideo(id: string): Promise<Result<IVideoEntity>>;
    rejectVideo(id: string, data: IRejectVideoCredentials): Promise<Result<IVideoEntity>>;
    archiveVideo(id: string): Promise<Result<IVideoEntity>>;
    deleteVideo(id: string): Promise<Result<void>>;
    uploadVideoThumbnail(id: string, data: IUploadVideoThumbnailCredentials): Promise<Result<IVideoEntity>>;
    attachYoutubeId(id: string, data: IAttachYoutubeUrlCredentials): Promise<Result<IVideoEntity>>;
    updateVideoSeo(id: string, data: IUpdateVideoSeoCredentials): Promise<Result<IVideoEntity>>;
    updateVideoTags(id: string, data: IUpdateVideoTagsCredentials): Promise<Result<ITagEntity[]>>;
    scheduleShoot(id: string, data: IScheduleShootCredentials): Promise<Result<IVideoEntity>>;
}
```

---

## Use Cases

**Path:** `src/modules/videos/application/usecases/`

| File | Input | Output |
| --- | --- | --- |
| `getallvideos.usecase.ts` | `IVideosQueryParams` | `IPaginatedResult<IVideoSummaryEntity>` |
| `getvideobyid.usecase.ts` | `string` (id) | `IVideoEntity` |
| `createvideo.usecase.ts` | `ICreateVideoCredentials` | `IVideoEntity` |
| `updatevideo.usecase.ts` | `{ id: string; data: IUpdateVideoCredentials }` | `IVideoEntity` |
| `submitvideo.usecase.ts` | `string` (id) | `IVideoEntity` |
| `approvevideo.usecase.ts` | `string` (id) | `IVideoEntity` |
| `publishvideo.usecase.ts` | `string` (id) | `IVideoEntity` |
| `rejectvideo.usecase.ts` | `{ id: string; data: IRejectVideoCredentials }` | `IVideoEntity` |
| `archivevideo.usecase.ts` | `string` (id) | `IVideoEntity` |
| `deletevideo.usecase.ts` | `string` (id) | `void` |
| `uploadvideothumbnail.usecase.ts` | `{ id: string; data: IUploadVideoThumbnailCredentials }` | `IVideoEntity` |
| `attachyoutubeid.usecase.ts` | `{ id: string; data: IAttachYoutubeUrlCredentials }` | `IVideoEntity` |
| `updatevideoseo.usecase.ts` | `{ id: string; data: IUpdateVideoSeoCredentials }` | `IVideoEntity` |
| `updatevideotags.usecase.ts` | `{ id: string; data: IUpdateVideoTagsCredentials }` | `ITagEntity[]` |
| `scheduleshoot.usecase.ts` | `{ id: string; data: IScheduleShootCredentials }` | `IVideoEntity` |

---

## Infrastructure

**Path:** `src/modules/videos/infrastructure/`

### Mapper

**File:** `mappers/videos.mapper.ts`

```ts
export const VideosMapper = {
    videoFromDto(dto: VideoDetailDto): IVideoEntity,
    videoSummaryFromDto(dto: VideoSummaryDto): IVideoSummaryEntity,
} as const;
```

### Repository Implementation

**File:** `repositories/videos.repository.impl.ts`

#### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `getAllVideos` | `apiClient.api.adminGetAllVideos(params)` |
| `getVideoById` | `apiClient.api.adminGetVideoById(id)` |
| `createVideo` | `apiClient.api.adminCreateVideo(data)` |
| `updateVideo` | `apiClient.api.adminUpdateVideo(id, data)` |
| `submitVideo` | `apiClient.api.adminSubmitVideo(id)` |
| `approveVideo` | `apiClient.api.adminApproveVideo(id)` |
| `publishVideo` | `apiClient.api.adminPublishVideo(id)` |
| `rejectVideo` | `apiClient.api.adminRejectVideo(id, data)` |
| `archiveVideo` | `apiClient.api.adminArchiveVideo(id)` |
| `deleteVideo` | `apiClient.api.adminDeleteVideo(id)` |
| `uploadVideoThumbnail` | `apiClient.api.adminUploadVideoThumbnail(id, data)` |
| `attachYoutubeId` | `apiClient.api.adminAttachYoutubeVideoUrl(id, data)` |
| `updateVideoSeo` | `apiClient.api.adminUpdateVideoSeo(id, data)` |
| `updateVideoTags` | `apiClient.api.adminUpdateVideoTags(id, data)` |
| `scheduleShoot` | `apiClient.api.adminScheduleShoot(id, data)` |

> Verify all generated API method names against `116.api.ts` before implementing.

### DI Registration

**File:** `dependencies/videos.dependencies.ts`

```ts
export function registerVideosDependencies(container: AwilixContainer): void {
    container.register({
        videosRepository: asClass(VideosRepositoryImpl).singleton(),

        getAllVideosUseCase: asClass(GetAllVideosUseCase).transient(),
        getVideoByIdUseCase: asClass(GetVideoByIdUseCase).transient(),
        createVideoUseCase: asClass(CreateVideoUseCase).transient(),
        updateVideoUseCase: asClass(UpdateVideoUseCase).transient(),
        submitVideoUseCase: asClass(SubmitVideoUseCase).transient(),
        approveVideoUseCase: asClass(ApproveVideoUseCase).transient(),
        publishVideoUseCase: asClass(PublishVideoUseCase).transient(),
        rejectVideoUseCase: asClass(RejectVideoUseCase).transient(),
        archiveVideoUseCase: asClass(ArchiveVideoUseCase).transient(),
        deleteVideoUseCase: asClass(DeleteVideoUseCase).transient(),
        uploadVideoThumbnailUseCase: asClass(UploadVideoThumbnailUseCase).transient(),
        attachYoutubeIdUseCase: asClass(AttachYoutubeVideoUrlUseCase).transient(),
        updateVideoSeoUseCase: asClass(UpdateVideoSeoUseCase).transient(),
        updateVideoTagsUseCase: asClass(UpdateVideoTagsUseCase).transient(),
        scheduleShootUseCase: asClass(ScheduleShootUseCase).transient(),
    });
}
```

---

## Redux Store

**Path:** `src/modules/videos/presentation/store/`

### `constants.ts`

```ts
export const ActionType = {
    GetVideos: "videos/getVideos",
    GetVideoById: "videos/getVideoById",
    CreateVideo: "videos/createVideo",
    UpdateVideo: "videos/updateVideo",
    SubmitVideo: "videos/submitVideo",
    ApproveVideo: "videos/approveVideo",
    PublishVideo: "videos/publishVideo",
    RejectVideo: "videos/rejectVideo",
    ArchiveVideo: "videos/archiveVideo",
    DeleteVideo: "videos/deleteVideo",
    UploadVideoThumbnail: "videos/uploadVideoThumbnail",
    AttachYoutubeVideoUrl: "videos/attachYoutubeId",
    UpdateVideoSeo: "videos/updateVideoSeo",
    UpdateVideoTags: "videos/updateVideoTags",
    ScheduleShoot: "videos/scheduleShoot",
} as const;

export const SliceName = { Videos: "videos" } as const;
```

### `type.ts`

```ts
type IVideosState = {
    getVideos: IBasicInitialState<IPaginatedResult<IVideoSummaryEntity>>;
    getVideoById: IBasicInitialState<IVideoEntity>;
    createVideo: IBasicInitialState<IVideoEntity>;
    updateVideo: IBasicInitialState<IVideoEntity>;
    submitVideo: IBasicInitialState<IVideoEntity>;
    approveVideo: IBasicInitialState<IVideoEntity>;
    publishVideo: IBasicInitialState<IVideoEntity>;
    rejectVideo: IBasicInitialState<IVideoEntity>;
    archiveVideo: IBasicInitialState<IVideoEntity>;
    deleteVideo: IBasicInitialState<void>;
    uploadVideoThumbnail: IBasicInitialState<IVideoEntity>;
    attachYoutubeId: IBasicInitialState<IVideoEntity>;
    updateVideoSeo: IBasicInitialState<IVideoEntity>;
    updateVideoTags: IBasicInitialState<ITagEntity[]>;
    scheduleShoot: IBasicInitialState<IVideoEntity>;
};
```

### Action Files (15 files)

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `getvideos.action.ts` | `IVideosQueryParams` | `IPaginatedResult<IVideoSummaryEntity>` |
| `getvideobyid.action.ts` | `string` | `IVideoEntity` |
| `createvideo.action.ts` | `ICreateVideoCredentials` | `IVideoEntity` |
| `updatevideo.action.ts` | `{ id: string; data: IUpdateVideoCredentials }` | `IVideoEntity` |
| `submitvideo.action.ts` | `string` | `IVideoEntity` |
| `approvevideo.action.ts` | `string` | `IVideoEntity` |
| `publishvideo.action.ts` | `string` | `IVideoEntity` |
| `rejectvideo.action.ts` | `{ id: string; data: IRejectVideoCredentials }` | `IVideoEntity` |
| `archivevideo.action.ts` | `string` | `IVideoEntity` |
| `deletevideo.action.ts` | `string` | `void` |
| `uploadvideothumbnail.action.ts` | `{ id: string; data: IUploadVideoThumbnailCredentials }` | `IVideoEntity` |
| `attachyoutubeid.action.ts` | `{ id: string; data: IAttachYoutubeUrlCredentials }` | `IVideoEntity` |
| `updatevideoseo.action.ts` | `{ id: string; data: IUpdateVideoSeoCredentials }` | `IVideoEntity` |
| `updatevideotags.action.ts` | `{ id: string; data: IUpdateVideoTagsCredentials }` | `ITagEntity[]` |
| `scheduleshoot.action.ts` | `{ id: string; data: IScheduleShootCredentials }` | `IVideoEntity` |

---

## Models

**Path:** `src/modules/videos/presentation/model/`

| File | Fields |
| --- | --- |
| `IVideosQueryParams.ts` | `page: number; limit: number; status?: EContentStatus; search?: string` |
| `ICreateVideoCredentials.ts` | `categoryId: string; title: string; slug: string; description: string; customerId?: string; orderItemId?: string; shootingScheduledAt?: string` |
| `IUpdateVideoCredentials.ts` | `categoryId: string; title: string; description: string` |
| `IRejectVideoCredentials.ts` | `rejectionReason: string` |
| `IUploadVideoThumbnailCredentials.ts` | `file: File` |
| `IAttachYoutubeUrlCredentials.ts` | `youtubeVideoUrl: string` |
| `IUpdateVideoSeoCredentials.ts` | `metaTitle: string; metaDescription: string` |
| `IUpdateVideoTagsCredentials.ts` | `tagIds: string[]` |
| `IScheduleShootCredentials.ts` | `shootingScheduledAt: string` (ISO date string) |

---

## Multi-Step Creation Wizard

Video creation uses a **stepper wizard** (Ant Design `Steps`) because the backend requires multiple sequential API calls. The `POST /admin/videos` creates a draft with basic info — YouTube ID, thumbnail, tags, and SEO are filled via subsequent endpoints.

### Steps

| Step | Title | Fields | API Calls |
| --- | --- | --- | --- |
| 1 | Informations | Catégorie, titre, slug, description, client (opt), commande (opt) | `POST /admin/videos` → returns `videoId` |
| 2 | YouTube & Média | ID YouTube, miniature (upload), date de tournage | `PATCH /admin/videos/{id}/youtube` + `POST /admin/videos/{id}/thumbnail` + `PATCH /admin/videos/{id}/shoot` |
| 3 | Tags & SEO | Sélection de tags, titre SEO (max 70), description SEO (max 160) | `PUT /admin/videos/{id}/tags` + `PATCH /admin/videos/{id}/seo` |
| 4 | Résumé | Aperçu en lecture seule de toutes les informations | `PATCH /admin/videos/{id}/submit` (bouton Soumettre) |

### Flow

1. **Step 1** creates the draft via `POST`. Description is required at this step (unlike articles). The returned `videoId` is stored in wizard state.
2. **Step 2** attaches the YouTube ID via `PATCH /youtube` (auto-downloads thumbnail from YouTube to Cloudinary). The user can optionally upload a custom thumbnail via `POST /thumbnail` and schedule a shoot date via `PATCH /shoot`. The YouTube ID is **required before publish** — the domain hard-gates on it.
3. **Step 3** assigns tags via `PUT /tags` and sets SEO via `PATCH /seo`. Both are optional.
4. **Step 4** shows a read-only summary. The "Soumettre" button dispatches `submitVideoAction`.

### B2B Fields

Same as articles — `customerId` and `orderItemId` are paired. When set, the video is linked to a B2B customer order.

### Hook: `UseCreateVideoWizard`

Manages the entire wizard lifecycle:

- `currentStep: number` — active step index (0–3)
- `videoId: string | null` — set after step 1 completes
- `step1Form: FormInstance<ICreateVideoCredentials>` — step 1 form
- `youtubeForm: FormInstance<IAttachYoutubeUrlCredentials>` — step 2 YouTube form
- `shootForm: FormInstance<IScheduleShootCredentials>` — step 2 shoot form
- `seoForm: FormInstance<IUpdateVideoSeoCredentials>` — step 3 SEO form
- `tagIds: string[]` — step 3 tag selection
- `loading: boolean` — current step submission loading
- `error: Failure | null` — current step error
- `onNext()` — validates current step, dispatches API call, advances
- `onPrev()` — goes back one step
- `onSubmit()` — final submission (step 4)
- `resetWizard()` — resets all state

### Wizard Components

| Component | Purpose |
| --- | --- |
| `VideoCreateWizard` | Orchestrates the `Steps` component and renders the active step form |
| `VideoCreateStep1Form` | Category, title, slug, description, customer/order item fields |
| `VideoMediaStep` | YouTube ID input, thumbnail upload, shoot date picker |
| `VideoCreateSummary` | Read-only preview of all entered data with submit button |

---

## Validators

**Path:** `src/modules/videos/presentation/utils/validators/`

### `videos.content.validator.ts`

```ts
export const VideosContentValidator = {
    categoryId: (label: string) => [required(label)],
    title: (label: string) => [required(label), max(label, 200)],
    description: (label: string) => [required(label), max(label, 2000)],
};
```

### `videos.seo.validator.ts`

```ts
export const VideosSeoValidator = {
    metaTitle: (label: string) => [required(label), max(label, 70)],
    metaDescription: (label: string) => [required(label), max(label, 160)],
};
```

### `videos.reject.validator.ts`

```ts
export const VideosRejectValidator = {
    rejectionReason: (label: string) => [required(label), max(label, 500)],
};
```

### `videos.youtube.validator.ts`

```ts
export const VideosYoutubeValidator = {
    youtubeVideoUrl: (label: string) => [required(label), max(label, 20)],
};
```

### `videos.shoot.validator.ts`

```ts
export const VideosShootValidator = {
    shootingScheduledAt: (label: string) => [required(label)], // DatePicker value
};
```

---

## Notifications

**Path:** `src/modules/videos/presentation/utils/notification/`

### `videos.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Vidéo créée" | "La vidéo a été créée avec succès." |
| `updateSuccess` | "Vidéo modifiée" | "La vidéo a été modifiée avec succès." |
| `submitSuccess` | "Vidéo soumise" | "La vidéo a été soumise pour revue." |
| `approveSuccess` | "Vidéo approuvée" | "La vidéo a été approuvée avec succès." |
| `publishSuccess` | "Vidéo publiée" | "La vidéo a été publiée avec succès." |
| `rejectSuccess` | "Vidéo rejetée" | "La vidéo a été rejetée." |
| `archiveSuccess` | "Vidéo archivée" | "La vidéo a été archivée avec succès." |
| `deleteSuccess` | "Vidéo supprimée" | "La vidéo a été supprimée définitivement." |
| `uploadThumbnailSuccess` | "Miniature uploadée" | "La miniature a été uploadée avec succès." |
| `attachYoutubeSuccess` | "YouTube associé" | "L'identifiant YouTube a été associé avec succès." |
| `updateSeoSuccess` | "SEO mis à jour" | "Les informations SEO ont été mises à jour." |
| `updateTagsSuccess` | "Tags mis à jour" | "Les tags de la vidéo ont été mis à jour." |
| `scheduleShootSuccess` | "Tournage planifié" | "Le tournage a été planifié avec succès." |

---

## Constants

**Path:** `src/modules/videos/presentation/constants/`

### `videos.dropdown.ts`

| Action | Label | Hidden condition |
| --- | --- | --- |
| `edit` | "Modifier" | `!isAdminOrSuperAdmin` |
| `seo` | "Modifier le SEO" | `!isAdminOrSuperAdmin` |
| `tags` | "Modifier les tags" | `!isAdminOrSuperAdmin` |
| `thumbnail` | "Changer la miniature" | `!isAdminOrSuperAdmin` |
| `shoot` | "Planifier le tournage" | `!isAdminOrSuperAdmin` |
| `youtube` | "Associer YouTube" | `!isAdmin` (AdminOnly) |
| `submit` | "Soumettre" | `!isSuperAdmin \|\| status !== Draft` |
| `approve` | "Approuver" | `!isSuperAdmin \|\| status !== PendingReview` |
| `publish` | "Publier" | `!isSuperAdmin \|\| status !== Approved` |
| `reject` | "Rejeter" | `!isSuperAdmin \|\| status not in [PendingReview, Approved]` |
| `archive` | "Archiver" | `!isSuperAdmin \|\| status not in [Published, Rejected]` |
| `delete` | "Supprimer" | `!isSuperAdmin` |

> The `youtube` action is restricted to AdminOnly (not SuperAdmin). SuperAdmins do not see this action.

### `videos.workflow.config.ts`

| Action | Title | Danger |
| --- | --- | --- |
| `submit` | "Soumettre la vidéo" | `false` |
| `approve` | "Approuver la vidéo" | `false` |
| `publish` | "Publier la vidéo" | `false` |
| `reject` | "Rejeter la vidéo" | `true` |
| `archive` | "Archiver la vidéo" | `false` |
| `delete` | "Supprimer la vidéo" | `true` |

### `videos.status.ts`

Same status options as articles:

| Value | Label |
| --- | --- |
| `all` | "Tous" |
| `Draft` | "Brouillon" |
| `PendingPayment` | "paiement en cours" |
| `PendingReview` | "En attente de revue" |
| `Approved` | "Approuvé" |
| `Published` | "Publié" |
| `Rejected` | "Rejeté" |
| `Archived` | "Archivé" |

---

## Hooks

**Path:** `src/modules/videos/presentation/hooks/`

### `UseVideosList.ts`

- Dispatches `getVideosAction(params)` with server-side pagination
- Manages `page`, `limit`, `statusFilter`, `search` state
- Exposes: `items`, `total`, `loading`, `error`, `page`, `limit`, `statusFilter`, `search`, `onPageChange`, `onStatusFilterChange`, `onSearch`, `reload`

### `UseVideoDetail.ts`

- Dispatches `getVideoByIdAction(id)` on mount or id change
- Exposes: `video`, `loading`, `error`, `reload`

### `UseVideoWorkflow.ts`

- Handles all 6 workflow transitions: submit, approve, publish, reject, archive, delete
- Exposes: `loading`, `error`, `onSubmit`, `onApprove`, `onPublish`, `onReject`, `onArchive`, `onDelete`

### `UseCreateVideoWizard.ts`

- Manages multi-step wizard state (see "Multi-Step Creation Wizard" section above)
- Exposes: `currentStep`, `videoId`, `step1Form`, `youtubeForm`, `shootForm`, `seoForm`, `tagIds`, `onTagsChange`, `loading`, `error`, `onNext`, `onPrev`, `onSubmit`, `resetWizard`

### `UseUpdateVideo.ts`

- `useForm<IUpdateVideoCredentials>()`
- Pre-populates form when `selectedVideo` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetUpdate`

### `UseUploadVideoThumbnail.ts`

- Manages file upload state
- `onUpload(id, file)` → dispatch `uploadVideoThumbnailAction` → show notification
- Exposes: `loading`, `error`, `onUpload`

### `UseAttachYoutubeVideoUrl.ts`

- `useForm<IAttachYoutubeUrlCredentials>()`
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetYoutube`

### `UseUpdateVideoSeo.ts`

- `useForm<IUpdateVideoSeoCredentials>()`
- Pre-populates when `selectedVideo` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetSeo`

### `UseUpdateVideoTags.ts`

- Manages `tagIds: string[]` state
- Pre-populates from `selectedVideo.tags`
- Exposes: `tagIds`, `onTagsChange`, `loading`, `error`, `success`, `onSubmit`, `resetTags`

### `UseScheduleShoot.ts`

- `useForm<IScheduleShootCredentials>()`
- Pre-populates `shootingScheduledAt` if already set on the video
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetShoot`

### `UseRejectVideo.ts`

- `useForm<IRejectVideoCredentials>()`
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetReject`

---

## Components

**Path:** `src/modules/videos/presentation/components/`

### `forms/VideoCreateStep1Form/index.tsx`

Step 1 of the creation wizard — draft shell:

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `categoryId` | Catégorie | `CategorySelect` (shared) | required |
| `title` | Titre | `Input` | required, max 200 |
| `slug` | Slug | `Input` | required, max 250 |
| `description` | Description | `TextArea` | required, max 2000 |
| `customerId` | Client | `CustomerSelect` (shared) | optional, paired with `orderItemId` |
| `orderItemId` | Commande | `OrderItemSelect` | optional, paired with `customerId` |

### `forms/VideoContentForm/index.tsx`

Used for editing existing videos (not creation step 1):

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `categoryId` | Catégorie | `CategorySelect` (shared) | required |
| `title` | Titre | `Input` | required, max 200 |
| `description` | Description | `TextArea` | required, max 2000 |

### `forms/VideoSeoForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `metaTitle` | Titre SEO | `Input` | required, max 70 |
| `metaDescription` | Description SEO | `TextArea` | required, max 160 |

### `forms/VideoTagsForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `tagIds` | Tags | `TagMultiSelect` (shared) | optional |

### `forms/VideoRejectForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `rejectionReason` | Raison du rejet | `TextArea` | required, max 500 |

### `forms/YoutubeIdForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `youtubeVideoUrl` | Identifiant YouTube | `Input` | required, max 20 |

Displays a helper hint: "Saisir uniquement l'identifiant (ex: dQw4w9WgXcQ), pas l'URL complète."

### `forms/ShootScheduleForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `shootingScheduledAt` | Date de tournage | `DateTimePicker` | required |

### `tables/VideosTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Titre | `title` | Yes | `<Text strong>` |
| Catégorie | `categoryName` | Yes | `<Text>` |
| YouTube | `youtubeVideoUrl` | No | link icon if set |
| Statut | `status` | Yes | `<ContentStatusTag>` |
| En vedette | `isFeatured` | Yes | `<BooleanTag>` |
| Paroles | `hasLyrics` | No | `<BooleanTag>` |
| Publié le | `publishedAt` | Yes | `dayjs().format()` |
| Modifié le | `updatedAt` | Yes | `dayjs().format()` |
| Actions | — | No | `<TableActionDropdown>` |

### `ui/VideoWorkflowModal/index.tsx`

Same pattern as `ArticleWorkflowModal`. Renders rejection form when `action === "reject"`.

### `ui/VideoSeoModal/index.tsx`

Modal wrapping `VideoSeoForm`.

### `ui/VideoTagsModal/index.tsx`

Modal wrapping `VideoTagsForm`.

### `ui/VideoThumbnailUploadModal/index.tsx`

Modal with file upload input (image files only). Calls `onUpload` on submit.

### `ui/YoutubeUrlModal/index.tsx`

Modal wrapping `YoutubeIdForm`. AdminOnly — guard rendering on role check.

### `ui/ShootScheduleModal/index.tsx`

Modal wrapping `ShootScheduleForm`.

### `ui/VideoCreateWizard/index.tsx`

Orchestrates the multi-step creation flow using Ant Design `Steps`. Renders the active step form and navigation buttons (Précédent / Suivant / Soumettre). See "Multi-Step Creation Wizard" section for details.

### `ui/VideoMediaStep/index.tsx`

Step 2 of the creation wizard — YouTube ID input, thumbnail upload, shoot date picker. All three sub-forms are displayed together in one step.

### `ui/VideoCreateSummary/index.tsx`

Read-only preview of all entered data (step 4). Displays category, title, slug, description, YouTube embed preview, thumbnail, tags, SEO fields. Includes the final "Soumettre" button.

---

## Containers and Pages

**Path:** `src/modules/videos/presentation/`

### `containers/VideosListContainer/index.tsx`

```
PageHeader (title="Vidéos", subtitle="Gérer les vidéos", icon, onCreate)
TableToolbar (statusFilter, search input)
Table (dataSource=items, columns, server-side pagination)
VideoCreateWizard (modal/drawer) — multi-step creation flow
CreateEditModal (edit) — VideoContentForm
VideoWorkflowModal — conditional per workflow action
VideoSeoModal
VideoTagsModal
VideoThumbnailUploadModal
YoutubeUrlModal — AdminOnly
ShootScheduleModal
```

French labels:
- Page title: "Vidéos"
- Subtitle: "Gérer les vidéos éditoriales"
- Create button: "Créer une vidéo"
- Create modal title: "Créer une vidéo"
- Edit modal title: "Modifier la vidéo"

### `pages/VideosPage/index.tsx`

```tsx
const VideosPage: FC = () => (
    <div className={styles.page}>
        <title>{`Vidéos | ${APP_NAME}`}</title>
        <VideosListContainer />
    </div>
);
```

---

## TODO

### Domain
- [ ] Create `IVideoEntity.ts` with JSDoc
- [ ] Create `IVideoSummaryEntity.ts` with JSDoc

### Repository Port
- [ ] Create `videos.repository.port.ts` with JSDoc on interface and every method

### Use Cases
- [ ] Create all 15 use case files with JSDoc

### Infrastructure
- [ ] Create `videos.mapper.ts` with JSDoc
- [ ] Create `videos.repository.impl.ts` with JSDoc
- [ ] Create `videos.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`

### Redux Store
- [ ] Create `constants.ts`
- [ ] Create `type.ts`
- [ ] Create `state.ts`
- [ ] Create all 15 action files
- [ ] Create `index.ts` (slice)
- [ ] Wire into `root.reducer.ts`
- [ ] Wire into `service.locator.ts`

### Models
- [ ] Create all 9 model/credential interface files with JSDoc

### Validators
- [ ] Create `videos.content.validator.ts` with JSDoc
- [ ] Create `videos.seo.validator.ts` with JSDoc
- [ ] Create `videos.reject.validator.ts` with JSDoc
- [ ] Create `videos.youtube.validator.ts` with JSDoc
- [ ] Create `videos.shoot.validator.ts` with JSDoc

### Notifications
- [ ] Create `videos.notification.ts` with JSDoc

### Constants
- [ ] Create `videos.dropdown.ts` with JSDoc
- [ ] Create `videos.workflow.config.ts` with JSDoc
- [ ] Create `videos.status.ts` with JSDoc

### Hooks
- [ ] Create `UseVideosList.ts` with JSDoc
- [ ] Create `UseVideoDetail.ts` with JSDoc
- [ ] Create `UseVideoWorkflow.ts` with JSDoc
- [ ] Create `UseCreateVideoWizard.ts` with JSDoc
- [ ] Create `UseUpdateVideo.ts` with JSDoc
- [ ] Create `UseUploadVideoThumbnail.ts` with JSDoc
- [ ] Create `UseAttachYoutubeVideoUrl.ts` with JSDoc
- [ ] Create `UseUpdateVideoSeo.ts` with JSDoc
- [ ] Create `UseUpdateVideoTags.ts` with JSDoc
- [ ] Create `UseScheduleShoot.ts` with JSDoc
- [ ] Create `UseRejectVideo.ts` with JSDoc

### Components
- [ ] Create `VideoCreateWizard` with JSDoc
- [ ] Create `VideoCreateStep1Form` with JSDoc
- [ ] Create `VideoMediaStep` with JSDoc
- [ ] Create `VideoCreateSummary` with JSDoc
- [ ] Create `VideoContentForm` with JSDoc
- [ ] Create `VideoSeoForm` with JSDoc
- [ ] Create `VideoTagsForm` with JSDoc
- [ ] Create `VideoRejectForm` with JSDoc
- [ ] Create `YoutubeIdForm` with JSDoc
- [ ] Create `ShootScheduleForm` with JSDoc
- [ ] Create `VideosTable/columns.tsx` with JSDoc
- [ ] Create `VideoWorkflowModal` with JSDoc
- [ ] Create `VideoSeoModal` with JSDoc
- [ ] Create `VideoTagsModal` with JSDoc
- [ ] Create `VideoThumbnailUploadModal` with JSDoc
- [ ] Create `YoutubeUrlModal` with JSDoc
- [ ] Create `ShootScheduleModal` with JSDoc

### Containers and Pages
- [ ] Create `VideosListContainer` with JSDoc
- [ ] Create `VideosPage` with JSDoc
- [ ] Create `VideosPage/index.module.scss`
