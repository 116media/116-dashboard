# Settings Module — Documentation

Complete specification for the **Settings** feature in the dashboard application.

## Table of Contents

| Document | Description |
| --- | --- |
| [Overview](./overview.md) | Navigation structure, page layout, and design references |
| [Profile Tab](./profile.md) | Avatar, account info — modal edit form |
| [Security Tab](./security.md) | Change password (inline), roles & permissions, session management |
| [Notification Tab](./notification.md) | Coming soon placeholder |
| [Account Tab](./account.md) | Sign out, sign out from all devices |
| [API Endpoints](./api-endpoints.md) | All endpoints, request/response DTOs, error handling |
| [Redux Store](./redux-store.md) | Settings slice design, actions, state shape |
| [UI Components](./ui-components.md) | Modal form pattern, shared components, validators |
| [Folder Structure](./folder-structure.md) | File naming conventions, module architecture |
| [Field Specifications](./field-specifications.md) | Exact fields for every card, modal, form, table, and action |

## Design References

| Asset | Description |
| --- | --- |
| [dashboard.webp](./assets/dashboard.webp) | Settings page layout with sidebar navigation and profile cards |
| [modal-layout-only.webp](./assets/modal-layout-only.webp) | Modal structure reference — two-column form with Cancel/Update buttons |
| [modal-layout.webp](./assets/modal-layout.webp) | Modal structure reference — form with file upload and multiline fields |

## Quick Links

- Auth module (pattern reference): `src/modules/auth/`
- Settings module: `src/modules/settings/`
- Generated API client: `src/shared/api/generated/116.api.ts`
- Shared validators: `src/shared/lib/utils/validators/validators.utils.ts`
- Notification utils: `src/shared/lib/utils/notification/notification.utils.ts`
