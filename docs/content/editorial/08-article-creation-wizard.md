# Phase 8: Article Creation Wizard

4-step creation wizard using Ant Design `Steps` with rich text editor integration.

**Module path:** `src/modules/articles/presentation/`

**Depends on:** Phase 7 (RichTextEditor) completed

---

## Overview

Replaces the current simple `CreateEditModal` for article creation with a multi-step wizard. The wizard uses the backend's two-phase approach: Step 1 creates the draft (returns `articleId`), subsequent steps update it with content, tags, SEO, and images.

The edit flow remains unchanged — existing `CreateEditModal` with `ArticleContentForm` (now using `RichTextEditor` instead of `TextArea`).

---

## Wizard Steps

| Step | Index | Title | Form Component | API Call on "Suivant" |
| --- | --- | --- | --- | --- |
| Informations | 0 | Informations | `ArticleCreateStep1Form` | `POST /articles` → returns `articleId` |
| Contenu | 1 | Contenu | `ArticleContentForm` (with RichTextEditor) | `PUT /articles/{id}` + image uploads |
| Tags & SEO | 2 | Tags & SEO | `ArticleTagsForm` + `ArticleSeoForm` (combined) | `PUT /articles/{id}/tags` + `PATCH /articles/{id}/seo` |
| Résumé | 3 | Résumé | `ArticleCreateSummary` (read-only) | `PATCH /articles/{id}/submit` |

---

## File Structure

```text
src/modules/articles/presentation/
├── components/ui/
│   ├── ArticleCreateWizard/
│   │   ├── index.tsx          — modal + Steps + step routing
│   │   └── index.module.scss  — BEM styles
│   └── ArticleCreateSummary/
│       ├── index.tsx          — step 4 read-only preview
│       └── index.module.scss  — summary styles
├── hooks/
│   └── UseCreateArticleWizard.ts  — wizard state management
└── model/
    └── IWizardStep2Credentials.ts — step 2 form model
```

---

## Wizard Component

### `ArticleCreateWizard`

```ts
interface IArticleCreateWizardProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}
```

**Layout:**

```text
┌──────────────────────────────────────────────────────────────────────┐
│  Créer un article                                              ✕    │
│                                                                      │
│  ○ Informations ─── ○ Contenu ─── ○ Tags & SEO ─── ○ Résumé        │
│  ─────────────────────────────────────────────────────────────────── │
│                                                                      │
│  [Active step form content]                                          │
│                                                                      │
│                                                                      │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────── │
│                                          [Précédent]  [Suivant]      │
└──────────────────────────────────────────────────────────────────────┘
```

**Modal props:**
- `width={900}`
- `destroyOnHidden` to reset all state on close
- `closable={true}` with confirm on close if article was created (step > 0)
- Custom footer: `Précédent` (disabled on step 0) + `Suivant` / `Soumettre` (step 3)

**Step rendering:**

```tsx
const stepContent = [
    <ArticleCreateStep1Form form={wizard.step1Form} error={wizard.error} onSubmit={...} />,
    <ArticleContentForm form={wizard.step2Form} error={wizard.error} onImageUpload={wizard.onImageUpload} />,
    <CombinedTagsSeoStep seoForm={wizard.seoForm} tagIds={wizard.tagIds} onTagsChange={wizard.onTagsChange} />,
    <ArticleCreateSummary article={wizard.article} />
];
```

---

## Wizard Hook

### `UseCreateArticleWizard`

```ts
interface IUseCreateArticleWizard {
    currentStep: number;
    articleId: string | null;
    article: IArticleEntity | null;
    loading: boolean;
    error: Failure | null | undefined;

    // Step 1
    step1Form: FormInstance<ICreateArticleCredentials>;

    // Step 2
    step2Form: FormInstance<IWizardStep2Credentials>;
    onImageUpload: (file: File) => Promise<string>;

    // Step 3
    seoForm: FormInstance<IUpdateArticleSeoCredentials>;
    tagIds: string[];
    onTagsChange: (ids: string[]) => void;

    // Navigation
    goNext: () => Promise<void>;
    goBack: () => void;
    onSubmit: () => Promise<void>;
    reset: () => void;
}
```

**Navigation logic:**

```ts
goNext = async () => {
    switch (currentStep) {
        case 0:
            // Validate step1Form
            // Dispatch createArticleAction → store articleId
            // Fetch full article via getArticleByIdAction
            // Advance to step 1
            break;
        case 1:
            // Validate step2Form
            // Dispatch updateArticleAction with headline + body + coverImageUrl
            // Re-fetch article
            // Advance to step 2
            break;
        case 2:
            // Dispatch updateArticleTagsAction (if tagIds changed)
            // Validate seoForm → dispatch updateArticleSeoAction
            // Re-fetch article
            // Advance to step 3
            break;
    }
};

goBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
    // No API calls, no validation
};

onSubmit = async () => {
    // Dispatch submitArticleAction(articleId)
    // Show success notification
    // Call onSuccess() (reloads list)
};
```

**Image upload handler:**

