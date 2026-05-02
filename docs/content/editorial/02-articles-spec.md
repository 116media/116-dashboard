# Phase 2: Articles Module Spec

Full spec for the articles module — 13 admin endpoints with a 7-step editorial workflow.

**Module path:** `src/modules/articles/`

---

## Endpoints Reference

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/articles` | SuperAdminOnly | Créer un brouillon |
| PUT | `/api/v1/admin/articles/{id}` | AdminOrSuperAdmin | Modifier le contenu |
| PATCH | `/api/v1/admin/articles/{id}/submit` | SuperAdminOnly | Soumettre pour revue |
| PATCH | `/api/v1/admin/articles/{id}/approve` | SuperAdminOnly | Approuver |
| PATCH | `/api/v1/admin/articles/{id}/publish` | SuperAdminOnly | Publier |
| PATCH | `/api/v1/admin/articles/{id}/reject` | SuperAdminOnly | Rejeter (avec raison) |
| PATCH | `/api/v1/admin/articles/{id}/archive` | SuperAdminOnly | Archiver |
| DELETE | `/api/v1/admin/articles/{id}` | SuperAdminOnly | Supprimer définitivement |
| POST | `/api/v1/admin/articles/{id}/images` | SuperAdminOnly | Importer une image |
| PATCH | `/api/v1/admin/articles/{id}/seo` | AdminOrSuperAdmin | Mettre à jour le SEO |
| PUT | `/api/v1/admin/articles/{id}/tags` | AdminOrSuperAdmin | Remplacer les tags |
| GET | `/api/v1/admin/articles` | AdminOrSuperAdmin | Lister tous les articles |
| GET | `/api/v1/admin/articles/{id}` | AdminOrSuperAdmin | Obtenir par identifiant |

---

## Repository Port

**File:** `src/modules/articles/application/repositories/articles.repository.port.ts`

```ts
interface IArticlesRepositoryPort {
    getAllArticles(params: IArticlesQueryParams): Promise<Result<IPaginatedResult<IArticleSummaryEntity>>>;
    getArticleById(id: string): Promise<Result<IArticleEntity>>;
    createArticle(data: ICreateArticleCredentials): Promise<Result<IArticleEntity>>;
    updateArticle(id: string, data: IUpdateArticleCredentials): Promise<Result<IArticleEntity>>;
    submitArticle(id: string): Promise<Result<IArticleEntity>>;
    approveArticle(id: string): Promise<Result<IArticleEntity>>;
    publishArticle(id: string): Promise<Result<IArticleEntity>>;
    rejectArticle(id: string, data: IRejectArticleCredentials): Promise<Result<IArticleEntity>>;
    archiveArticle(id: string): Promise<Result<IArticleEntity>>;
    deleteArticle(id: string): Promise<Result<void>>;
    uploadArticleImage(id: string, data: IUploadArticleImageCredentials): Promise<Result<IArticleImageEntity>>;
    updateArticleSeo(id: string, data: IUpdateArticleSeoCredentials): Promise<Result<IArticleEntity>>;
    updateArticleTags(id: string, data: IUpdateArticleTagsCredentials): Promise<Result<ITagEntity[]>>;
}
```

---

## Use Cases

**Path:** `src/modules/articles/application/usecases/`

One use case file per endpoint:

| File | Input | Output |
| --- | --- | --- |
| `getallarticles.usecase.ts` | `IArticlesQueryParams` | `IPaginatedResult<IArticleSummaryEntity>` |
| `getarticlebyid.usecase.ts` | `string` (id) | `IArticleEntity` |
| `createarticle.usecase.ts` | `ICreateArticleCredentials` | `IArticleEntity` |
| `updatearticle.usecase.ts` | `{ id: string; data: IUpdateArticleCredentials }` | `IArticleEntity` |
| `submitarticle.usecase.ts` | `string` (id) | `IArticleEntity` |
| `approvearticle.usecase.ts` | `string` (id) | `IArticleEntity` |
| `publisharticle.usecase.ts` | `string` (id) | `IArticleEntity` |
| `rejectarticle.usecase.ts` | `{ id: string; data: IRejectArticleCredentials }` | `IArticleEntity` |
| `archivearticle.usecase.ts` | `string` (id) | `IArticleEntity` |
| `deletearticle.usecase.ts` | `string` (id) | `void` |
| `uploadarticleimage.usecase.ts` | `{ id: string; data: IUploadArticleImageCredentials }` | `IArticleImageEntity` |
| `updatearticleseo.usecase.ts` | `{ id: string; data: IUpdateArticleSeoCredentials }` | `IArticleEntity` |
| `updatearticletags.usecase.ts` | `{ id: string; data: IUpdateArticleTagsCredentials }` | `ITagEntity[]` |

Pattern (same as other modules):

```ts
export class CreateArticleUseCase implements IResultUseCase<ICreateArticleCredentials, IArticleEntity> {
    private readonly articlesRepository: IArticlesRepositoryPort;

    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }

    async execute(data: ICreateArticleCredentials): Promise<Result<IArticleEntity>> {
        return this.articlesRepository.createArticle(data);
    }
}
```

---

## Infrastructure

**Path:** `src/modules/articles/infrastructure/`

### Mapper

**File:** `mappers/articles.mapper.ts`

```ts
export const ArticlesMapper = {
    articleFromDto(dto: ArticleDetailDto): IArticleEntity,
    articleSummaryFromDto(dto: ArticleSummaryDto): IArticleSummaryEntity,
    articleImageFromDto(dto: ArticleImageDto): IArticleImageEntity,
} as const;
```

### Repository Implementation

**File:** `repositories/articles.repository.impl.ts`

Implements `IArticlesRepositoryPort`. Uses server-side pagination for `getAllArticles`.

#### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `getAllArticles` | `apiClient.api.adminGetAllArticles(params)` |
| `getArticleById` | `apiClient.api.adminGetArticleById(id)` |
| `createArticle` | `apiClient.api.adminCreateArticle(data)` |
| `updateArticle` | `apiClient.api.adminUpdateArticle(id, data)` |
| `submitArticle` | `apiClient.api.adminSubmitArticle(id)` |
| `approveArticle` | `apiClient.api.adminApproveArticle(id)` |
| `publishArticle` | `apiClient.api.adminPublishArticle(id)` |
| `rejectArticle` | `apiClient.api.adminRejectArticle(id, data)` |
| `archiveArticle` | `apiClient.api.adminArchiveArticle(id)` |
| `deleteArticle` | `apiClient.api.adminDeleteArticle(id)` |
| `uploadArticleImage` | `apiClient.api.adminUploadArticleImage(id, data)` |
| `updateArticleSeo` | `apiClient.api.adminUpdateArticleSeo(id, data)` |
| `updateArticleTags` | `apiClient.api.adminUpdateArticleTags(id, data)` |

> Verify all generated API method names against `116.api.ts` before implementing.

### DI Registration

**File:** `dependencies/articles.dependencies.ts`

```ts
export function registerArticlesDependencies(container: AwilixContainer): void {
    container.register({
        articlesRepository: asClass(ArticlesRepositoryImpl).singleton(),

        getAllArticlesUseCase: asClass(GetAllArticlesUseCase).transient(),
        getArticleByIdUseCase: asClass(GetArticleByIdUseCase).transient(),
        createArticleUseCase: asClass(CreateArticleUseCase).transient(),
        updateArticleUseCase: asClass(UpdateArticleUseCase).transient(),
        submitArticleUseCase: asClass(SubmitArticleUseCase).transient(),
        approveArticleUseCase: asClass(ApproveArticleUseCase).transient(),
        publishArticleUseCase: asClass(PublishArticleUseCase).transient(),
        rejectArticleUseCase: asClass(RejectArticleUseCase).transient(),
        archiveArticleUseCase: asClass(ArchiveArticleUseCase).transient(),
        deleteArticleUseCase: asClass(DeleteArticleUseCase).transient(),
        uploadArticleImageUseCase: asClass(UploadArticleImageUseCase).transient(),
        updateArticleSeoUseCase: asClass(UpdateArticleSeoUseCase).transient(),
        updateArticleTagsUseCase: asClass(UpdateArticleTagsUseCase).transient(),
    });
}
```

---

## Redux Store

**Path:** `src/modules/articles/presentation/store/`

### `constants.ts`

```ts
export const ActionType = {
    GetArticles: "articles/getArticles",
    GetArticleById: "articles/getArticleById",
    CreateArticle: "articles/createArticle",
    UpdateArticle: "articles/updateArticle",
    SubmitArticle: "articles/submitArticle",
    ApproveArticle: "articles/approveArticle",
    PublishArticle: "articles/publishArticle",
    RejectArticle: "articles/rejectArticle",
    ArchiveArticle: "articles/archiveArticle",
    DeleteArticle: "articles/deleteArticle",
    UploadArticleImage: "articles/uploadArticleImage",
    UpdateArticleSeo: "articles/updateArticleSeo",
    UpdateArticleTags: "articles/updateArticleTags",
} as const;

