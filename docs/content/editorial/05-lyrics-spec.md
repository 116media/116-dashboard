# Phase 5: Lyrics Module Spec

Full spec for the lyrics module — 4 admin endpoints, the simplest editorial resource. No status workflow, no image uploads, no activation. Lyrics are SEO pages linked to a video or article.

**Module path:** `src/modules/lyrics/`

---

## Endpoints Reference

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/lyrics` | SuperAdminOnly | Créer des paroles |
| PUT | `/api/v1/admin/lyrics/{id}` | AdminOrSuperAdmin | Modifier les paroles |
| PATCH | `/api/v1/admin/lyrics/{id}/seo` | AdminOrSuperAdmin | Mettre à jour le SEO |
| GET | `/api/v1/admin/lyrics` | AdminOrSuperAdmin | Lister toutes les paroles |

> Lyrics have no `getById` admin endpoint, no delete, no status changes. The list endpoint is the only read operation.

---

## Repository Port

**File:** `src/modules/lyrics/application/repositories/lyrics.repository.port.ts`

```ts
interface ILyricsRepositoryPort {
    getAllLyrics(params: ILyricsQueryParams): Promise<Result<IPaginatedResult<ILyricsEntity>>>;
    createLyrics(data: ICreateLyricsCredentials): Promise<Result<ILyricsEntity>>;
    updateLyrics(id: string, data: IUpdateLyricsCredentials): Promise<Result<ILyricsEntity>>;
    updateLyricsSeo(id: string, data: IUpdateLyricsSeoCredentials): Promise<Result<ILyricsEntity>>;
}
```

---

## Use Cases

**Path:** `src/modules/lyrics/application/usecases/`

| File | Input | Output |
| --- | --- | --- |
| `getalllYrics.usecase.ts` | `ILyricsQueryParams` | `IPaginatedResult<ILyricsEntity>` |
| `createlyrics.usecase.ts` | `ICreateLyricsCredentials` | `ILyricsEntity` |
| `updatelyrics.usecase.ts` | `{ id: string; data: IUpdateLyricsCredentials }` | `ILyricsEntity` |
| `updatelyricseo.usecase.ts` | `{ id: string; data: IUpdateLyricsSeoCredentials }` | `ILyricsEntity` |

---

## Infrastructure

**Path:** `src/modules/lyrics/infrastructure/`

### Mapper

**File:** `mappers/lyrics.mapper.ts`

```ts
export const LyricsMapper = {
    lyricsFromDto(dto: LyricsDto): ILyricsEntity,
} as const;
```

### Repository Implementation

**File:** `repositories/lyrics.repository.impl.ts`

#### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `getAllLyrics` | `apiClient.api.adminGetAllLyrics(params)` |
| `createLyrics` | `apiClient.api.adminCreateLyrics(data)` |
| `updateLyrics` | `apiClient.api.adminUpdateLyrics(id, data)` |
| `updateLyricsSeo` | `apiClient.api.adminUpdateLyricsSeo(id, data)` |

> Verify all generated API method names against `116.api.ts` before implementing.

### DI Registration

**File:** `dependencies/lyrics.dependencies.ts`

```ts
export function registerLyricsDependencies(container: AwilixContainer): void {
    container.register({
        lyricsRepository: asClass(LyricsRepositoryImpl).singleton(),

        getAllLyricsUseCase: asClass(GetAllLyricsUseCase).transient(),
        createLyricsUseCase: asClass(CreateLyricsUseCase).transient(),
        updateLyricsUseCase: asClass(UpdateLyricsUseCase).transient(),
        updateLyricsSeoUseCase: asClass(UpdateLyricsSeoUseCase).transient(),
    });
}
```

---

## Redux Store

**Path:** `src/modules/lyrics/presentation/store/`

### `constants.ts`

```ts
export const ActionType = {
    GetLyrics: "lyrics/getLyrics",
    CreateLyrics: "lyrics/createLyrics",
    UpdateLyrics: "lyrics/updateLyrics",
    UpdateLyricsSeo: "lyrics/updateLyricsSeo",
} as const;

