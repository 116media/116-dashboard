# Phase 3: UI-Level Access Control

Replace all hardcoded `isSuperAdmin = true` with the `useAuthorization` hook and protect UI elements.

**Depends on**: Phase 1 (`useAuthorization` hook)

---

## Overview

Currently, two containers hardcode `const isSuperAdmin = true` with a `// TODO` comment. This means every user sees all mutation buttons regardless of their actual role. The backend rejects unauthorized requests with 403, but the UI should hide them proactively.

---

## Files to Modify

### 1. `src/modules/roles/presentation/containers/RolesListContainer/index.tsx`

- [ ] Remove `// TODO: implement useIsSuperAdmin hook` and `const isSuperAdmin = true`
- [ ] Import `useAuthorization` from `@/modules/auth/presentation/hooks/UseAuthorization`
- [ ] Add `const { isSuperAdmin } = useAuthorization();`
- [ ] The rest of the code already uses `isSuperAdmin` correctly — no other changes needed

### 2. `src/modules/permissions/presentation/containers/PermissionsListContainer/index.tsx`

- [ ] Same changes as RolesListContainer above

### 3. Future modules (when implemented)

When Videos, Articles, Ads, Users, and Admins pages are implemented, they should follow the same pattern:

```tsx
const { isSuperAdmin, hasPermission } = useAuthorization();

// Hide create button for non-SuperAdmin
<PageHeader
    onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
    createLabel="Créer un article"
/>

// Hide mutation actions in table dropdown
{
    key: "delete",
    label: "Supprimer",
    danger: true,
    onClick: () => onAction("delete", record),
    hidden: !isSuperAdmin
}

// Future: permission-based check
{
    key: "publish",
    label: "Publier",
    onClick: () => onAction("publish", record),
    hidden: !hasPermission({ resource: "articles", action: "publish" })
}
```

---

## Pattern Summary

| Check | When to Use | Example |
| --- | --- | --- |
| `isSuperAdmin` | Mutation actions that require SuperAdmin role | Create, update, delete, activate, deactivate buttons |
| `isAdminOrSuperAdmin` | Read-level access for admin features | Should not be needed (route guard handles this) |
| `hasPermission(check)` | Future fine-grained permission checks | `hasPermission({ resource: "articles", action: "publish" })` |

---

## Verification

- [ ] Log in as Admin → Roles page shows table but no create button, no dropdown actions
- [ ] Log in as SuperAdmin → Roles page shows create button and all dropdown actions
- [ ] Same behavior on Permissions page
- [ ] Backend 403 never reached from UI (actions are hidden before the user can trigger them)