export const SliceName = { Articles: "articles" } as const;
```

### `type.ts`

```ts
type IArticlesState = {
    getArticles: IBasicInitialState<IPaginatedResult<IArticleSummaryEntity>>;
    getArticleById: IBasicInitialState<IArticleEntity>;
    createArticle: IBasicInitialState<IArticleEntity>;
    updateArticle: IBasicInitialState<IArticleEntity>;
    submitArticle: IBasicInitialState<IArticleEntity>;
    approveArticle: IBasicInitialState<IArticleEntity>;
    publishArticle: IBasicInitialState<IArticleEntity>;
    rejectArticle: IBasicInitialState<IArticleEntity>;
    archiveArticle: IBasicInitialState<IArticleEntity>;
    deleteArticle: IBasicInitialState<void>;
    uploadArticleImage: IBasicInitialState<IArticleImageEntity>;
    updateArticleSeo: IBasicInitialState<IArticleEntity>;
    updateArticleTags: IBasicInitialState<ITagEntity[]>;
};
```

### Action Files (13 files)

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `getarticles.action.ts` | `IArticlesQueryParams` | `IPaginatedResult<IArticleSummaryEntity>` |
| `getarticlebyid.action.ts` | `string` | `IArticleEntity` |
| `createarticle.action.ts` | `ICreateArticleCredentials` | `IArticleEntity` |
| `updatearticle.action.ts` | `{ id: string; data: IUpdateArticleCredentials }` | `IArticleEntity` |
| `submitarticle.action.ts` | `string` | `IArticleEntity` |
| `approvearticle.action.ts` | `string` | `IArticleEntity` |
| `publisharticle.action.ts` | `string` | `IArticleEntity` |
| `rejectarticle.action.ts` | `{ id: string; data: IRejectArticleCredentials }` | `IArticleEntity` |
| `archivearticle.action.ts` | `string` | `IArticleEntity` |
| `deletearticle.action.ts` | `string` | `void` |
| `uploadarticleimage.action.ts` | `{ id: string; data: IUploadArticleImageCredentials }` | `IArticleImageEntity` |
| `updatearticleseo.action.ts` | `{ id: string; data: IUpdateArticleSeoCredentials }` | `IArticleEntity` |
| `updatearticletags.action.ts` | `{ id: string; data: IUpdateArticleTagsCredentials }` | `ITagEntity[]` |

---

## Models

**Path:** `src/modules/articles/presentation/model/`

| File | Fields |
| --- | --- |
| `IArticlesQueryParams.ts` | `page: number; limit: number; status?: EContentStatus; search?: string` |
| `ICreateArticleCredentials.ts` | `categoryId: string; title: string; slug: string; customerId?: string; orderItemId?: string` |
| `IUpdateArticleCredentials.ts` | `categoryId: string; title: string; headline: string; body: string` |
| `IRejectArticleCredentials.ts` | `rejectionReason: string` |
| `IUploadArticleImageCredentials.ts` | `file: File; type: EArticleImageType` |
| `IUpdateArticleSeoCredentials.ts` | `metaTitle: string; metaDescription: string` |
| `IUpdateArticleTagsCredentials.ts` | `tagIds: string[]` |

---

## Multi-Step Creation Wizard

Article creation uses a **stepper wizard** (Ant Design `Steps`) because the backend requires multiple sequential API calls. The `POST /admin/articles` endpoint only creates a shell draft — content, images, tags, and SEO are filled via subsequent endpoints.

### Steps

| Step | Title | Fields | API Calls |
| --- | --- | --- | --- |
| 1 | Informations | Catégorie, titre, slug, client (opt), commande (opt) | `POST /admin/articles` → returns `articleId` |
| 2 | Contenu | Sommaire (max 500), contenu (rich text), image de couverture | `PUT /admin/articles/{id}` + `POST /admin/articles/{id}/images` |
| 3 | Tags & SEO | Sélection de tags, titre SEO (max 70), description SEO (max 160) | `PUT /admin/articles/{id}/tags` + `PATCH /admin/articles/{id}/seo` |
| 4 | Résumé | Aperçu en lecture seule de toutes les informations | `PATCH /admin/articles/{id}/submit` (bouton Soumettre) |

### Flow

1. **Step 1** creates the draft via `POST`. The returned `articleId` is stored in wizard state and used by all subsequent steps.
2. **Step 2** fills content via `PUT` and uploads the cover image via `POST /images` (multipart, `imageType: Cover`). Body images are also uploaded here with `imageType: Body`.
3. **Step 3** assigns tags via `PUT /tags` and sets SEO via `PATCH /seo`. Both are optional — the user can skip.
4. **Step 4** shows a read-only summary. The "Soumettre" button dispatches `submitArticleAction` which transitions Draft → PendingPayment (paid) or Draft → PendingReview (free).

### B2B Fields

`customerId` and `orderItemId` are paired — both must be present or both absent. When set, the article is linked to a B2B customer order. The submit step routes to `PendingPayment` instead of `PendingReview`.

### Hook: `UseCreateArticleWizard`

Manages the entire wizard lifecycle:

- `currentStep: number` — active step index (0–3)
- `articleId: string | null` — set after step 1 completes
- `step1Form: FormInstance<ICreateArticleCredentials>` — step 1 form
- `step2Form: FormInstance<IUpdateArticleCredentials>` — step 2 form
- `seoForm: FormInstance<IUpdateArticleSeoCredentials>` — step 3 SEO form
- `tagIds: string[]` — step 3 tag selection
- `loading: boolean` — current step submission loading
- `error: Failure | null` — current step error
- `onNext()` — validates current step, dispatches API call, advances
- `onPrev()` — goes back one step
- `onSubmit()` — final submission (step 4)
- `resetWizard()` — resets all state

### Components

| Component | Purpose |
| --- | --- |
| `ArticleCreateWizard` | Orchestrates the `Steps` component and renders the active step form |
| `ArticleCreateStep1Form` | Category, title, slug, customer/order item fields |
| `ArticleContentForm` | Headline, body (rich text editor), cover image upload (reused for edit) |
| `ArticleSeoForm` | Meta title, meta description (reused for edit) |
| `ArticleTagsForm` | Tag multi-select (reused for edit) |
| `ArticleCreateSummary` | Read-only preview of all entered data with submit button |

---

## Validators

**Path:** `src/modules/articles/presentation/utils/validators/`

### `articles.content.validator.ts`

```ts
export const ArticlesContentValidator = {
    categoryId: (label: string) => [required(label)],
    title: (label: string) => [required(label), max(label, 200)],
    headline: (label: string) => [required(label), max(label, 500)],
    body: (label: string) => [required(label)],   // rich text — validate non-empty HTML
};
```

### `articles.seo.validator.ts`

```ts
export const ArticlesSeoValidator = {
    metaTitle: (label: string) => [required(label), max(label, 70)],
    metaDescription: (label: string) => [required(label), max(label, 160)],
};
```

### `articles.reject.validator.ts`

```ts
export const ArticlesRejectValidator = {
    rejectionReason: (label: string) => [required(label), max(label, 500)],
};
```

---

## Notifications

**Path:** `src/modules/articles/presentation/utils/notification/`

### `articles.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Article créé" | "L'article a été créé avec succès." |
| `updateSuccess` | "Article modifié" | "L'article a été modifié avec succès." |
| `submitSuccess` | "Article soumis" | "L'article a été soumis pour revue." |
| `approveSuccess` | "Article approuvé" | "L'article a été approuvé avec succès." |
| `publishSuccess` | "Article publié" | "L'article a été publié avec succès." |
| `rejectSuccess` | "Article rejeté" | "L'article a été rejeté." |
| `archiveSuccess` | "Article archivé" | "L'article a été archivé avec succès." |
| `deleteSuccess` | "Article supprimé" | "L'article a été supprimé définitivement." |
| `uploadImageSuccess` | "Image uploadée" | "L'image a été uploadée avec succès." |
| `updateSeoSuccess` | "SEO mis à jour" | "Les informations SEO ont été mises à jour." |
| `updateTagsSuccess` | "Tags mis à jour" | "Les tags de l'article ont été mis à jour." |

