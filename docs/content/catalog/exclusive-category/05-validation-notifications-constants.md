# 05 — Validation, Notifications & Constants

## 1. Poster validation

**File:** `src/modules/catalog/presentation/utils/validators/catalog.categories.validator.ts`

The backend poster validator only enforces "file required", so the client owns UX-level
constraints. Add a `poster` validator entry returning Ant `Rule[]` (via `ValidatorUtils`),
matching how the article cover image is validated.

```ts
poster: (label: string): Rule[] => [
    // optional field — only validate type/size when a file is provided
    ValidatorUtils.imageFile(label, {
        accept: ["image/jpeg", "image/png"],
        maxSizeMb: 5,
    }),
],
```

> Confirm the real backend limits and whether a shared `imageFile` validator already exists
> (the article image upload likely has one — reuse it instead of adding a new rule).

## 2. Notifications

**File:** `src/modules/catalog/presentation/utils/notification/catalog.categories.notification.ts`

Add success configs to the existing `CategoriesNotification` object (French labels, matching
the existing `createSuccess`/`activateSuccess` style):

```ts
setExclusiveSuccess: {
    type: "success",
    title: "Show exclusif défini",
    description: "La catégorie est maintenant le show exclusif de la page d'accueil.",
},
uploadPosterSuccess: {
    type: "success",
    title: "Affiche mise à jour",
    description: "L'affiche de la catégorie a été enregistrée.",
},
```

Errors are built from the `Failure` at runtime by the shared error handler (do not hardcode
error notifications) — see the error → message mapping in [06](06-api-and-rules.md).

## 3. Constants

**File:** `src/modules/catalog/presentation/constants/catalog.categories.config.ts`

Add the `setExclusive` entry to `CATEGORY_ACTION_CONFIG` (shown in [04 §3](04-presentation.md)).

**File:** `src/modules/catalog/presentation/constants/catalog.categories.dropdown.ts`

Extend the `CategoryAction` union with `"setExclusive"`.

## TODO

- [ ] Add a `poster` validator (reuse the shared image-file rule if it exists; confirm mime/size)
- [ ] Add `setExclusiveSuccess` + `uploadPosterSuccess` to `CategoriesNotification`
- [ ] Add `setExclusive` to `CATEGORY_ACTION_CONFIG`
- [ ] Add `"setExclusive"` to the `CategoryAction` union
