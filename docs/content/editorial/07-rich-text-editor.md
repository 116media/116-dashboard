# Phase 7: Rich Text Editor (Shared Component)

TipTap v3-based WYSIWYG editor with social media embeds and image upload.

**Module path:** `src/shared/presentation/ui/RichTextEditor/`

**Depends on:** TipTap packages installed

---

## Overview

A shared rich text editor component used by articles (and later videos/lyrics) for the `body` content field. Outputs clean HTML that the backend stores as-is. Integrates with Ant Design Forms via `value`/`onChange` protocol.

### Packages

```bash
yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit \
  @tiptap/extension-image @tiptap/extension-youtube \
  @tiptap/extension-link @tiptap/extension-placeholder
```

All MIT licensed, all support React 19.

---

## File Structure

```text
src/shared/presentation/ui/RichTextEditor/
├── index.tsx              — main wrapper (value/onChange for Ant Design Form)
├── index.module.scss      — BEM styles
├── EditorToolbar.tsx      — Ant Design toolbar with formatting buttons
└── extensions/
    ├── FacebookEmbed.ts   — custom TipTap node for FB posts/videos
    ├── InstagramEmbed.ts  — custom TipTap node for IG posts/reels
    └── TikTokEmbed.ts     — custom TipTap node for TikTok videos
```

---

## Component Props

### `RichTextEditor`

```ts
interface IRichTextEditorProps {
    value?: string;
    onChange?: (html: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
    placeholder?: string;
    minHeight?: number;
    readOnly?: boolean;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `""` | HTML content (Ant Design Form controlled) |
| `onChange` | `(html: string) => void` | — | Called on every content change |
| `onImageUpload` | `(file: File) => Promise<string>` | — | Returns Cloudinary URL. Image button disabled when undefined |
| `placeholder` | `string` | `"Commencez à écrire..."` | Placeholder text |
| `minHeight` | `number` | `300` | Minimum editor height in px |
| `readOnly` | `boolean` | `false` | Disables editing, hides toolbar |

### `EditorToolbar`

```ts
interface IEditorToolbarProps {
    editor: Editor | null;
    onImageUpload?: (file: File) => Promise<string>;
}
```

---

## TipTap Extensions

### Built-in (from packages)

| Extension | Source | Purpose |
| --- | --- | --- |
| `StarterKit` | `@tiptap/starter-kit` | Bold, italic, strike, code, headings (1-3), bullet/ordered lists, blockquote, horizontal rule, hard break |
| `Image` | `@tiptap/extension-image` | `<img>` nodes with `src`, `alt`, `title` |
| `Youtube` | `@tiptap/extension-youtube` | YouTube embed via video ID |
| `Link` | `@tiptap/extension-link` | `<a>` with auto-link detection |
| `Placeholder` | `@tiptap/extension-placeholder` | Placeholder text when editor is empty |

### Custom Extensions

Each social embed is a custom TipTap `Node` that stores a URL and renders as a styled placeholder card in the editor.

#### `FacebookEmbed.ts`

```ts
Node.create({
    name: "facebookEmbed",
    group: "block",
    atom: true,
    addAttributes() {
        return { url: { default: null } };
    },
    parseHTML() {
        return [{ tag: 'div[data-facebook-url]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-facebook-url': HTMLAttributes.url }];
    },
    addNodeView() {
        // Renders a styled card: Facebook icon + URL + "Aperçu" badge
    }
});
```

URL pattern: `facebook.com/.*/posts/`, `facebook.com/.*/videos/`, `fb.watch/`

#### `InstagramEmbed.ts`

Same pattern. URL: `instagram.com/p/`, `instagram.com/reel/`

#### `TikTokEmbed.ts`

Same pattern. URL: `tiktok.com/@.*/video/`

### Paste Detection

A ProseMirror plugin added via `addProseMirrorPlugins()` in a wrapper extension:

1. Intercepts `paste` events
2. Checks if pasted text matches a social URL pattern
3. If match → inserts the corresponding embed node instead of text
4. YouTube URLs handled by `@tiptap/extension-youtube` built-in paste rules

---

## Toolbar Layout

```text
[B] [I] [S] [</>] | [H1] [H2] [H3] | [•] [1.] [❝] | [🔗] [🖼] | [▶ Embed ▾]
```

| Group | Buttons | Behavior |
| --- | --- | --- |
| Text formatting | Bold, Italic, Strikethrough, Code | Toggle active state |
| Headings | H1, H2, H3 | Toggle heading level |
| Structure | Bullet list, Ordered list, Blockquote | Toggle block type |
| Insert | Link, Image | Link: popover with URL input. Image: file picker → upload → insert |
| Embeds | Dropdown: YouTube, Facebook, Instagram, TikTok | Each opens a popover with URL input |

### Toolbar Implementation

- Use Ant Design `Button` with `type="text"` and `size="small"`
- Active state: `type="primary"` when formatting is active
- Separators: Ant Design `Divider` with `type="vertical"`
- Embed dropdown: Ant Design `Dropdown` with `Menu`
- Link/embed URL input: Ant Design `Popover` with `Input` + confirm button
- Image: hidden `<input type="file" accept="image/*" />` triggered by button click
- All icons from centralized `@/shared/presentation/ui/Icons`

### New Icons Needed

Add to `src/shared/presentation/ui/Icons/index.tsx`:

```ts
BoldOutlined as IconBoldOutlined,
ItalicOutlined as IconItalicOutlined,
StrikethroughOutlined as IconStrikethroughOutlined,
CodeOutlined as IconCodeOutlined,
LinkOutlined as IconLinkOutlined,
PictureOutlined as IconPictureOutlined,
UnorderedListOutlined as IconUnorderedListOutlined,
OrderedListOutlined as IconOrderedListOutlined,
```

---

## Image Upload Flow

1. User clicks image button in toolbar
2. Hidden file input opens (`accept="image/*"`)
3. File selected → `onImageUpload(file)` called
4. Parent provides the closure:

```ts
// In wizard Step 2:
const onImageUpload = async (file: File) => {
    const result = await dispatch(
        uploadArticleImageAction({
            id: articleId,
            data: { file, imageType: EnumArticleImageType.Body }
        })
    );
    if (uploadArticleImageAction.fulfilled.match(result)) {
        return result.payload.url;
    }
    throw new Error("Upload failed");
};
```

5. URL returned → editor inserts `<img src="cloudinary-url" />`
6. If `onImageUpload` is undefined → image button is disabled with tooltip "Complétez l'étape 1 d'abord"

---

## Ant Design Form Integration

The editor implements the standard Ant Design "custom form control" protocol:

```tsx
const RichTextEditor: FC<IRichTextEditorProps> = ({ value, onChange, ... }) => {
    const skipUpdate = useRef(false);

    const editor = useEditor({
        extensions: [...],
        content: value || "",
        onUpdate: ({ editor }) => {
            if (skipUpdate.current) {
                skipUpdate.current = false;
                return;
            }
            onChange?.(editor.getHTML());
        }
    });

    // Sync external value changes (e.g., form pre-population)
    useEffect(() => {
        if (editor && value !== undefined && editor.getHTML() !== value) {
            skipUpdate.current = true;
            editor.commands.setContent(value, false);
        }
    }, [editor, value]);
};
```

**Usage in Ant Design Form:**

```tsx
<Form.Item name="body" label="Contenu" rules={[{ required: true }]}>
    <RichTextEditor
        placeholder="Contenu de l'article"
        onImageUpload={onImageUpload}
    />