---

## Constants

**Path:** `src/modules/articles/presentation/constants/`

### `articles.dropdown.ts`

Workflow actions shown in the row action dropdown. Visibility depends on `status` and role:

| Action | Label | Hidden condition |
| --- | --- | --- |
| `edit` | "Modifier" | `!isAdminOrSuperAdmin` |
| `seo` | "Modifier le SEO" | `!isAdminOrSuperAdmin` |
| `tags` | "Modifier les tags" | `!isAdminOrSuperAdmin` |
| `submit` | "Soumettre" | `!isSuperAdmin \|\| status !== Draft` |
| `approve` | "Approuver" | `!isSuperAdmin \|\| status !== PendingReview` |
| `publish` | "Publier" | `!isSuperAdmin \|\| status !== Approved` |
| `reject` | "Rejeter" | `!isSuperAdmin \|\| status not in [PendingReview, Approved]` |
| `archive` | "Archiver" | `!isSuperAdmin \|\| status not in [Published, Rejected]` |
| `upload` | "Importer une image" | `!isSuperAdmin` |
| `delete` | "Supprimer" | `!isSuperAdmin` |

### `articles.workflow.config.ts`

Config for the confirmation modal per workflow action:

| Action | Title | Danger |
| --- | --- | --- |
| `submit` | "Soumettre l'article" | `false` |
| `approve` | "Approuver l'article" | `false` |
| `publish` | "Publier l'article" | `false` |
| `reject` | "Rejeter l'article" | `true` |
| `archive` | "Archiver l'article" | `false` |
| `delete` | "Supprimer l'article" | `true` |

