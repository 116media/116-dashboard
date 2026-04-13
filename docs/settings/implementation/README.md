# Settings Module — Implementation Specs

Actionable TODO checklists for implementing the Settings module. Each spec file covers one phase, ordered so dependencies are built first.

Full documentation: [`../documentations/`](../documentations/)

---

## Phases

| Phase | Spec | Description | New Files | Depends On |
| --- | --- | --- | --- | --- |
| 1 | [01-domain-entities.md](specs/01-domain-entities.md) | Domain entity interfaces | 3 | None |
| 2 | [02-infrastructure-layer.md](specs/02-infrastructure-layer.md) | Repository port, impl, mapper, constants | 4 | Phase 1 |
| 3 | [03-application-usecases.md](specs/03-application-usecases.md) | 9 use case classes | 9 | Phase 1, 2 |
| 4 | [04-store-foundation.md](specs/04-store-foundation.md) | Redux slice: constants, types, state, slice | 4 | Phase 1 |
| 5 | [05-store-actions.md](specs/05-store-actions.md) | Async thunk actions (3 files) + slice update | 3+1 | Phase 3, 4 |
| 6 | [06-presentation-utilities.md](specs/06-presentation-utilities.md) | Form models, validators, notifications | 5 | None (parallel) |
| 7 | [07-shared-ui-components.md](specs/07-shared-ui-components.md) | SettingsSidebar, SettingsCard, SettingsField, SessionCard, RoleCard, ComingSoon | 12 | None (parallel) |
| 8 | [08-feature-components.md](specs/08-feature-components.md) | ChangePasswordForm, AccountInfoModal | 4 | Phase 5, 6, 7 |
| 9 | [09-containers-and-page.md](specs/09-containers-and-page.md) | 8 hooks, 4 containers, page refactor | 13+1 | Phase 5, 6, 7, 8 |
| 10 | [10-integration.md](specs/10-integration.md) | Root reducer, auth slice sync, verification | 2 modified | Phase 4, 9 |

---

## How to Use

1. Complete phases in order (1 → 10). Phases 6 and 7 can be done in parallel with 1–5.
2. Within each spec, complete TODOs sequentially.
3. Each TODO references the relevant documentation file for detailed requirements.
4. The existing `SettingsPage` placeholder is refactored in Phase 9.

## Totals

- **~60 new files** + **2 modified files**
- **4 tabs**: Profile, Security, Notification, Account
- **9 API operations**: getProfile, updateAccount, updateAvatar, changePassword, getRoles, getSessions, revokeSession, signOut, signOutAll