</Form.Item>
```

---

## HTML Output Format

The editor outputs standard HTML. Social embeds use data attributes:

```html
<h1>Article Title</h1>
<p>Introduction paragraph with <strong>bold</strong> and <em>italic</em>.</p>

<img src="https://res.cloudinary.com/.../image.jpg" alt="Photo" />

<div data-youtube-video>
    <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
</div>

<div data-facebook-url="https://facebook.com/page/posts/123"></div>
<div data-instagram-url="https://instagram.com/p/ABC123"></div>
<div data-tiktok-url="https://tiktok.com/@user/video/123"></div>

<blockquote>A quote</blockquote>
<ul><li>List item</li></ul>
```

---

## Styles

**File:** `src/shared/presentation/ui/RichTextEditor/index.module.scss`

```scss
@use "@/shared/presentation/styles/dimensions.scss" as dimensions;
@use "@/shared/presentation/styles/colors.scss" as colors;

.richTextEditor {
    border: 1px solid colors.$border-light;
    border-radius: dimensions.$border-radius;
    overflow: hidden;

    &__toolbar { ... }      // padding, border-bottom, flex wrap
    &__content { ... }       // min-height, padding, prose styles
    &__embed { ... }         // embed placeholder card styles
    &__embedIcon { ... }     // platform icon in embed card
    &__embedUrl { ... }      // truncated URL text
}
```

BEM naming. All spacing via `dimensions.$padding`. All colors via `colors.*`.

---

## TODO

- [ ] Install TipTap packages
- [ ] Add toolbar icons to Icons module
- [ ] Create `index.tsx` — main editor wrapper with value/onChange
- [ ] Create `EditorToolbar.tsx` — formatting toolbar with Ant Design buttons
- [ ] Create `index.module.scss` — BEM styles
- [ ] Create `extensions/FacebookEmbed.ts`
- [ ] Create `extensions/InstagramEmbed.ts`
- [ ] Create `extensions/TikTokEmbed.ts`
- [ ] Test: editor renders in Ant Design Form.Item with validation
- [ ] Test: image upload inserts img tag with Cloudinary URL
- [ ] Test: pasting YouTube/FB/IG/TikTok URLs auto-creates embed nodes
- [ ] Test: toolbar buttons toggle formatting correctly
- [ ] Test: readOnly mode hides toolbar and disables editing