### `articles.status.ts`

Filter options for the status filter select:

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

**Path:** `src/modules/articles/presentation/hooks/`

### `UseArticlesList.ts`

- Dispatches `getArticlesAction(params)` with server-side pagination
- Manages `page`, `limit`, `statusFilter`, `search` state
- Re-fetches when any param changes
- Exposes: `items`, `total`, `loading`, `error`, `page`, `limit`, `statusFilter`, `search`, `onPageChange`, `onStatusFilterChange`, `onSearch`, `reload`

### `UseArticleDetail.ts`

- Dispatches `getArticleByIdAction(id)` on mount or id change
- Exposes: `article`, `loading`, `error`, `reload`

### `UseArticleWorkflow.ts`

- Handles all 6 workflow transitions: submit, approve, publish, reject, archive, delete
- Each action: dispatch → show notification → reload list
- `reject` action requires a `rejectionReason` string
- Exposes: `loading`, `error`, `onSubmit`, `onApprove`, `onPublish`, `onReject`, `onArchive`, `onDelete`

### `UseCreateArticleWizard.ts`

- Manages multi-step wizard state (see "Multi-Step Creation Wizard" section above)
- Exposes: `currentStep`, `articleId`, `step1Form`, `step2Form`, `seoForm`, `tagIds`, `onTagsChange`, `loading`, `error`, `onNext`, `onPrev`, `onSubmit`, `resetWizard`

