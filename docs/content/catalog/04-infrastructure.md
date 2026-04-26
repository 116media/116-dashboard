# Phase 4: Infrastructure

Mapper, repository implementation, and DI registration.

**Path:** `src/modules/catalog/infrastructure/`

---

## Mapper

**File:** `mappers/catalog.mapper.ts`

```ts
export const CatalogMapper = {
    categoryPricingFromDto(dto: CategoryPricingDto): ICategoryPricingEntity,
    categoryFromDto(dto: CategoryDto): ICategoryEntity,
    customerFromDto(dto: CustomerDto): ICustomerEntity,
    packageSlotFromDto(dto: PackageSlotDto): IPackageSlotEntity,
    packageFromDto(dto: PackageDto): IPackageEntity,
} as const;
```

Each method maps the generated DTO fields to the domain entity interface. Only include fields that the DTO actually provides. The `categoryFromDto` mapper calls `categoryPricingFromDto` for each element in `dto.pricing`. The `packageFromDto` mapper calls `packageSlotFromDto` for each element in `dto.slots`.

---

## Repository Implementation

**File:** `repositories/catalog.repository.impl.ts`

Implements `ICatalogRepositoryPort`. Each method follows the try/catch pattern:

```ts
async getAllCategories(params: IPaginationParams): Promise<Result<IPaginatedResult<ICategoryEntity>>> {
    try {
        const response = await apiClient.api.adminGetAllCategories(params);
        return ok({
            items: response.data.items.map(CatalogMapper.categoryFromDto),
            total: response.data.total,
            page: response.data.page,
            pageSize: response.data.pageSize,
        });
    } catch (error) {
        return err(ProblemMapper.toFailure(error));
    }
}
```

### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `getAllCategories` | `apiClient.api.adminGetAllCategories(params)` |
| `getCategoryById` | `apiClient.api.adminGetCategoryById(id)` |
| `createCategory` | `apiClient.api.adminCreateCategory(data)` |
| `updateCategory` | `apiClient.api.adminUpdateCategory(id, data)` |
| `activateCategory` | `apiClient.api.adminActivateCategory(id)` |
| `deactivateCategory` | `apiClient.api.adminDeactivateCategory(id)` |
| `addCategoryPricing` | `apiClient.api.adminAddCategoryPricing(id, data)` |
| `updateCategoryPricing` | `apiClient.api.adminUpdateCategoryPricing(id, pricingId, data)` |
| `removeCategoryPricing` | `apiClient.api.adminRemoveCategoryPricing(id, pricingId)` |
| `getAllCustomers` | `apiClient.api.adminGetAllCustomers(params)` |
| `getCustomerById` | `apiClient.api.adminGetCustomerById(id)` |
| `createCustomer` | `apiClient.api.adminCreateCustomer(data)` |
| `updateCustomer` | `apiClient.api.adminUpdateCustomer(id, data)` |
| `getAllPackages` | `apiClient.api.adminGetAllPackages(params)` |
| `getPackageById` | `apiClient.api.adminGetPackageById(id)` |
| `createPackage` | `apiClient.api.adminCreatePackage(data)` |
| `activatePackage` | `apiClient.api.adminActivatePackage(id)` |
| `deactivatePackage` | `apiClient.api.adminDeactivatePackage(id)` |
| `addPackageSlot` | `apiClient.api.adminAddPackageSlot(id, data)` |
| `removePackageSlot` | `apiClient.api.adminRemovePackageSlot(id, slotId)` |

> **Important:** Verify exact method names against the generated API client before implementing. Some methods may be named differently (e.g., `createCategory` vs `adminCreateCategory`).

---

## DI Registration

**File:** `dependencies/catalog.dependencies.ts`

```ts
export function registerCatalogDependencies(container: AwilixContainer): void {
    container.register({
        catalogRepository: asClass(CatalogRepositoryImpl).singleton(),

        // Categories
        getAllCategoriesUseCase: asClass(GetAllCategoriesUseCase).transient(),
        getCategoryByIdUseCase: asClass(GetCategoryByIdUseCase).transient(),
        createCategoryUseCase: asClass(CreateCategoryUseCase).transient(),
        updateCategoryUseCase: asClass(UpdateCategoryUseCase).transient(),
        activateCategoryUseCase: asClass(ActivateCategoryUseCase).transient(),
        deactivateCategoryUseCase: asClass(DeactivateCategoryUseCase).transient(),
        addCategoryPricingUseCase: asClass(AddCategoryPricingUseCase).transient(),
        updateCategoryPricingUseCase: asClass(UpdateCategoryPricingUseCase).transient(),
        removeCategoryPricingUseCase: asClass(RemoveCategoryPricingUseCase).transient(),

        // Customers
        getAllCustomersUseCase: asClass(GetAllCustomersUseCase).transient(),
        getCustomerByIdUseCase: asClass(GetCustomerByIdUseCase).transient(),
        createCustomerUseCase: asClass(CreateCustomerUseCase).transient(),
        updateCustomerUseCase: asClass(UpdateCustomerUseCase).transient(),

        // Packages
        getAllPackagesUseCase: asClass(GetAllPackagesUseCase).transient(),
        getPackageByIdUseCase: asClass(GetPackageByIdUseCase).transient(),
        createPackageUseCase: asClass(CreatePackageUseCase).transient(),
        activatePackageUseCase: asClass(ActivatePackageUseCase).transient(),
        deactivatePackageUseCase: asClass(DeactivatePackageUseCase).transient(),
        addPackageSlotUseCase: asClass(AddPackageSlotUseCase).transient(),
        removePackageSlotUseCase: asClass(RemovePackageSlotUseCase).transient(),
    });
}
```

Call `registerCatalogDependencies(container)` in `service.locator.ts` and extend the `Cradle` interface with all 22 entries (1 repository + 21 use cases).

---

## TODO

- [ ] Create `catalog.mapper.ts` with JSDoc
- [ ] Create `catalog.repository.impl.ts` with JSDoc
- [ ] Create `catalog.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`
