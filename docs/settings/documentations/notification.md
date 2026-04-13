# Settings — Notification Tab

## Overview

The **Notification** tab is a **placeholder** — the feature is not yet implemented.

---

## Layout

```
┌──────────────────────────────────────────────────────┐
│  Notifications                                        │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │                                                │  │
│  │              🔔                                 │  │
│  │                                                │  │
│  │         Bientôt disponible                     │  │
│  │                                                │  │
│  │   Cette fonctionnalité est en cours de          │  │
│  │   développement. Revenez bientôt !             │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Implementation

- Render a centered empty state card with:
  - An icon (bell or notification icon)
  - Title: **"Bientôt disponible"** (Coming soon)
  - Description: **"Cette fonctionnalité est en cours de développement. Revenez bientôt !"**
- Use Ant Design `Empty` component or `Result` component with a custom icon
- No API calls, no Redux state — purely presentational