### `UseUpdateArticle.ts`

- `useForm<IUpdateArticleCredentials>()`
- Pre-populates form and `body` when `selectedArticle` changes
- Exposes: `form`, `body`, `onBodyChange`, `loading`, `error`, `success`, `onSubmit`, `resetUpdate`

### `UseUpdateArticleSeo.ts`

- `useForm<IUpdateArticleSeoCredentials>()`
- Pre-populates when `selectedArticle` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetSeo`

### `UseUpdateArticleTags.ts`

- Manages `tagIds: string[]` state (multi-select)
- Pre-populates from `selectedArticle.tags` when entity changes
- Exposes: `tagIds`, `onTagsChange`, `loading`, `error`, `success`, `onSubmit`, `resetTags`

### `UseUploadArticleImage.ts`

- Manages file upload state
- `onUpload(id, file, type)` → dispatch `uploadArticleImageAction` → show notification
- Exposes: `loading`, `error`, `onUpload`

### `UseRejectArticle.ts`

- `useForm<IRejectArticleCredentials>()`
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetReject`

---

## Components

**Path:** `src/modules/articles/presentation/components/`

### `forms/ArticleCreateStep1Form/index.tsx`

Step 1 of the creation wizard — draft shell:

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `categoryId` | Catégorie | `CategorySelect` (shared) | required |
| `title` | Titre | `Input` | required, max 200 |
| `slug` | Slug | `Input` | required, max 250 |
| `customerId` | Client | `CustomerSelect` (shared) | optional, paired with `orderItemId` |
| `orderItemId` | Commande | `OrderItemSelect` | optional, paired with `customerId` |

