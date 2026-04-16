# Phase 7: Shared UI Components

6 reusable presentational components (each with TSX + SCSS module). No dependencies on other phases — can be built in parallel.

**Ref**: [ui-components.md](../../documentations/ui-components.md), [field-specifications.md](../../documentations/field-specifications.md)

> **Note**: `ErrorAlert` already exists in the shared layer at `src/shared/presentation/ui/ErrorAlert/` and accepts `error: Failure | null | undefined`. Reuse it — do not create a settings-specific error component.

---

## `src/platform/settings/presentation/components/ui/SettingsSidebar/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `SettingsTab` type: `"profile" | "security" | "notification" | "account"`
- [ ] Define `ISettingsSidebarProps`: `activeTab: SettingsTab`, `onChange: (tab: SettingsTab) => void`
- [ ] Define `SETTINGS_TABS` constant array:
  | Key | Label | Icon |
  | --- | --- | --- |
  | profile | Profil | UserOutlined |
  | security | Sécurité | LockOutlined |
  | notification | Notifications | BellOutlined |
  | account | Compte | SettingOutlined |
- [ ] Render Ant Design `Menu` with `mode="inline"`, `selectedKeys={[activeTab]}`, `onClick` handler
- [ ] SCSS: sidebar width, border-right, active item highlight

---

## `src/platform/settings/presentation/components/ui/SettingsCard/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `ISettingsCardProps`: `title: string`, `onEdit?: () => void`, `editLabel?: string` (default "Modifier"), `children: ReactNode`
- [ ] Render Ant Design `Card` with header row: title (Typography.Title level=5) + optional edit Button
- [ ] Edit button only rendered when `onEdit` is provided
- [ ] SCSS: card spacing, header flex layout

---

## `src/platform/settings/presentation/components/ui/SettingsField/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `ISettingsFieldProps`: `label: string`, `value?: string | null`, `fallback?: string` (default "—")
- [ ] Render label (Typography.Text type="secondary") + value (Typography.Text) pair
- [ ] Display `fallback` when `value` is null/undefined/empty
- [ ] SCSS: label/value vertical layout, muted label color

---

## `src/platform/settings/presentation/components/ui/SessionCard/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `ISessionCardProps`: `session: ISession`, `loading: boolean`, `onRevoke: (id: string) => void`
- [ ] Device icon mapping (9 types):
  | Device | Icon |
  | --- | --- |
  | Desktop | DesktopOutlined |
  | Mobile | MobileOutlined |
  | Tablet | TabletOutlined |
  | Watch | ClockCircleOutlined |
  | Tv | DesktopOutlined |
  | Console | DesktopOutlined |
  | Car | CarOutlined |
  | IoT | ApiOutlined |
  | Unknown | QuestionCircleOutlined |
- [ ] Render session info:
  - Summary line: `{device} · {browser} · {platform}` (Typography.Text strong)
  - IP address: `IP : {ipAddress}` (Typography.Text secondary)
  - Client: Tag component
  - Created: formatted date in French
  - Expiration: formatted date in French
  - Status: Tag green="Actif" / red="Expiré"
- [ ] Revoke button: `Button` danger, size="small", label "Révoquer", visible only when `session.isActive`
- [ ] SCSS: card layout, info grid, button alignment

---

## `src/platform/settings/presentation/components/ui/RoleCard/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `IRoleCardProps`: `role: IRoleWithPermissions`
- [ ] Render Ant Design `Collapse.Panel`:
  - Header: role name (bold) + description (secondary) + status Tag (green "Actif" / red "Inactif")
  - Body: Permissions `Table` with `size="small"`, `pagination={false}`
- [ ] Table columns:
  | Header | dataIndex | Width | Render |
  | --- | --- | --- | --- |
  | Ressource | resource | 25% | Plain text |
  | Action | action | 20% | Tag |
  | Description | description | 40% | Plain text |
  | Statut | isActive | 15% | Tag green/red |
- [ ] Empty permissions: `Empty` with "Aucune permission"
- [ ] SCSS: panel header layout, badge spacing

---

## `src/platform/settings/presentation/components/ui/ComingSoon/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] No props required (purely presentational)
- [ ] Render centered layout:
  - `BellOutlined` icon (fontSize 48, muted color)
  - Title: "Bientôt disponible" (Typography.Title level=4)
  - Description: "Cette fonctionnalité est en cours de développement. Revenez bientôt !" (Typography.Paragraph secondary)
- [ ] Use Ant Design `Result` with `status="info"` or custom flex layout
- [ ] SCSS: center vertically and horizontally
