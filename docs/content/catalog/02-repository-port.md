# Phase 2: Repository Port

Single repository port for all 3 catalog resources.

**File:** `src/modules/catalog/application/repositories/catalog.repository.port.ts`

---

## Interface

```ts
interface ICatalogRepositoryPort {
    // Categories (9 methods)
    getAllCategories(params: IPaginationParams): Promise<Result<IPaginatedResult<ICategoryEntity>>>;
    getCategoryById(id: string): Promise<Result<ICategoryEntity>>;
    createCategory(data: ICreateCategoryCredentials): Promise<Result<ICategoryEntity>>;
    updateCategory(id: string, data: IUpdateCategoryCredentials): Promise<Result<ICategoryEntity>>;
    activateCategory(id: string): Promise<Result<ICategoryEntity>>;
    deactivateCategory(id: string): Promise<Result<ICategoryEntity>>;
    addCategoryPricing(id: string, data: IAddCategoryPricingCredentials): Promise<Result<ICategoryEntity>>;
    updateCategoryPricing(id: string, pricingId: string, data: IUpdateCategoryPricingCredentials): Promise<Result<ICategoryEntity>>;
    removeCategoryPricing(id: string, pricingId: string): Promise<Result<void>>;

    // Customers (4 methods)
    getAllCustomers(params: IPaginationParams): Promise<Result<IPaginatedResult<ICustomerEntity>>>;
    getCustomerById(id: string): Promise<Result<ICustomerEntity>>;
    createCustomer(data: ICreateCustomerCredentials): Promise<Result<ICustomerEntity>>;
    updateCustomer(id: string, data: IUpdateCustomerCredentials): Promise<Result<ICustomerEntity>>;

    // Packages (7 methods)
    getAllPackages(params: IPaginationParams): Promise<Result<IPaginatedResult<IPackageEntity>>>;
    getPackageById(id: string): Promise<Result<IPackageEntity>>;
    createPackage(data: ICreatePackageCredentials): Promise<Result<IPackageEntity>>;
    activatePackage(id: string): Promise<Result<IPackageEntity>>;
    deactivatePackage(id: string): Promise<Result<IPackageEntity>>;
    addPackageSlot(id: string, data: IAddPackageSlotCredentials): Promise<Result<IPackageEntity>>;
    removePackageSlot(id: string, slotId: string): Promise<Result<void>>;
}
```

## Design Decision

One shared port instead of 3 separate ports because:
- All 3 resources belong to the same backend sub-module
- They share the same repository implementation class
- It avoids 3 port files that would each be small in isolation
- The catalog resources are related by domain (pricing, slots reference categories)

---

## TODO

- [x] Create `catalog.repository.port.ts` with JSDoc on the interface and every method