export const SliceName = { Lyrics: "lyrics" } as const;
```

### `type.ts`

```ts
type ILyricsState = {
    getLyrics: IBasicInitialState<IPaginatedResult<ILyricsEntity>>;
    createLyrics: IBasicInitialState<ILyricsEntity>;
    updateLyrics: IBasicInitialState<ILyricsEntity>;
    updateLyricsSeo: IBasicInitialState<ILyricsEntity>;
};
```

### Action Files (4 files)

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `getlyrics.action.ts` | `ILyricsQueryParams` | `IPaginatedResult<ILyricsEntity>` |
| `createlyrics.action.ts` | `ICreateLyricsCredentials` | `ILyricsEntity` |
| `updatelyrics.action.ts` | `{ id: string; data: IUpdateLyricsCredentials }` | `ILyricsEntity` |
| `updatelyricseo.action.ts` | `{ id: string; data: IUpdateLyricsSeoCredentials }` | `ILyricsEntity` |

---

## Models

**Path:** `src/modules/lyrics/presentation/model/`

| File | Fields |
| --- | --- |
| `ILyricsQueryParams.ts` | `page: number; limit: number; search?: string; language?: string` |
| `ICreateLyricsCredentials.ts` | `songTitle: string; artistName: string; lyricsText: string; language: string; videoId?: string; articleId?: string` |
| `IUpdateLyricsCredentials.ts` | `songTitle: string; artistName: string; lyricsText: string; language: string; videoId?: string; articleId?: string` |
| `IUpdateLyricsSeoCredentials.ts` | `metaTitle: string; metaDescription: string; metaKeywords?: string` |

> A lyrics record can be linked to a `videoId`, an `articleId`, or neither. Both are optional at the model level. Validation should warn (not block) if neither is set.

---

## Validators

**Path:** `src/modules/lyrics/presentation/utils/validators/`

### `lyrics.content.validator.ts`

```ts
export const LyricsContentValidator = {
    songTitle: (label: string) => [required(label), max(label, 200)],
    artistName: (label: string) => [required(label), max(label, 200)],
    lyricsText: (label: string) => [required(label)],
    language: (label: string) => [required(label), max(label, 10)], // ISO 639-1 code
};
```

### `lyrics.seo.validator.ts`

```ts
export const LyricsSeoValidator = {
    metaTitle: (label: string) => [required(label), max(label, 70)],
    metaDescription: (label: string) => [required(label), max(label, 160)],
    metaKeywords: (label: string) => [max(label, 300)], // optional
};
```

---

## Notifications

**Path:** `src/modules/lyrics/presentation/utils/notification/`

### `lyrics.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Paroles créées" | "Les paroles ont été créées avec succès." |
| `updateSuccess` | "Paroles modifiées" | "Les paroles ont été modifiées avec succès." |
| `updateSeoSuccess` | "SEO mis à jour" | "Les informations SEO ont été mises à jour." |

---

## Constants

**Path:** `src/modules/lyrics/presentation/constants/`

### `lyrics.dropdown.ts`

| Action | Label | Hidden condition |
| --- | --- | --- |
| `edit` | "Modifier" | `!isAdminOrSuperAdmin` |
| `seo` | "Modifier le SEO" | `!isAdminOrSuperAdmin` |

> Lyrics have no workflow, no delete, no status changes. The dropdown is minimal.

### `lyrics.language.ts`

Predefined language options for the `language` select field:

| Value | Label |
| --- | --- |
| `fr` | "Français" |
| `en` | "Anglais" |
| `rw` | "Kinyarwanda" |
| `sw` | "Swahili" |
| `ln` | "Lingala" |

> Extend this list as needed. The `language` field stores an ISO 639-1 code.

---

## Hooks

**Path:** `src/modules/lyrics/presentation/hooks/`

### `UseLyricsList.ts`

- Dispatches `getLyricsAction(params)` with server-side pagination
- Manages `page`, `limit`, `search`, `language` filter state
- Exposes: `items`, `total`, `loading`, `error`, `page`, `limit`, `search`, `language`, `onPageChange`, `onSearch`, `onLanguageChange`, `reload`

### `UseCreateLyrics.ts`

- `useForm<ICreateLyricsCredentials>()`
- `onSubmit` → dispatch `createLyricsAction` → set success
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

### `UseUpdateLyrics.ts`

- `useForm<IUpdateLyricsCredentials>()`
- Pre-populates form when `selectedLyrics` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetUpdate`

### `UseUpdateLyricsSeo.ts`

- `useForm<IUpdateLyricsSeoCredentials>()`
- Pre-populates when `selectedLyrics` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetSeo`

---

## Components

**Path:** `src/modules/lyrics/presentation/components/`

### `forms/LyricsContentForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `songTitle` | Titre de la chanson | `Input` | required, max 200 |
| `artistName` | Nom de l'artiste | `Input` | required, max 200 |
| `language` | Langue | `Select` (from `lyrics.language.ts`) | required |
| `lyricsText` | Paroles | `TextArea` (large, auto-size) | required |
| `videoId` | Vidéo associée | `Select` (optional, loads from videos store) | optional |
| `articleId` | Article associé | `Select` (optional, loads from articles store) | optional |

