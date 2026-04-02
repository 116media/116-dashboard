# Phase 4: Shorts Module Spec

Full spec for the shorts module — 7 admin endpoints with a simple activate/deactivate lifecycle (no editorial workflow).

**Module path:** `src/modules/shorts/`

---

## Endpoints Reference

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/shorts` | SuperAdminOnly | Créer un short |
| PATCH | `/api/v1/admin/shorts/{id}/activate` | SuperAdminOnly | Activer |
| PATCH | `/api/v1/admin/shorts/{id}/deactivate` | SuperAdminOnly | Désactiver |
| DELETE | `/api/v1/admin/shorts/{id}` | SuperAdminOnly | Supprimer définitivement |
| POST | `/api/v1/admin/shorts/{id}/thumbnail` | AdminOrSuperAdmin | Téléverser la vignette |
| GET | `/api/v1/admin/shorts` | AdminOrSuperAdmin | Lister tous les shorts |
| GET | `/api/v1/admin/shorts/{id}` | AdminOrSuperAdmin | Obtenir par identifiant |

> Shorts have no editorial workflow. They are either active or inactive. No `status` field — only `isActive: boolean`.

---

## Repository Port

**File:** `src/modules/shorts/application/repositories/shorts.repository.port.ts`

```ts
interface IShortsRepositoryPort {
    getAllShorts(params: IShortsQueryParams): Promise<Result<IPaginatedResult<IShortVideoEntity>>>;
    getShortById(id: string): Promise<Result<IShortVideoEntity>>;
    createShort(data: ICreateShortCredentials): Promise<Result<IShortVideoEntity>>;
    activateShort(id: string): Promise<Result<IShortVideoEntity>>;
    deactivateShort(id: string): Promise<Result<IShortVideoEntity>>;
    deleteShort(id: string): Promise<Result<void>>;
    uploadShortThumbnail(id: string, data: IUploadShortThumbnailCredentials): Promise<Result<IShortVideoEntity>>;
}
```

---

## Use Cases

**Path:** `src/modules/shorts/application/usecases/`

| File | Input | Output |
| --- | --- | --- |
| `getallshorts.usecase.ts` | `IShortsQueryParams` | `IPaginatedResult<IShortVideoEntity>` |
| `getshortbyid.usecase.ts` | `string` (id) | `IShortVideoEntity` |
| `createshort.usecase.ts` | `ICreateShortCredentials` | `IShortVideoEntity` |
| `activateshort.usecase.ts` | `string` (id) | `IShortVideoEntity` |
| `deactivateshort.usecase.ts` | `string` (id) | `IShortVideoEntity` |
| `deleteshort.usecase.ts` | `string` (id) | `void` |
| `uploadshorthThumbnail.usecase.ts` | `{ id: string; data: IUploadShortThumbnailCredentials }` | `IShortVideoEntity` |

---

## Infrastructure

**Path:** `src/modules/shorts/infrastructure/`

### Mapper

**File:** `mappers/shorts.mapper.ts`

```ts
export const ShortsMapper = {
    shortFromDto(dto: ShortVideoDto): IShortVideoEntity,
} as const;
```

### Repository Implementation

**File:** `repositories/shorts.repository.impl.ts`

#### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `getAllShorts` | `apiClient.api.adminGetAllShorts(params)` |
| `getShortById` | `apiClient.api.adminGetShortById(id)` |
| `createShort` | `apiClient.api.adminCreateShort(data)` |
| `activateShort` | `apiClient.api.adminActivateShort(id)` |
| `deactivateShort` | `apiClient.api.adminDeactivateShort(id)` |
| `deleteShort` | `apiClient.api.adminDeleteShort(id)` |
| `uploadShortThumbnail` | `apiClient.api.adminUploadShortThumbnail(id, data)` |

> Verify all generated API method names against `116.api.ts` before implementing.

### DI Registration

**File:** `dependencies/shorts.dependencies.ts`

```ts
export function registerShortsDependencies(container: AwilixContainer): void {
    container.register({
        shortsRepository: asClass(ShortsRepositoryImpl).singleton(),

        getAllShortsUseCase: asClass(GetAllShortsUseCase).transient(),
        getShortByIdUseCase: asClass(GetShortByIdUseCase).transient(),
        createShortUseCase: asClass(CreateShortUseCase).transient(),
        activateShortUseCase: asClass(ActivateShortUseCase).transient(),
        deactivateShortUseCase: asClass(DeactivateShortUseCase).transient(),
        deleteShortUseCase: asClass(DeleteShortUseCase).transient(),
        uploadShortThumbnailUseCase: asClass(UploadShortThumbnailUseCase).transient(),
    });
}
```

---

## Redux Store

**Path:** `src/modules/shorts/presentation/store/`

### `constants.ts`

```ts
export const ActionType = {
    GetShorts: "shorts/getShorts",
    GetShortById: "shorts/getShortById",
    CreateShort: "shorts/createShort",
    ActivateShort: "shorts/activateShort",
    DeactivateShort: "shorts/deactivateShort",
    DeleteShort: "shorts/deleteShort",
    UploadShortThumbnail: "shorts/uploadShortThumbnail",
} as const;