### `forms/ArticleContentForm/index.tsx`

Step 2 of the creation wizard and edit form — content fields:

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `headline` | Sommaire | `TextArea` | required, max 500 |
| `body` | Contenu | `RichTextEditor` | required (non-empty HTML) |
| `coverImage` | Image de couverture | `ImageUpload` | optional |

The `body` field uses a rich text editor component (e.g., Tiptap or Quill wrapper). It is controlled separately from the Ant Design form instance.

### `ui/ArticleCreateWizard/index.tsx`

Orchestrates the multi-step creation flow using Ant Design `Steps`. Renders the active step form and navigation buttons (Précédent / Suivant / Soumettre). See "Multi-Step Creation Wizard" section for details.

### `ui/ArticleCreateSummary/index.tsx`

Read-only preview of all entered data (step 4). Displays category, title, slug, headline, body preview, tags, SEO fields. Includes the final "Soumettre" button.

### `forms/ArticleSeoForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `metaTitle` | Titre SEO | `Input` | required, max 70 |
| `metaDescription` | Description SEO | `TextArea` | required, max 160 |

### `forms/ArticleTagsForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `tagIds` | Tags | `TagMultiSelect` (shared) | optional |

The `TagMultiSelect` component loads all tags from the lookup store and renders a multi-select. It accepts `value: string[]` and `onChange: (ids: string[]) => void`.

### `forms/ArticleRejectForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `rejectionReason` | Raison du rejet | `TextArea` | required, max 500 |

### `tables/ArticlesTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Titre | `title` | Yes | `<Text strong>` |
| Catégorie | `categoryName` | Yes | `<Text>` |
| Statut | `status` | Yes | `<ContentStatusTag>` |
| En vedette | `isFeatured` | Yes | `<BooleanTag>` |
| Publié le | `publishedAt` | Yes | `dayjs().format()` |
| Modifié le | `updatedAt` | Yes | `dayjs().format()` |
| Actions | — | No | `<TableActionDropdown>` |

`<ContentStatusTag>` renders a colored badge per `EContentStatus` value.

### `ui/ArticleWorkflowModal/index.tsx`

Confirmation modal for workflow transitions. Accepts `action`, `article`, `onConfirm`, `onCancel`. Renders a rejection reason form when `action === "reject"`.

### `ui/ArticleSeoModal/index.tsx`

Modal wrapping `ArticleSeoForm`. Used from the action dropdown.

### `ui/ArticleTagsModal/index.tsx`

Modal wrapping `ArticleTagsForm`. Used from the action dropdown.

### `ui/ArticleImageUploadModal/index.tsx`

Modal with file upload input and `EArticleImageType` selector. Calls `onUpload` on submit.

---

## Containers and Pages

**Path:** `src/modules/articles/presentation/`

### `containers/ArticlesListContainer/index.tsx`

