# Authorization — Documentation

Complete specification for implementing **permission-based access control** in the dashboard application.

## Context

The architecture for authorization is already defined in [`docs/architecture/auth-route-guard.md`](../architecture/auth-route-guard.md). This document covers the **implementation plan** — the concrete files to create, the order to build them, and how every dashboard resource maps to backend permissions.

## Table of Contents

### Documentations

| Document | Description |
| --- | --- |
| [Permission Map](./documentations/permission-map.md) | Every resource in the dashboard mapped to its required `resource:action` permissions |
| [Folder Structure](./documentations/folder-structure.md) | New and modified files, naming conventions |

### Implementation Specs

| Phase | Spec | Description | Files | Depends On |
| --- | --- | --- | --- | --- |
| 1 | [01-useAuthorization-hook.md](./implementation/specs/01-useAuthorization-hook.md) | Create the `useAuthorization` hook (single source of truth) | 1 new | None |
| 2 | [02-permission-route.md](./implementation/specs/02-permission-route.md) | Create the `PermissionRoute` component and update `routes.tsx` | 1 new, 1 modified | Phase 1 |
| 3 | [03-ui-level-access.md](./implementation/specs/03-ui-level-access.md) | Replace all hardcoded `isSuperAdmin = true`, protect UI elements | ~10 modified | Phase 1 |
| 4 | [04-navigation-filtering.md](./implementation/specs/04-navigation-filtering.md) | Filter sidebar navigation items by permission | 1 modified | Phase 1 |

## Architecture Reference

- [`docs/architecture/auth-route-guard.md`](../architecture/auth-route-guard.md) — the definitive architecture specification (hook API, route guard, data flow, SuperAdmin bypass)

## Quick Links

- Backend role enum: `apps/backend/src/Modules/Identity/Identity/Domain/Enums/EnumCoreUserRole.cs`
- Backend JWT claims: `apps/backend/src/Modules/Identity/Identity/Infrastructure/Services/JwtService.cs`
- Backend policies: `apps/backend/src/BuildingBlocks/Constants/Authorization/Policies/UserRolePolicies.cs`
- Frontend user entity: `src/modules/auth/domain/entities/IUser.ts`
- Frontend session store: `src/platform/session/presentation/store/`
- Frontend route config: `src/routes.tsx`
- Frontend SideNav: `src/shared/presentation/layouts/DashboardLayout/SideNav/index.tsx`
