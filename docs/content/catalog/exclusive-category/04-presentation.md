# 04 — Presentation Layer

## 1. Hooks

**Folder:** `src/modules/catalog/presentation/hooks/`

### 1a. `UseSetExclusiveCategory.ts` (new)

Mirror `UseCategoryActions` (select state, dispatch, notify, reload).

```ts
export const UseSetExclusiveCategory = (reload: () => void): IUseSetExclusiveCategory => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(({ catalog }) => catalog.setExclusiveCategory);

    const onSetExclusive = async (id: string): Promise<void> => {
        const result = await dispatch(setExclusiveCategoryAction(id));
        if (setExclusiveCategoryAction.fulfilled.match(result)) {
            showNotification(CategoriesNotification.setExclusiveSuccess);
            reload(); // mutex: another category may have been unset server-side
        }
    };

    return { loading, error, onSetExclusive };
};
```

### 1b. `UseUploadCategoryPoster.ts` (new)

Mirror `UseUploadArticleImage` (returns the new `posterUrl`).

```ts
export const UseUploadCategoryPoster = (): IUseUploadCategoryPoster => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(({ catalog }) => catalog.uploadCategoryPoster);

    const onUpload = async (id: string, file: File): Promise<string | null> => {
        const result = await dispatch(uploadCategoryPosterAction({ id, data: { file } }));
        if (uploadCategoryPosterAction.fulfilled.match(result)) {
            showNotification(CategoriesNotification.uploadPosterSuccess);
            return result.payload.posterUrl;
        }
        return null;
    };

    return { loading, error, onUpload };
};
```

## 2. `CategoryForm` — poster uploader + exclusive switch (create AND edit)

**File:** `src/modules/catalog/presentation/components/forms/CategoryForm/index.tsx`

Both fields appear in **create and edit**.

### 2a. Optional poster image uploader — default 1:1 aspect ratio

An **optional** image uploader that crops/constrains to a **1:1 (square) aspect ratio by
default**. `isGossip` is already rendered only for `Article`; the poster is meaningful for the
video show, so render the uploader (and the exclusive switch below) for `Video` content types.

- **Aspect ratio:** default **1:1**. Use the shared image-picker/cropper used by the article
  cover image; pass a `1` (square) aspect-ratio prop. If that component does not yet support a
  configurable ratio, extend it rather than hand-rolling a new uploader.
- **Optional:** no file is required; create/update succeed without a poster.
- **CREATE:** collect the cropped `File` into the form value `poster`; sent with the multipart create.
- **EDIT:** preview the **currently loaded** `initialValues.posterUrl`; selecting a new file
  replaces it. Prefer the dedicated `UseUploadCategoryPoster` for instant feedback + its own
  loading/error state, or send the new `poster` with the update.
- Restrict accepted files to images and validate (mime/size) before upload — see [05](05-validation-notifications-constants.md).
- Use `theme` tokens for styling; no hardcoded colors.

### 2b. `isExclusive` switch — default false

A `SwitchField` that **defaults to `false`**, shown for `Video` content types (the backend
rejects exclusive on non-video — see [06](06-api-and-rules.md)).

```tsx
{selectedContentType?.isVideoType && (
    <SwitchField
        name="isExclusive"
        title="Show exclusif"
        description="Mettre cette catégorie en avant comme le show exclusif de la page d'accueil."
        // EDIT: disabled while the category is inactive (backend forbids exclusive on inactive).
        disabled={formContext === "EDIT" && initialValues?.isActive === false}
    />
)}
```

- **Default:** `false` — set `isExclusive: false` in the CREATE form's initial values.
- The table also offers a standalone **set-exclusive** action (§4); both paths are kept.

### 2c. Edit must prefill the current poster and exclusive value

When opening the edit modal, the form is pre-populated from the fetched category
(`initialValues: ICategoryEntity`, which now carries `isExclusive` and `posterUrl` per
[01](01-domain-and-models.md)). Ensure the edit hook seeds **both**:

```ts
// UseUpdateCategory — when selectedEntity changes, prefill the form:
form.setFieldsValue({
    name: selectedEntity.name,
    description: selectedEntity.description,
    // ...existing fields...
    isExclusive: selectedEntity.isExclusive, // load current value
});
// and render initialValues.posterUrl as the current poster preview.
```

> `poster` itself is NOT prefilled with a `File` (we only have a URL) — the preview shows
> `posterUrl`; the form's `poster` value stays empty until the admin picks a new image.

## 3. `CategoryActionModal` — add `setExclusive` action

**File:** `src/modules/catalog/presentation/components/ui/CategoryActionModal/index.tsx`
**Config:** `src/modules/catalog/presentation/constants/catalog.categories.config.ts`
**Action type:** `src/modules/catalog/presentation/constants/catalog.categories.dropdown.ts`

Extend the `CategoryAction` union with `"setExclusive"` and add a config entry:

```ts
setExclusive: {
    title: "Définir comme show exclusif",
    description:
        "Cette catégorie deviendra le show exclusif de la page d'accueil. " +
        "Le show exclusif précédent sera automatiquement retiré.",
    danger: false,
},
```

The existing `CategoryActionModal` already maps `action → CATEGORY_ACTION_CONFIG[action]`, so it
needs no structural change beyond the new union member being handled by the container's confirm
handler (§5).

## 4. `CategoriesTable` — exclusive column + dropdown entry

**File:** `src/modules/catalog/presentation/components/tables/CategoriesTable/columns.tsx`

- **Column**: render an "Exclusif" tag when `isExclusive` is true (reuse the existing
  `BooleanTag`/`StatusTag` used for `isFree`/`isActive`). Optionally show a small poster
  thumbnail when `posterUrl` is set.
- **Action dropdown** (`TableActionDropdown`): add a **"Définir comme exclusif"** item, shown
  **only when** `record.isVideoType && record.isActive && !record.isExclusive`. Hide it
  otherwise so the UI never offers an action the backend will reject.

## 5. Container wiring

**File:** `src/modules/catalog/presentation/containers/CategoriesListContainer/index.tsx`

- Use `UseSetExclusiveCategory(reload)` and route the table's "set exclusive" dropdown item
  through the `CategoryActionModal` (action = `"setExclusive"`), calling `onSetExclusive(id)`
  on confirm.
- Pass the modal `loading`/`error` from the `setExclusiveCategory` slice state.
- Use `UseUploadCategoryPoster` where the poster uploader lives (create/edit modal).

## TODO

- [ ] Create `UseSetExclusiveCategory` hook (+ its interface) with JSDoc
- [ ] Create `UseUploadCategoryPoster` hook (+ its interface) with JSDoc
- [ ] Add optional poster uploader to `CategoryForm` with **default 1:1 aspect ratio** (create + edit), preview current `posterUrl`, restrict to images
- [ ] Add `isExclusive` `SwitchField` to `CategoryForm` (create + edit), **default false**, video-only, disabled when inactive
- [ ] Prefill `isExclusive` + current poster preview from the fetched category on edit (`UseUpdateCategory`)
- [ ] Add `"setExclusive"` to the `CategoryAction` union + `CATEGORY_ACTION_CONFIG`
- [ ] Add "Exclusif" tag column (+ optional poster thumbnail) to `CategoriesTable`
- [ ] Add conditional "set exclusive" dropdown item (video + active + not-exclusive)
- [ ] Wire the action + poster hooks into `CategoriesListContainer`
- [ ] Use theme tokens for all new styling; JSDoc on all new exports
