# Settings — Field Specifications

Exact field-by-field specification for every card, modal form, inline form, table, and action across all settings tabs.

---

## Profile Tab

### Avatar Card — Display

| # | Element | Data Source | Ant Design Component | Fallback |
| --- | --- | --- | --- | --- |
| 1 | Avatar image | `user.avatar.storageUrl` | `Avatar` (size 64, shape circle) | User initials from `user.userName` |
| 2 | User name | `user.userName` | `Typography.Text` strong | — |
| 3 | Primary role | `user.roles[0].name` | `Typography.Text` type="secondary" | "Aucun rôle" |
| 4 | Location | `user.countryName` | `Typography.Text` type="secondary" | Hidden if null |

**Action button**: "Modifier" — opens native file picker (`<input type="file" accept="image/*" />` triggered programmatically).

---

### Avatar Card — Upload (No Modal)

| # | Field | Input Type | Accept | Max Size | Required |
| --- | --- | --- | --- | --- | --- |
| 1 | avatarFile | File (binary) | `image/png, image/jpeg, image/webp` | 10 MB (backend limit) | Yes |

**Sends to API**: `PATCH /api/v1/admin/me/avatar` as `multipart/form-data`.

---

### Account Info Card — Display

Two-column read-only field grid:

| # | Label (FR) | Data Source | Column | Fallback |
| --- | --- | --- | --- | --- |
| 1 | Nom d'utilisateur | `user.userName` | Left | — |
| 2 | Adresse e-mail | `user.email` | Right | — |
| 3 | Pays | `user.countryName` | Left | "—" |
| 4 | Téléphone | `user.countryDialCode` + " " + `user.partialPhoneNumber` | Right | "—" |

The phone number is displayed as a single combined value (e.g., "+250 788123456"). `countryIsoCode`, `countryDialCode` are not shown as separate fields.

**Action button**: "Modifier" — opens Account Info Modal.

---

### Account Info Modal — Form Fields

| # | Label (FR) | Field Name | Ant Design Component | Layout | Placeholder | Disabled | Required | Validation Rules |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Adresse e-mail | `email` | `Input` | Full width | — | **Yes** | — | None (not submitted) |
| 2 | Pseudo | `userName` | `Input` | Full width | "Pseudo" | No | **Yes** | Required, 2–50 chars |
| 3 | Indicatif téléphonique | `countryName` | `Select` (showSearch) | Full width | "Selectionnez indicatif téléphonique" | No | No | Required (via `countryNameValidator`) |
| 4 | Téléphone | `phonePartial` | `Input` with `prefix={country?.dialCode}` | Full width | "Ex: 815252801" | No | No | Numeric only |

**Country picker (field 3)**: Ant Design `Select` with `showSearch`, populated from a `countryList` constant. Each `Option` renders:

- Flag image (`<img>` from `country.flag`)
- Country name (truncated to 35 chars)
- Dial code (right-aligned, secondary text)

Selecting a country updates local `country` state, which drives the phone input prefix.

**Phone input (field 4)**: `Input` with `prefix={country?.dialCode}` showing the auto-derived dial code.

**Modal title**: "Information sur le compte"

**Modal width**: 520px

**Footer buttons**:

| # | Label (FR) | Ant Design Props | Action |
| --- | --- | --- | --- |
| 1 | Annuler | `Button` (default) | Close modal, reset form |
| 2 | Envoyer | `Button` (type="primary", htmlType="submit", loading) | Submit form |

**Payload sent to API** (`PATCH /api/v1/admin/me/profile`):

```ts
{
  email: string;                  // from field 1 (passed through but backend may ignore)
  userName: string;               // from field 2
  countryName: string | null;     // from field 3 (country Select value)
  countryIsoCode: string | null;  // derived from selected country object
  countryDialCode: string | null; // derived from selected country object
  countryFlag: string | null;     // derived from selected country object (flag URL)
  phonePartial: string | null;    // from field 4
}
```

`countryIsoCode`, `countryDialCode`, and `countryFlag` are **not separate form fields** — they are derived from the selected country in `countryList` on submit.

---

## Security Tab

### Change Password Card — Inline Form Fields