```
PageHeader (title="Articles", subtitle="Gérer les articles", icon, onCreate)
TableToolbar (statusFilter, search input)
Table (dataSource=items, columns, server-side pagination)
ArticleCreateWizard (modal/drawer) — multi-step creation flow
CreateEditModal (edit) — ArticleContentForm
ArticleWorkflowModal — conditional per workflow action
ArticleSeoModal
ArticleTagsModal
ArticleImageUploadModal
```

French labels:
- Page title: "Articles"
- Subtitle: "Gérer les articles éditoriaux"
- Create button: "Créer un article"
- Create modal title: "Créer un article"
- Edit modal title: "Modifier l'article"

### `pages/ArticlesPage/index.tsx`

```tsx
const ArticlesPage: FC = () => (
    <div className={styles.page}>
        <title>{`Articles | ${APP_NAME}`}</title>
        <ArticlesListContainer />
    </div>
);
```

Each page has a matching `index.module.scss`.

---

## TODO

### Domain
- [ ] Create `IArticleEntity.ts` with JSDoc
- [ ] Create `IArticleSummaryEntity.ts` with JSDoc
- [ ] Create `IArticleImageEntity.ts` with JSDoc

### Repository Port
- [ ] Create `articles.repository.port.ts` with JSDoc on interface and every method

### Use Cases
- [ ] Create all 13 use case files with JSDoc

### Infrastructure
- [ ] Create `articles.mapper.ts` with JSDoc
- [ ] Create `articles.repository.impl.ts` with JSDoc
- [ ] Create `articles.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`

### Redux Store
- [ ] Create `constants.ts`
- [ ] Create `type.ts`
- [ ] Create `state.ts`
- [ ] Create all 13 action files
- [ ] Create `index.ts` (slice)
- [ ] Wire into `root.reducer.ts`
- [ ] Wire into `service.locator.ts`

### Models
- [ ] Create all 7 model/credential interface files with JSDoc

### Validators
- [ ] Create `articles.content.validator.ts` with JSDoc
- [ ] Create `articles.seo.validator.ts` with JSDoc
- [ ] Create `articles.reject.validator.ts` with JSDoc

### Notifications
- [ ] Create `articles.notification.ts` with JSDoc

### Constants
- [ ] Create `articles.dropdown.ts` with JSDoc
- [ ] Create `articles.workflow.config.ts` with JSDoc
- [ ] Create `articles.status.ts` with JSDoc

### Hooks
- [ ] Create `UseArticlesList.ts` with JSDoc
- [ ] Create `UseArticleDetail.ts` with JSDoc
- [ ] Create `UseArticleWorkflow.ts` with JSDoc
- [ ] Create `UseCreateArticleWizard.ts` with JSDoc
- [ ] Create `UseUpdateArticle.ts` with JSDoc
- [ ] Create `UseUpdateArticleSeo.ts` with JSDoc
- [ ] Create `UseUpdateArticleTags.ts` with JSDoc
- [ ] Create `UseUploadArticleImage.ts` with JSDoc
- [ ] Create `UseRejectArticle.ts` with JSDoc

### Components
- [ ] Create `ArticleCreateWizard` with JSDoc
- [ ] Create `ArticleCreateStep1Form` with JSDoc
- [ ] Create `ArticleCreateSummary` with JSDoc
- [ ] Create `ArticleContentForm` with JSDoc
- [ ] Create `ArticleSeoForm` with JSDoc
- [ ] Create `ArticleTagsForm` with JSDoc
- [ ] Create `ArticleRejectForm` with JSDoc
- [ ] Create `ArticlesTable/columns.tsx` with JSDoc
- [ ] Create `ArticleWorkflowModal` with JSDoc
- [ ] Create `ArticleSeoModal` with JSDoc
- [ ] Create `ArticleTagsModal` with JSDoc
- [ ] Create `ArticleImageUploadModal` with JSDoc
- [ ] Create shared `ContentStatusTag` component (used by articles and videos)
- [ ] Create shared `TagMultiSelect` component

### Containers and Pages
- [ ] Create `ArticlesListContainer` with JSDoc
- [ ] Create `ArticlesPage` with JSDoc
- [ ] Create `ArticlesPage/index.module.scss`
