# Roles & Permissions Module — Documentation

Complete specification for the **Roles & Permissions** CRUD feature in the dashboard application. This module enables SuperAdmin users to manage roles, permissions, and role-permission associations.

## Table of Contents

### Documentations

| Document | Description |
| --- | --- |
| [Overview](./documentations/overview.md) | Feature overview, user stories, authorization rules |
| [API Endpoints](./documentations/api-endpoints.md) | All 22 endpoints with request/response DTOs |
| [Folder Structure](./documentations/folder-structure.md) | Module file tree and naming conventions |
| [Redux Store](./documentations/redux-store.md) | State shape, thunk pattern, slice design |
| [UI Components](./documentations/ui-components.md) | Shared CRUD components, table/modal/form patterns |
| [Field Specifications](./documentations/field-specifications.md) | Form fields, table columns, validation rules |

### Implementation Specs

| Phase | Spec | Description | New Files | Depends On |
| --- | --- | --- | --- | --- |
| 1 | [01-shared-crud-components.md](./implementation/specs/01-shared-crud-components.md) | Reusable CRUD components (table, modal, filter) | ~10 | None |
| 2 | [02-roles-domain-infra.md](./implementation/specs/02-roles-domain-infra.md) | Roles domain entities, repository, mapper, use cases, DI | ~18 | Phase 1 |
| 3 | [03-roles-store-actions.md](./implementation/specs/03-roles-store-actions.md) | Roles Redux store, thunks, constants | ~16 | Phase 2 |
| 4 | [04-roles-presentation.md](./implementation/specs/04-roles-presentation.md) | Roles hooks, forms, table, containers, page | ~12 | Phase 3 |
| 5 | [05-permissions-domain-infra.md](./implementation/specs/05-permissions-domain-infra.md) | Permissions domain, repository, use cases, DI | ~15 | Phase 1 |
| 6 | [06-permissions-store-actions.md](./implementation/specs/06-permissions-store-actions.md) | Permissions Redux store, thunks | ~13 | Phase 5 |
| 7 | [07-permissions-presentation.md](./implementation/specs/07-permissions-presentation.md) | Permissions hooks, forms, table, containers, page | ~12 | Phase 6 |
| 8 | [08-role-permission-association.md](./implementation/specs/08-role-permission-association.md) | Permission picker, bulk update, role detail | ~5 | Phase 4 + 7 |
| 9 | [09-integration.md](./implementation/specs/09-integration.md) | Routes, navigation, root reducer, verification | ~0 (modify) | All phases |

## Quick Links

- Backend roles module: `apps/backend/src/Modules/Identity/Identity/Application/Roles/`
- Backend permissions: same module, under `UseCases/Admin/Commands|Queries/`
- Generated API client: `src/shared/infrastructure/api/generated/116.api.ts`
- Existing roles module (empty scaffold): `src/modules/roles/`
- Existing permissions module (empty scaffold): `src/modules/permissions/`
- Shared Result/Failure types: `src/shared/domain/types/result.ts`, `src/shared/domain/failures/failure.ts`
- ProblemMapper: `src/shared/infrastructure/mappers/problem.mapper.ts`
- ErrorAlert component: `src/shared/presentation/ui/ErrorAlert/`
- StateRenderer component: `src/shared/presentation/ui/StateRenderer/`
- Notification utility: `src/shared/presentation/utils/notification/notification.utils.ts`
- DI container: `src/shared/infrastructure/service.locator.ts`

## Architecture Reference

This module follows the same Clean Architecture and error handling patterns documented in:

- [Settings module docs](../settings/) — the primary implementation reference
- [Dependency injection docs](../dependency-injection/) — Awilix container design
- [Error handling docs](../../docs/error-handling/) — Result/Failure pattern

## Authorization

| Operation | Required Role |
| --- | --- |
| List roles/permissions | Admin or SuperAdmin |
| View role/permission details | Admin or SuperAdmin |
| Create, update, delete, activate/deactivate | SuperAdmin only |
| Manage role-permission associations | SuperAdmin only |

Mutation buttons must be hidden in the UI for Admin users.