| # | Label (FR) | Field Name | Ant Design Component | Placeholder | Required | Validation Rules | Sent to API |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mot de passe actuel | `oldPassword` | `Input.Password` (visibilityToggle, prefix=IconLockOutlined) | "••••••••••••••" | **Yes** | Required | **Yes** |
| 2 | Nouveau mot de passe | `newPassword` | `Input.Password` (visibilityToggle, prefix=IconLockOutlined) | "••••••••••••••" | **Yes** | Required, regex: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$` | **Yes** |
| 3 | Confirmer le mot de passe | `confirmPassword` | `Input.Password` (visibilityToggle, prefix=IconLockOutlined) | "••••••••••••••" | **Yes** | Required, must match `newPassword` | **No** (frontend only) |

**Form properties**: `layout="vertical"`, `size="large"`, `validateTrigger={["onSubmit", "onBlur"]}`

**Card title**: "Changer le mot de passe"

**Submit button**:

| # | Label (FR) | Ant Design Props | Action |
| --- | --- | --- | --- |
| 1 | Mettre à jour | `Button` (type="primary", htmlType="submit", loading) | Submit form |

**Payload sent to API** (`PATCH /api/v1/admin/auth/change-password`):

```ts
{
  oldPassword: string;  // from field 1
  newPassword: string;  // from field 2
}
```

**Error display**: `ErrorAlert` component rendered between last field and submit button.

---

### Roles & Permissions Card — Collapsible Panels

**Card title**: "Rôles & Permissions"

Each role is an Ant Design `Collapse.Panel`:

#### Panel Header (per role)

| # | Element | Data Source | Ant Design Component | Fallback |
| --- | --- | --- | --- | --- |
| 1 | Role name | `role.name` | `Typography.Text` strong | — |
| 2 | Description | `role.description` | `Typography.Text` type="secondary" | — |
| 3 | Status badge | `role.isActive` | `Tag` color="green" or color="red" | — |

Badge values:
- `isActive === true` → `Tag` color="green", text: "Actif"
- `isActive === false` → `Tag` color="red", text: "Inactif"

#### Panel Body — Permissions Table (per role)

Ant Design `Table` with `size="small"`, `pagination={false}`, `dataSource={role.permissions}`:

| # | Column Header (FR) | `dataIndex` | Width | Render |
| --- | --- | --- | --- | --- |
| 1 | Ressource | `resource` | 25% | Plain text |
| 2 | Action | `action` | 20% | `Tag` (default color) |
| 3 | Description | `description` | 40% | Plain text |
| 4 | Statut | `isActive` | 15% | `Tag` color="green"/"red" → "Actif"/"Inactif" |

**Empty state** (no roles): `Empty` component with description "Aucun rôle assigné".

**Empty state** (role with no permissions): Table shows `Empty` with "Aucune permission".

**Read-only**: No action buttons, no edit, no delete.

---

### Sessions Card — Session List

**Card title**: "Sessions actives"

Each session is rendered as a bordered card (`Card` size="small", bordered):

#### Session Card Fields

| # | Element | Data Source | Render | Example |
| --- | --- | --- | --- | --- |
| 1 | Device icon | `session.device` | Conditional icon component | `DesktopOutlined`, `MobileOutlined`, `TabletOutlined` |
| 2 | Summary line | `session.device` + `session.browser` + `session.platform` | `Typography.Text` strong, joined with " · " | "Desktop · Chrome · Windows" |
| 3 | IP address | `session.ipAddress` | `Typography.Text` type="secondary", prefixed "IP : " | "IP : 192.168.1.1" |
| 4 | Client type | `session.client` | `Tag` (default) | "Dashboard", "MobileApp" |
| 5 | Created date | `session.createdAt` | `Typography.Text` type="secondary", formatted | "Créé le 15 mars 2026 à 14:30" |
| 6 | Expiration | `session.expiresAt` | `Typography.Text` type="secondary", formatted | "Expire le 15 avril 2026 à 14:30" |
| 7 | Status | `session.isActive` | `Tag` color="green"/"red" | "Actif" / "Expiré" |
| 8 | Revoke button | — | `Button` danger, size="small" | "Révoquer" |

#### Device Icon Mapping

| `session.device` | Icon | Label |
| --- | --- | --- |
| `Desktop` | `DesktopOutlined` | Desktop |
| `Mobile` | `MobileOutlined` | Mobile |
| `Tablet` | `TabletOutlined` | Tablet |
| `Watch` | `ClockCircleOutlined` | Watch |
| `Tv` | `DesktopOutlined` | TV |
| `Console` | `DesktopOutlined` | Console |
| `Car` | `CarOutlined` | Car |
| `IoT` | `ApiOutlined` | IoT |
| `Unknown` | `QuestionCircleOutlined` | Unknown |

#### Revoke Button

| # | Label (FR) | Ant Design Props | Visible When |
| --- | --- | --- | --- |
| 1 | Révoquer | `Button` (danger, size="small", loading=revokeLoading) | `session.isActive === true` |

#### Revoke Confirmation Modal

| Property | Value |
| --- | --- |
| Title | "Révoquer la session" |
| Content | "Êtes-vous sûr de vouloir révoquer cette session ? L'appareil sera déconnecté immédiatement." |
| OK text | "Révoquer" |
| OK button props | `{ danger: true }` |
| Cancel text | "Annuler" |

**Empty state** (no sessions): `Empty` component with description "Aucune session active".

---

## Notification Tab

### Coming Soon Card

Single centered card — no fields, no forms, no tables.

| # | Element | Ant Design Component | Value |
| --- | --- | --- | --- |
| 1 | Icon | `BellOutlined` (fontSize: 48, color: muted) | — |
| 2 | Title | `Typography.Title` level=4 | "Bientôt disponible" |
| 3 | Description | `Typography.Paragraph` type="secondary" | "Cette fonctionnalité est en cours de développement. Revenez bientôt !" |

Can use `Result` component with `status="info"` or a custom empty state layout. Centered vertically and horizontally within the content area.

---

## Account Tab

### Sign Out Card

| # | Element | Ant Design Component | Value |
| --- | --- | --- | --- |
| 1 | Card title | `Typography.Title` level=5 | "Déconnexion" |
| 2 | Description | `Typography.Paragraph` type="secondary" | "Se déconnecter de cet appareil." |
| 3 | Action button | `Button` (default) | "Se déconnecter" |

#### Sign Out Confirmation Modal

| Property | Value |
| --- | --- |
| Title | "Déconnexion" |
| Content | "Êtes-vous sûr de vouloir vous déconnecter ?" |
| OK text | "Se déconnecter" |
| OK button props | `{}` (default) |
| Cancel text | "Annuler" |

---

### Sign Out All Devices Card

| # | Element | Ant Design Component | Value |
| --- | --- | --- | --- |
| 1 | Card title | `Typography.Title` level=5 | "Déconnexion de tous les appareils" |
| 2 | Description | `Typography.Paragraph` type="secondary" | "Vous serez déconnecté de tous les appareils sur lesquels vous êtes actuellement connecté." |
| 3 | Action button | `Button` (default, danger=true) | "Se déconnecter de tous les appareils" |

#### Sign Out All Confirmation Modal

| Property | Value |
| --- | --- |
| Title | "Déconnexion de tous les appareils" |
| Content | "Vous serez déconnecté de tous les appareils. Vous devrez vous reconnecter sur chaque appareil." |
| OK text | "Confirmer" |
| OK button props | `{ danger: true }` |
| Cancel text | "Annuler" |

---

## Settings Sidebar

Ant Design `Menu` (mode="inline", selectedKeys={[activeTab]}):

| # | Key | Label (FR) | Icon | Always Visible |
| --- | --- | --- | --- | --- |
| 1 | `profile` | Profil | `UserOutlined` | Yes |
| 2 | `security` | Sécurité | `LockOutlined` | Yes |
| 3 | `notification` | Notifications | `BellOutlined` | Yes |
| 4 | `account` | Compte | `SettingOutlined` | Yes |

Default active tab: `profile`.

---

## Summary: All Interactive Elements

### Modal Forms (1 total)

| Modal | Tab | Trigger | Fields | Submit Endpoint |
| --- | --- | --- | --- | --- |
| Account Info Modal | Profile | "Modifier" on account info card | email (disabled), userName, countryName (Select picker), phonePartial (Input with dial code prefix) | `PATCH /admin/me/profile` |

### Inline Forms (1 total)

| Form | Tab | Fields | Submit Endpoint |
| --- | --- | --- | --- |
| Change Password | Security | oldPassword, newPassword, confirmPassword | `PATCH /admin/auth/change-password` |

### File Uploads (1 total)

| Upload | Tab | Trigger | Accept | Endpoint |
| --- | --- | --- | --- | --- |
| Avatar | Profile | "Modifier" on avatar card | `image/*` | `PATCH /admin/me/avatar` |

### Read-Only Tables (1 total)

| Table | Tab | Columns | Data Source |
| --- | --- | --- | --- |
| Permissions (per role) | Security | Ressource, Action, Description, Statut | `role.permissions[]` |

### Card Lists (1 total)

| List | Tab | Card Fields | Action |
| --- | --- | --- | --- |
| Sessions | Security | device+browser+platform, IP, client, created, expires, status | Révoquer (with confirm) |

### Collapsible Panels (1 total)

| Panel | Tab | Header | Body |
| --- | --- | --- | --- |
| Roles | Security | name, description, status badge | Permissions table |

### Action Buttons with Confirmation (4 total)

| Button | Tab | Confirmation Modal | Endpoint |
| --- | --- | --- | --- |
| Révoquer (per session) | Security | "Révoquer la session" | `POST /public/me/sessions/revoke/{id}` |
| Se déconnecter | Account | "Déconnexion" | `POST /admin/auth/sign-out` |
| Se déconnecter de tous les appareils | Account | "Déconnexion de tous les appareils" | `POST /admin/auth/sign-out-all` |

### Static Displays (1 total)

| Display | Tab | Content |
| --- | --- | --- |
| Coming Soon | Notification | Icon + "Bientôt disponible" + description |
