# Phase 9: Video Player (Shared Component)

Plyr-based video player for previewing videos and YouTube embeds across editorial forms.

**Module path:** `src/shared/presentation/ui/VideoPlayer/`

**Depends on:** `plyr` package installed

---

## Overview

A shared video player component used across the editorial module to provide inline video previews:
- **YouTube preview** in the "Associer YouTube" form (videos module)
- **Video file preview** in the short video create/update forms (shorts module)
- **Existing video playback** for uploaded short videos

Uses [Plyr](https://github.com/sampotts/plyr) (v3.8.x) directly — no `plyr-react` wrapper needed (better React 19 compatibility). The component manages the Plyr lifecycle via `useRef` and `useEffect`.

### Package

```bash
yarn add plyr
```

MIT licensed.

---

## File Structure

```text
src/shared/presentation/ui/VideoPlayer/
├── index.tsx              — main component (handles HTML5 video + YouTube)
└── index.module.scss      — Plyr theme overrides using CSS custom properties
```

---

## Component Props

### `VideoPlayer`

```ts
interface IVideoPlayerProps {
    /** Direct video URL (mp4, webm, etc.) for HTML5 playback */
    src?: string | null;
    /** YouTube video ID for embedded playback */
    youtubeId?: string | null;
    /** Poster/thumbnail image URL */
    poster?: string | null;
    /** Player height constraint */
    maxHeight?: number;
}
```

**Behavior:**
- When `youtubeId` is provided, renders a YouTube embed via Plyr
- When `src` is provided, renders an HTML5 `<video>` element via Plyr
- When neither is provided, renders nothing (returns `null`)
- Supports object URLs for local file previews before upload

---

## Styling

All Plyr colors are themed via CSS custom properties mapped from the dashboard's design tokens:

| Plyr Variable | Dashboard Token | Purpose |
|---------------|-----------------|---------|
| `--plyr-color-main` | `colors.$primary` | Progress bar, active controls |
| `--plyr-video-control-color` | `colors.$white` | Control icons |
| `--plyr-video-controls-background` | gradient with `colors.$black` | Controls backdrop |
| `--plyr-badge-background` | `colors.$primary` | Speed/quality badges |
| `--plyr-range-fill-background` | `colors.$primary` | Volume/seek fill |
| `--plyr-control-radius` | `dimensions.$border-radius` | Button corners |

The SCSS file imports from `@/shared/presentation/styles/colors` and `@/shared/presentation/styles/dimensions` — no hardcoded values.

---

## Usage Examples

### YouTube Preview (in YoutubeIdForm)

```tsx
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

// Show preview when user types a YouTube ID
{youtubeId && <VideoPlayer youtubeId={youtubeId} maxHeight={300} />}
```

### Short Video File Preview (in ShortVideoForm)

```tsx
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

// Preview selected file before upload using object URL
{fileObjectUrl && <VideoPlayer src={fileObjectUrl} maxHeight={400} />}
```

### Existing Short Video Playback (in update form)

```tsx
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

// Play the current video from CDN
{existingVideoUrl && <VideoPlayer src={existingVideoUrl} poster={thumbnailUrl} />}
```

---

## Implementation Notes

- **No `plyr-react` dependency** — vanilla Plyr with manual lifecycle management for React 19 compatibility
- **Cleanup on unmount** — `player.destroy()` called in `useEffect` cleanup
- **Source changes** — player source is updated reactively when props change
- **Responsive** — container is `width: 100%` with optional `maxHeight` constraint
- **Accessible** — Plyr handles keyboard shortcuts, focus management, and screen reader labels
- **No autoplay** — respects user interaction (autoplay disabled by default)

---

## Integration Points

| Module | Form/Component | Preview Type |
|--------|---------------|--------------|
| Videos | `YoutubeIdModal` | YouTube embed preview |
| Shorts | `ShortVideoForm` (create) | Local file object URL |
| Shorts | `ShortVideoForm` (update) | Existing CDN video URL |
