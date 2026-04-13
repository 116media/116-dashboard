# Settings — Overview

## Page Title

**Paramètres** (French for "Settings")

Helmet: `Paramètres | {APP_NAME}`

---

## Navigation Structure

The settings page uses a **sidebar + content** layout (inspired by [dashboard.webp](./assets/dashboard.webp)).

### Sidebar Tabs

| Tab | Label (FR) | Description |
| --- | --- | --- |
| Profile | Profil | Avatar, account information |
| Security | Sécurité | Change password, roles & permissions, active sessions |
| Notification | Notifications | Coming soon placeholder |
| Account | Compte | Sign out, sign out from all devices |

### URL Strategy

Settings uses a single route at `SETTING_PATH` (`/settings`) with **tab-based navigation** via internal state or URL query params (e.g., `/settings?tab=security`). No nested routes.

---

## Page Layout

```
┌─────────────────────────────────────────────────────────┐
│ Helmet: "Paramètres | APP_NAME"                          │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Sidebar     │  Content Area                            │
│  ┌────────┐  │  ┌────────────────────────────────────┐  │
│  │ Profil │  │  │  Tab-specific content               │  │
│  │Sécurité│  │  │  (cards, forms, tables)             │  │
│  │Notif.  │  │  │                                    │  │
│  │ Compte │  │  │                                    │  │
│  └────────┘  │  └────────────────────────────────────┘  │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
```

The sidebar is a vertical menu rendered with Ant Design `Menu` component in `inline` mode. The content area renders the active tab's component.

---

## Design References

### dashboard.webp

Full settings page layout reference:

- **Left sidebar**: Vertical navigation with tab items, active tab highlighted with blue text and left border
- **Right content area**: Stacked cards with section titles and "Edit" buttons
- **Card structure**: Section title + Edit button at top-right, two-column field layout below. Profile uses two cards: avatar card and a single account info card (identity + location/contact merged)
- **Avatar card**: Profile photo, user name, role, location — compact horizontal layout

### modal-layout-only.webp

Modal structure reference (used for editing account info):

- **Modal container**: Centered overlay with white card, rounded corners
- **Section header**: Icon + title + description text
- **Form layout**: Two-column grid for related fields (e.g., first name / last name), single column for standalone fields
- **Action buttons**: Cancel (ghost/text) and Update (primary) aligned right
- **Key takeaway**: We adopt this modal structure (header, two-col form, action buttons) — not the specific fields shown

### modal-layout.webp

Extended modal reference:

- **Title + subtitle**: Bold title with lighter description below
- **File upload area**: Dashed border drop zone with icon and instructions
- **Form fields**: Two-column layout, prefixed input, multiline textarea
- **Key takeaway**: We adopt the modal layout pattern (title/subtitle, structured form, footer actions) — not the specific fields shown