The `videoId` and `articleId` fields are optional selects populated from their respective store lists. Only one should be filled at a time — display a warning (not an error) if both are set.

### `forms/LyricsSeoForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `metaTitle` | Titre SEO | `Input` | required, max 70 |
| `metaDescription` | Description SEO | `TextArea` | required, max 160 |
| `metaKeywords` | Mots-clés SEO | `Input` | optional, max 300 |

### `tables/LyricsTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Chanson | `songTitle` | Yes | `<Text strong>` |
| Artiste | `artistName` | Yes | `<Text>` |
| Langue | `language` | Yes | language label from `lyrics.language.ts` |
| Vidéo liée | `videoId` | No | link icon if set |
| Article lié | `articleId` | No | link icon if set |
| Modifié le | `updatedAt` | Yes | `dayjs().format()` |
| Actions | — | No | `<TableActionDropdown>` |

### `ui/LyricsSeoModal/index.tsx`

Modal wrapping `LyricsSeoForm`. Used from the action dropdown.

---

## Containers and Pages

**Path:** `src/modules/lyrics/presentation/`

### `containers/LyricsListContainer/index.tsx`

```
PageHeader (title="Paroles", subtitle="Gérer les paroles de chansons", icon, onCreate)
TableToolbar (language filter, search input)
Table (dataSource=items, columns, server-side pagination)
CreateEditModal (create) — LyricsContentForm
CreateEditModal (edit) — LyricsContentForm
LyricsSeoModal — conditional
```

French labels:
- Page title: "Paroles"
- Subtitle: "Gérer les paroles de chansons"
- Create button: "Créer des paroles"
- Create modal title: "Créer des paroles"
- Edit modal title: "Modifier les paroles"

> Lyrics have no action confirmation modal (no workflow, no delete). The dropdown only has `edit` and `seo`.

### `pages/LyricsPage/index.tsx`

```tsx
const LyricsPage: FC = () => (
    <div className={styles.page}>
        <title>{`Paroles | ${APP_NAME}`}</title>
        <LyricsListContainer />
    </div>
);
```

---

## TODO

### Domain
- [ ] Create `ILyricsEntity.ts` with JSDoc

### Repository Port
- [ ] Create `lyrics.repository.port.ts` with JSDoc on interface and every method

### Use Cases
- [ ] Create all 4 use case files with JSDoc

### Infrastructure
- [ ] Create `lyrics.mapper.ts` with JSDoc
- [ ] Create `lyrics.repository.impl.ts` with JSDoc
- [ ] Create `lyrics.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`

### Redux Store
- [ ] Create `constants.ts`
- [ ] Create `type.ts`
- [ ] Create `state.ts`
- [ ] Create all 4 action files
- [ ] Create `index.ts` (slice)
- [ ] Wire into `root.reducer.ts`
- [ ] Wire into `service.locator.ts`

### Models
- [ ] Create `ILyricsQueryParams.ts` with JSDoc
- [ ] Create `ICreateLyricsCredentials.ts` with JSDoc
- [ ] Create `IUpdateLyricsCredentials.ts` with JSDoc
- [ ] Create `IUpdateLyricsSeoCredentials.ts` with JSDoc

### Validators
- [ ] Create `lyrics.content.validator.ts` with JSDoc
- [ ] Create `lyrics.seo.validator.ts` with JSDoc

### Notifications
- [ ] Create `lyrics.notification.ts` with JSDoc

### Constants
- [ ] Create `lyrics.dropdown.ts` with JSDoc
- [ ] Create `lyrics.language.ts` with JSDoc

### Hooks
- [ ] Create `UseLyricsList.ts` with JSDoc
- [ ] Create `UseCreateLyrics.ts` with JSDoc
- [ ] Create `UseUpdateLyrics.ts` with JSDoc
- [ ] Create `UseUpdateLyricsSeo.ts` with JSDoc

### Components
- [ ] Create `LyricsContentForm` with JSDoc
- [ ] Create `LyricsSeoForm` with JSDoc
- [ ] Create `LyricsTable/columns.tsx` with JSDoc
- [ ] Create `LyricsSeoModal` with JSDoc

### Containers and Pages
- [ ] Create `LyricsListContainer` with JSDoc
- [ ] Create `LyricsPage` with JSDoc
- [ ] Create `LyricsPage/index.module.scss`
