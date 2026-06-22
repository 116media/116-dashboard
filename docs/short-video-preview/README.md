# Short / Réel video preview

How a réel's video plays **inline in a full-screen lightbox** — the same dark masked overlay
Ant Design uses for image preview — instead of opening the Cloudinary URL in a new browser tab.

---

## The problem

In the shorts table the "Vidéo" column links the video out:

```tsx
<Link href={videoUrl} target="_blank" rel="noopener noreferrer">
    <IconVideoCameraFilled />
</Link>
```

Clicking it leaves the dashboard and dumps the raw file into a new tab — no poster, no
controlled player, no way back except the browser's back button. We already preview **images**
in a polished antd lightbox; réels deserve the same treatment.

## The goal

Clicking the réel video icon opens a **preview overlay** that mirrors the antd image-preview
look, adapted for a vertical short:

- A **full-screen fixed overlay** rendered in a portal above everything else.
- A **dark semi-transparent mask** (~45% black) dimming the page behind it.
- A small **fade + zoom-in** animation on open.
- The réel centered in a **vertical (9:16) video player**.
- A **close (✕)** button in the top-right corner.
- **Clicking the overlay** (the mask, outside the player) closes it. **Escape** also closes it.
- Body scroll locked while open.

### Explicitly NOT included

These parts of the antd image preview are intentionally dropped:

- **No toolbar pill** — no zoom, rotate, or flip controls.
- **No left/right navigation arrows** — a réel is a single video, never a gallery.

### Player controls

The player shows **only**:

- the large center **play** button,
- the **play / pause** toggle,
- the **seek** (progress) bar,
- the **current time**.

No volume, settings, quality, fullscreen, or prev/next controls.

## Layout

```text
┌──────────────────────────────────────────────┐  ← fixed overlay + dark mask
│                                          [ ✕ ] │  ← close button, top-right
│                                                │
│                  ┌───────────┐                 │
│                  │           │                 │
│                  │           │                 │
│                  │  vertical │                 │  ← 9:16 player, centered,
│                  │   video   │                 │     max-height ~90vh
│                  │  (9 : 16) │                 │
│                  │           │                 │
│                  │ ▶  ──●──── 0:03 │           │  ← play + seek + time only
│                  └───────────┘                 │
│                                                │
│   (click anywhere on the mask = close)         │
└──────────────────────────────────────────────┘
```

---

## Architecture

The feature is one new **shared UI component** plus thin wiring through the shorts module's
modal state and table column. Playback reuses the existing
[`VideoPlayer`](../../src/shared/presentation/ui/VideoPlayer/index.tsx) (Plyr) — the preview only
adds the masked overlay around it and a trimmed controls set.

### 1. Shared component — `VideoPreview`

`src/shared/presentation/ui/VideoPreview/index.tsx`

A controlled, self-contained lightbox. It owns the overlay, the mask, the close button, the
animation, the Escape handler, and the body-scroll lock; it delegates playback to `VideoPlayer`.

```tsx
interface IVideoPreviewProps {
    /** Whether the overlay is visible. */
    open: boolean;
    /** Direct video file URL (Cloudinary). */
    src?: string | null;
    /** Optional poster shown before playback. */
    poster?: string | null;
    /** Called when the user dismisses the overlay (mask click, ✕, or Escape). */
    onClose: () => void;
}
```

Behaviour:

- Renders `null` when `!open` or `!src`.
- Rendered through a **portal** (`createPortal` to `document.body`) so it escapes table/overflow
  stacking contexts and covers the whole viewport.
- The root overlay is the **mask**: `onClick={onClose}`. The inner stage that wraps the player
  calls `stopPropagation` so clicks **on the video** never bubble up and close it.
- A keydown listener on `window` closes on **Escape**, attached only while `open`.
- On open it sets `document.body.style.overflow = "hidden"` and restores the previous value on
  close/unmount (body-scroll lock).
- `role="dialog"`, `aria-modal="true"`, and an `aria-label` on the overlay; the ✕ button has an
  `aria-label` ("Fermer").

Composition:

```tsx
<div className={styles.videoPreview} role="dialog" aria-modal="true" onClick={onClose}>
    <button type="button" className={styles.videoPreview__close} onClick={onClose}>
        <IconCloseOutlined />
    </button>

    <div
        className={styles.videoPreview__stage}
        onClick={(e) => e.stopPropagation()}
    >
        <VideoPlayer src={src} poster={poster} controls={PREVIEW_CONTROLS} ratio="9:16" />
    </div>
</div>
```

### 2. `VideoPlayer` — two small additive props

To keep `VideoPreview` from forking Plyr, `VideoPlayer` gains two **optional** props that
default to today's behaviour, so every existing caller is unaffected:

- `controls?: Plyr.Options["controls"]` — overrides the controls array.
- `ratio?: string` — overrides the aspect ratio (default stays `"16:9"`).

The preview passes a trimmed controls set and a portrait ratio:

```ts
const PREVIEW_CONTROLS = ["play-large", "play", "progress", "current-time"] as const;
```

```tsx
<VideoPlayer src={src} poster={poster} controls={PREVIEW_CONTROLS} ratio="9:16" />
```