export const SliceName = { Shorts: "shorts" } as const;
```

### `type.ts`

```ts
type IShortsState = {
    getShorts: IBasicInitialState<IPaginatedResult<IShortVideoEntity>>;
    getShortById: IBasicInitialState<IShortVideoEntity>;
    createShort: IBasicInitialState<IShortVideoEntity>;
    activateShort: IBasicInitialState<IShortVideoEntity>;
    deactivateShort: IBasicInitialState<IShortVideoEntity>;
    deleteShort: IBasicInitialState<void>;
    uploadShortThumbnail: IBasicInitialState<IShortVideoEntity>;
};
```

### Action Files (7 files)

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `getshorts.action.ts` | `IShortsQueryParams` | `IPaginatedResult<IShortVideoEntity>` |
| `getshortbyid.action.ts` | `string` | `IShortVideoEntity` |
| `createshort.action.ts` | `ICreateShortCredentials` | `IShortVideoEntity` |
| `activateshort.action.ts` | `string` | `IShortVideoEntity` |
| `deactivateshort.action.ts` | `string` | `IShortVideoEntity` |
| `deleteshort.action.ts` | `string` | `void` |
| `uploadshortthumbnail.action.ts` | `{ id: string; data: IUploadShortThumbnailCredentials }` | `IShortVideoEntity` |

---

## Models

**Path:** `src/modules/shorts/presentation/model/`

| File | Fields |
| --- | --- |
| `IShortsQueryParams.ts` | `page: number; limit: number; isActive?: boolean; search?: string` |
| `ICreateShortCredentials.ts` | `title: string; videoUrl: string; hasFullVideo?: boolean` |
| `IUploadShortThumbnailCredentials.ts` | `file: File` |

> Shorts have no update endpoint — once created, only the thumbnail can be changed, and the status toggled.

---

## Validators

**Path:** `src/modules/shorts/presentation/utils/validators/`

### `shorts.content.validator.ts`

```ts
export const ShortsContentValidator = {
    title: (label: string) => [required(label), max(label, 200)],
    videoUrl: (label: string) => [required(label), url(label)],
};
```

---

## Notifications

**Path:** `src/modules/shorts/presentation/utils/notification/`

### `shorts.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Short créé" | "Le short a été créé avec succès." |
| `activateSuccess` | "Short activé" | "Le short a été activé avec succès." |
| `deactivateSuccess` | "Short désactivé" | "Le short a été désactivé avec succès." |
| `deleteSuccess` | "Short supprimé" | "Le short a été supprimé définitivement." |
| `uploadThumbnailSuccess` | "Vignette téléversée" | "La vignette a été téléversée avec succès." |

---

## Constants

**Path:** `src/modules/shorts/presentation/constants/`

### `shorts.dropdown.ts`

| Action | Label | Hidden condition |
| --- | --- | --- |
| `thumbnail` | "Changer la vignette" | `!isAdminOrSuperAdmin` |
| `activate` | "Activer" | `!isSuperAdmin \|\| record.isActive` |
| `deactivate` | "Désactiver" | `!isSuperAdmin \|\| !record.isActive` |
| `delete` | "Supprimer" | `!isSuperAdmin` |

> Shorts have no edit action — the backend provides no update endpoint.

### `shorts.config.ts`

Config for action confirmation modals:

| Action | Title | Danger |
| --- | --- | --- |
| `activate` | "Activer le short" | `false` |
| `deactivate` | "Désactiver le short" | `false` |
| `delete` | "Supprimer le short" | `true` |

### `shorts.status.ts`

Filter options for the active state filter:

| Value | Label |
| --- | --- |
| `all` | "Tous" |
| `active` | "Actifs" |
| `inactive` | "Inactifs" |

---

## Hooks

**Path:** `src/modules/shorts/presentation/hooks/`

### `UseShortsList.ts`

- Dispatches `getShortsAction(params)` with server-side pagination
- Manages `page`, `limit`, `activeFilter`, `search` state
- Exposes: `items`, `total`, `loading`, `error`, `page`, `limit`, `activeFilter`, `search`, `onPageChange`, `onActiveFilterChange`, `onSearch`, `reload`

### `UseShortActions.ts`

