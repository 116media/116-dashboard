# Roles & Permissions — Implementation Specs

Actionable TODO checklists for implementing the Roles & Permissions module. Each spec file covers one phase, ordered so dependencies are built first.

Full documentation: [`../documentations/`](../documentations/)

---

## Phases

| Phase | Spec | Description | New Files | Depends On |
| --- | --- | --- | --- | --- |
| 1 | [01-shared-crud-components.md](specs/01-shared-crud-components.md) | Reusable table, modal, filter components | ~10 | None |
| 2 | [02-roles-domain-infra.md](specs/02-roles-domain-infra.md) | Roles domain entities, repository, mapper, use cases, DI | ~18 | Phase 1 |
| 3 | [03-roles-store-actions.md](specs/03-roles-store-actions.md) | Roles Redux store, thunks, constants | ~16 | Phase 2 |
| 4 | [04-roles-presentation.md](specs/04-roles-presentation.md) | Roles hooks, forms, table, containers, page | ~12 | Phase 3 |
| 5 | [05-permissions-domain-infra.md](specs/05-permissions-domain-infra.md) | Permissions domain, repository, use cases, DI | ~15 | Phase 1 |
| 6 | [06-permissions-store-actions.md](specs/06-permissions-store-actions.md) | Permissions Redux store, thunks | ~13 | Phase 5 |
| 7 | [07-permissions-presentation.md](specs/07-permissions-presentation.md) | Permissions hooks, forms, table, containers, page | ~12 | Phase 6 |
| 8 | [08-role-permission-association.md](specs/08-role-permission-association.md) | Permission picker, bulk update, role detail | ~5 | Phase 4 + 7 |
| 9 | [09-integration.md](specs/09-integration.md) | Routes, navigation, root reducer, verification | 0 (modify only) | All |

---

## How to Use

1. Complete phases in order (1 → 9). Phases 2-4 (roles) and 5-7 (permissions) can run in parallel after Phase 1.
2. Within each spec, complete TODOs sequentially.
3. Each TODO references the relevant documentation file for detailed requirements.
4. The existing `src/modules/roles/` and `src/modules/permissions/` scaffolds (with `.gitkeep`) are the starting point.

## Totals

- **~105 new files** + **~7 modified files**
- **2 pages**: Roles, Permissions
- **22 API operations**: 11 roles + 9 permissions + 3 association
- **8 shared CRUD components** reusable across any future module

## Pattern References

- Auth module: `src/modules/auth/` — repository port, impl, use cases, thunks, hooks
- Settings module: `src/platform/settings/` — validators, notifications, containers, forms
- Kinix dashboard: `kinix_dashboard/src/` — CRUD table, modal, action patterns (adapted, not copied)