> Plyr's single `play` button is a play/pause toggle, and `play-large` is the centered overlay
> button — together with `progress` (seek) and `current-time` they satisfy "seek + play/pause
> only".

### 3. Shorts modal state — `useShortModals`

`src/modules/shorts/presentation/hooks/UseShortModals.ts`

Add a dedicated preview slice of state alongside the existing modal flags — the preview is **not**
an `ActionModal`, so it does not go through `handleAction` / `handleActionConfirm`:

```ts
const [previewOpen, setPreviewOpen] = useState(false);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);

const handlePreviewVideo = useCallback((url: string) => {
    setPreviewUrl(url);
    setPreviewOpen(true);
}, []);

const closePreview = useCallback(() => setPreviewOpen(false), []);
```

Expose `previewOpen`, `previewUrl`, `handlePreviewVideo`, and `closePreview` from the hook's
return type and interface.

### 4. Table column — `ShortsTable/columns.tsx`

The column signature gains an `onPreviewVideo: (url: string) => void` callback. The "Vidéo" cell
stops being a `Link` and becomes a click target that triggers the preview:

```tsx
videoUrl ? (
    <IconVideoCameraFilled
        role="button"
        tabIndex={0}
        onClick={() => onPreviewVideo(videoUrl)}
        style={{ color: Colors.BrandPrimary, fontSize: 18, cursor: "pointer" }}
    />
) : (
    <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />
)
```

The `<Link>` / `target="_blank"` is removed; the icon now opens the in-app preview.

### 5. Container — `ShortsListContainer`

Pass the handler into the columns factory and render the overlay once:

```tsx
const { columns } = useResizableColumns(
    shortsTableColumns(
        modals.handleAction,
        isSuperAdmin,
        isAdminOrSuperAdmin,
        modals.handlePreviewVideo,
    )
);

// ...

<VideoPreview
    open={modals.previewOpen}
    src={modals.previewUrl}
    onClose={modals.closePreview}
/>
```

---

## Styling

`src/shared/presentation/ui/VideoPreview/index.module.scss`, BEM block `videoPreview`, all colors
from `theme.css` tokens (never hardcoded), aside from the mask's intrinsic black overlay.

| Element | Style |
| --- | --- |
| `.videoPreview` | `position: fixed; inset: 0; z-index: 1000;` flex-centered; `background: rgba(0,0,0,0.45)`; fade-in animation |
| `.videoPreview__stage` | portrait box, `height: min(90vh, ...)`, `aspect-ratio: 9 / 16`; zoom-in animation; `cursor: default` |
| `.videoPreview__close` | absolute top-right; large hit area; themed icon color; hover state |

Animations (mirror antd's open transition):

```scss
@keyframes videoPreviewFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes videoPreviewZoom {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
}
```

The mask uses `videoPreviewFade`; the stage uses `videoPreviewZoom`.

> `z-index` must sit above the table and page chrome but is fine below antd's own modal layer —
> the preview never coexists with a modal.

---

## Behaviour summary

| Trigger | Result |
| --- | --- |
| Click the video icon in a row | Overlay opens, réel loads in the 9:16 player |
| Click the mask (outside the player) | Overlay closes |
| Click on the player / controls | Stays open (propagation stopped) |
| Press Escape | Overlay closes |
| Overlay open | Body scroll locked |
| Row has no `videoUrl` | Shows the disabled `IconStopOutlined`, no click target |

## Accessibility

- `role="dialog"` + `aria-modal="true"` on the overlay.
- ✕ button and the clickable video icon expose `aria-label`s and are keyboard-reachable
  (`tabIndex={0}`, Enter/Space on the icon).
- Escape closes, matching native dialog expectations.

## Files

| File | Change |
| --- | --- |
| `src/shared/presentation/ui/VideoPreview/index.tsx` | **new** — lightbox overlay component |
| `src/shared/presentation/ui/VideoPreview/index.module.scss` | **new** — mask, stage, close, animations |
| `src/shared/presentation/ui/VideoPlayer/index.tsx` | add optional `controls` + `ratio` props |
| `src/modules/shorts/presentation/hooks/UseShortModals.ts` | add `previewOpen` / `previewUrl` / `handlePreviewVideo` / `closePreview` |
| `src/modules/shorts/presentation/components/tables/ShortsTable/columns.tsx` | icon opens preview instead of linking out |
| `src/modules/shorts/presentation/containers/ShortsListContainer/index.tsx` | wire handler + render `VideoPreview` |

## Checklist

1. Build `VideoPreview` as a portal lightbox: mask click + Escape + ✕ all call `onClose`; stop
   propagation on the stage; lock body scroll while open.
2. Add optional `controls` and `ratio` props to `VideoPlayer` (defaults unchanged).
3. Use `["play-large", "play", "progress", "current-time"]` and `ratio="9:16"` for the preview.
4. Add preview state to `useShortModals`.
5. Replace the `<Link>` in the shorts "Vidéo" column with a click-to-preview icon.
6. Render `<VideoPreview>` once in `ShortsListContainer` and pass the handler into the columns.
7. Theme tokens only in SCSS; JSDoc on the new component and every new prop.