- Handles activate, deactivate, delete
- Each action: dispatch → show notification → reload list
- Exposes: `loading`, `error`, `onActivate`, `onDeactivate`, `onDelete`

### `UseCreateShort.ts`

- `useForm<ICreateShortCredentials>()`
- `onSubmit` → dispatch `createShortAction` → set success
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

### `UseUploadShortThumbnail.ts`

- Manages file upload state
- `onUpload(id, file)` → dispatch `uploadShortThumbnailAction` → show notification
- Exposes: `loading`, `error`, `onUpload`

---

## Components

**Path:** `src/modules/shorts/presentation/components/`

### `forms/ShortContentForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `title` | Titre | `Input` | required, max 200 |
| `videoUrl` | URL de la vidéo | `Input` | required, url format |
| `hasFullVideo` | Vidéo complète disponible | `Switch` | optional (default: false) |

### `tables/ShortsTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Titre | `title` | Yes | `<Text strong>` |
| Statut | `isActive` | Yes | `<StatusTag>` |
| Vidéo complète | `hasFullVideo` | No | `<BooleanTag>` |
| Vues | `viewCount` | Yes | formatted number |
| Likes | `likeCount` | Yes | formatted number |
| Modifié le | `updatedAt` | Yes | `dayjs().format()` |
| Actions | — | No | `<TableActionDropdown>` |

### `ui/ShortActionModal/index.tsx`

Confirmation modal for activate, deactivate, and delete actions. Imports config from `shorts.config.ts`.

### `ui/ShortThumbnailUploadModal/index.tsx`

Modal with file upload input (image files only). Calls `onUpload` on submit.

---

## Containers and Pages

**Path:** `src/modules/shorts/presentation/`

### `containers/ShortsListContainer/index.tsx`

```
PageHeader (title="Shorts", subtitle="Gérer les vidéos courtes", icon, onCreate)
TableToolbar (activeFilter, search input)
Table (dataSource=items, columns, server-side pagination)
CreateEditModal (create) — ShortContentForm (no edit modal — no update endpoint)
ShortActionModal — conditional per action
ShortThumbnailUploadModal
```

French labels:
- Page title: "Shorts"
- Subtitle: "Gérer les vidéos courtes"
- Create button: "Créer un short"
- Create modal title: "Créer un short"

> There is no edit modal. The `edit` action does not exist for shorts because the backend provides no PUT/update endpoint.

### `pages/ShortsPage/index.tsx`

```tsx
const ShortsPage: FC = () => (
    <div className={styles.page}>
        <title>{`Shorts | ${APP_NAME}`}</title>
        <ShortsListContainer />
    </div>
);
```

---

## TODO

### Domain
- [ ] Create `IShortVideoEntity.ts` with JSDoc

### Repository Port
- [ ] Create `shorts.repository.port.ts` with JSDoc on interface and every method

### Use Cases
- [ ] Create all 7 use case files with JSDoc

### Infrastructure
- [ ] Create `shorts.mapper.ts` with JSDoc
- [ ] Create `shorts.repository.impl.ts` with JSDoc
- [ ] Create `shorts.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`

### Redux Store
- [ ] Create `constants.ts`
- [ ] Create `type.ts`
- [ ] Create `state.ts`
- [ ] Create all 7 action files
- [ ] Create `index.ts` (slice)
- [ ] Wire into `root.reducer.ts`
- [ ] Wire into `service.locator.ts`

### Models
- [ ] Create `IShortsQueryParams.ts` with JSDoc
- [ ] Create `ICreateShortCredentials.ts` with JSDoc
- [ ] Create `IUploadShortThumbnailCredentials.ts` with JSDoc

### Validators
- [ ] Create `shorts.content.validator.ts` with JSDoc

### Notifications
- [ ] Create `shorts.notification.ts` with JSDoc

### Constants
- [ ] Create `shorts.dropdown.ts` with JSDoc
- [ ] Create `shorts.config.ts` with JSDoc
- [ ] Create `shorts.status.ts` with JSDoc

### Hooks
- [ ] Create `UseShortsList.ts` with JSDoc
- [ ] Create `UseShortActions.ts` with JSDoc
- [ ] Create `UseCreateShort.ts` with JSDoc
- [ ] Create `UseUploadShortThumbnail.ts` with JSDoc

### Components
- [ ] Create `ShortContentForm` with JSDoc
- [ ] Create `ShortsTable/columns.tsx` with JSDoc
- [ ] Create `ShortActionModal` with JSDoc
- [ ] Create `ShortThumbnailUploadModal` with JSDoc

### Containers and Pages
- [ ] Create `ShortsListContainer` with JSDoc
- [ ] Create `ShortsPage` with JSDoc
- [ ] Create `ShortsPage/index.module.scss`
