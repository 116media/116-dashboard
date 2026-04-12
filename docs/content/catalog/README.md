# Catalog Module — Documentation

> **UI Label:** This module is displayed as **"Catalogue"** in the dashboard navigation as its own top-level nav group.

Product catalog management: **categories**, **packages**, and **customers**.

> **Status:** Implemented — all 20 use cases, 105+ files, full CRUD with pricing and slot management panels.

## Overview

The Catalog module manages the "product catalog" of the B2B content platform:

- **Categories** — content categories with pricing tiers (e.g., "Artist Profile", "116 Le Focus"). Every article and video must belong to one category.
- **Packages** — bundle deals with slots pointing at categories, offering flat pricing for multiple content items.
- **Customers** — B2B clients who commission content through the platform.

## Backend Endpoints (21)

### Categories (9 endpoints)

| Method | Route | Auth |
| --- | --- | --- |
| POST | `/api/v1/admin/categories` | SuperAdminOnly |
| PUT | `/api/v1/admin/categories/{id}` | SuperAdminOnly |
| PATCH | `/api/v1/admin/categories/{id}/activate` | AdminOrSuperAdmin |
| PATCH | `/api/v1/admin/categories/{id}/deactivate` | AdminOrSuperAdmin |
| POST | `/api/v1/admin/categories/{id}/pricing` | SuperAdminOnly |
| PUT | `/api/v1/admin/categories/{id}/pricing/{pricingId}` | SuperAdminOnly |
| DELETE | `/api/v1/admin/categories/{id}/pricing/{pricingId}` | SuperAdminOnly |
| GET | `/api/v1/admin/categories` | AdminOrSuperAdmin |
| GET | `/api/v1/admin/categories/{id}` | AdminOrSuperAdmin |

### Customers (4 endpoints)

| Method | Route | Auth |
| --- | --- | --- |
| POST | `/api/v1/admin/customers` | AdminOrSuperAdmin |
| PUT | `/api/v1/admin/customers/{id}` | AdminOrSuperAdmin |
| GET | `/api/v1/admin/customers` | AdminOrSuperAdmin |
| GET | `/api/v1/admin/customers/{id}` | AdminOrSuperAdmin |

### Packages (7 endpoints)

| Method | Route | Auth |
| --- | --- | --- |
| POST | `/api/v1/admin/packages` | SuperAdminOnly |
| PATCH | `/api/v1/admin/packages/{id}/activate` | AdminOrSuperAdmin |
| PATCH | `/api/v1/admin/packages/{id}/deactivate` | AdminOrSuperAdmin |
| POST | `/api/v1/admin/packages/{id}/slots` | SuperAdminOnly |
| DELETE | `/api/v1/admin/packages/{id}/slots/{slotId}` | SuperAdminOnly |
| GET | `/api/v1/admin/packages` | AdminOrSuperAdmin |
| GET | `/api/v1/admin/packages/{id}` | AdminOrSuperAdmin |

## Key Entities

- **CategoryEntity** — name, slug, description, contentTypeId, isFree, isActive + pricing tiers
- **CustomerEntity** — fullName, email, phone, company, notes
- **PackageEntity** — name, description, flatPriceUsd, isActive + slots
- **PackageSlotEntity** — categoryId, isRequired, quantity

## Module Path

`src/modules/catalog/`

## Dependencies

- Références module (content types, pricing tiers)