```ts
onImageUpload = async (file: File) => {
    if (!articleId) throw new Error("Article not created yet");
    const result = await dispatch(uploadArticleImageAction({
        id: articleId,
        data: { file, imageType: EnumArticleImageType.Body }
    }));
    if (uploadArticleImageAction.fulfilled.match(result)) {
        return result.payload.url;
    }
    throw new Error("Upload failed");
};
```

---

## Step 2 Form Model

### `IWizardStep2Credentials`

```ts
export interface IWizardStep2Credentials {
    headline: string;
    body: string;
    coverImageUrl?: string;
}
```

This is a subset of `IUpdateArticleCredentials` containing only the fields shown in Step 2. When submitting Step 2, the wizard merges this with the existing article data to build the full `IUpdateArticleCredentials`.

---

## Summary Component (Step 4)

### `ArticleCreateSummary`

```ts
interface IArticleCreateSummaryProps {
    article: IArticleEntity | null;
}
```

Read-only preview using Ant Design `Descriptions`:

| Field | Display |
| --- | --- |
| Titre | `Text strong` |
| Catégorie | Category name |
| Client | Customer name (if set) |
| Accroche | Headline text (truncated) |
| Contenu | Body HTML rendered in bordered box (max-height 300px, overflow scroll) |
| Image de couverture | Thumbnail `<img>` (if set) |
| Tags | `Tag` components |
| Titre SEO | Meta title |
| Description SEO | Meta description |

**Body preview:** Uses `dangerouslySetInnerHTML` inside a styled container. Social embed data attributes render as placeholder text (not live iframes).

---

## Modifications to Existing Files

### `ArticlesListContainer/index.tsx`

Replace the create `CreateEditModal` block:

```tsx
// Before:
{modals.createOpen && (
    <CreateEditModal ...>
        <ArticleCreateStep1Form ... />
    </CreateEditModal>
)}

// After:
{modals.createOpen && (
    <ArticleCreateWizard
        open={modals.createOpen}
        onClose={() => modals.setCreateOpen(false)}
        onSuccess={() => {
            modals.setCreateOpen(false);
            list.reload();
        }}
    />
)}
```

Keep the edit `CreateEditModal` unchanged.

### `ArticleContentForm/index.tsx`

Replace body `TextArea` with `RichTextEditor`:

```tsx
// Before:
<Item name="body" label="Contenu" rules={ArticlesContentValidator.body("Contenu")}>
    <TextArea rows={8} placeholder="Contenu de l'article" />
</Item>

// After:
<Item name="body" label="Contenu" rules={ArticlesContentValidator.body("Contenu")}>
    <RichTextEditor
        placeholder="Contenu de l'article"
        onImageUpload={onImageUpload}
    />
</Item>
```

Add `onImageUpload` prop to `ArticleContentForm`:

```ts
interface IArticleContentFormProps {
    form: FormInstance<IUpdateArticleCredentials>;
    error: Failure | null | undefined;
    formContext: FormContext;
    initialValues?: IArticleEntity | null;
    onSubmit: (values: IUpdateArticleCredentials) => void;
    onImageUpload?: (file: File) => Promise<string>;  // NEW
}
```

---

## Combined Tags & SEO Step (Step 3)

Step 3 combines the existing `ArticleTagsForm` and `ArticleSeoForm` in a single view:

```tsx
<Flex vertical gap={24}>
    <div>
        <Title level={5}>Tags</Title>
        <ArticleTagsForm tags={tags} tagIds={tagIds} onTagsChange={onTagsChange} />
    </div>
    <Divider />
    <div>
        <Title level={5}>SEO</Title>
        <ArticleSeoForm form={seoForm} error={error} />
    </div>
</Flex>
```

No new component file needed — this is inlined in the wizard's step content array.

---

## Styles

### `ArticleCreateWizard/index.module.scss`

```scss
.articleWizard {
    &__steps { ... }         // top Steps component padding
    &__content { ... }       // step content area with min-height
    &__footer { ... }        // navigation buttons row
}
```

### `ArticleCreateSummary/index.module.scss`

```scss
.articleSummary {
    &__body { ... }          // bordered preview box, max-height, overflow
    &__cover { ... }         // thumbnail image styles
    &__tags { ... }          // tag list with flex wrap
}
```

---

## TODO

- [ ] Create `IWizardStep2Credentials.ts` model
- [ ] Create `UseCreateArticleWizard.ts` hook
- [ ] Create `ArticleCreateSummary` component + styles
- [ ] Create `ArticleCreateWizard` component + styles
- [ ] Update `ArticlesListContainer` — replace create modal with wizard
- [ ] Update `ArticleContentForm` — replace TextArea with RichTextEditor
- [ ] Add `onImageUpload` prop to `ArticleContentForm`
- [ ] Test: full wizard flow (4 steps) creates and submits article
- [ ] Test: back navigation preserves form data
- [ ] Test: image upload works in step 2
- [ ] Test: edit mode uses RichTextEditor with pre-populated HTML body
- [ ] Test: closing wizard mid-flow leaves draft article in backend
