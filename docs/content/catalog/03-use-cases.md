# Phase 3: Use Cases

One use case file per endpoint. All implement `IResultUseCase<TReq, TRes>`.

**Path:** `src/modules/catalog/application/usecases/`

---

## Categories (9 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getallcategories.usecase.ts` | `IPaginationParams` | `IPaginatedResult<ICategoryEntity>` |
| `getcategorybyid.usecase.ts` | `string` (id) | `ICategoryEntity` |
| `createcategory.usecase.ts` | `ICreateCategoryCredentials` | `ICategoryEntity` |
| `updatecategory.usecase.ts` | `{ id: string; data: IUpdateCategoryCredentials }` | `ICategoryEntity` |
| `activatecategory.usecase.ts` | `string` (id) | `ICategoryEntity` |
| `deactivatecategory.usecase.ts` | `string` (id) | `ICategoryEntity` |
| `addcategorypricing.usecase.ts` | `{ id: string; data: IAddCategoryPricingCredentials }` | `ICategoryEntity` |
| `updatecategorypricing.usecase.ts` | `{ id: string; pricingId: string; data: IUpdateCategoryPricingCredentials }` | `ICategoryEntity` |
| `removecategorypricing.usecase.ts` | `{ id: string; pricingId: string }` | `void` |

## Customers (4 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getallcustomers.usecase.ts` | `IPaginationParams` | `IPaginatedResult<ICustomerEntity>` |
| `getcustomerbyid.usecase.ts` | `string` (id) | `ICustomerEntity` |
| `createcustomer.usecase.ts` | `ICreateCustomerCredentials` | `ICustomerEntity` |
| `updatecustomer.usecase.ts` | `{ id: string; data: IUpdateCustomerCredentials }` | `ICustomerEntity` |

## Packages (7 use cases)

| File | Input | Output |
| --- | --- | --- |
| `getallpackages.usecase.ts` | `IPaginationParams` | `IPaginatedResult<IPackageEntity>` |
| `getpackagebyid.usecase.ts` | `string` (id) | `IPackageEntity` |
| `createpackage.usecase.ts` | `ICreatePackageCredentials` | `IPackageEntity` |
| `activatepackage.usecase.ts` | `string` (id) | `IPackageEntity` |
| `deactivatepackage.usecase.ts` | `string` (id) | `IPackageEntity` |
| `addpackageslot.usecase.ts` | `{ id: string; data: IAddPackageSlotCredentials }` | `IPackageEntity` |
| `removepackageslot.usecase.ts` | `{ id: string; slotId: string }` | `void` |

## Pattern

Each use case follows the same structure:

```ts
export class CreateCategoryUseCase implements IResultUseCase<ICreateCategoryCredentials, ICategoryEntity> {
    private readonly catalogRepository: ICatalogRepositoryPort;

    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }

    async execute(data: ICreateCategoryCredentials): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.createCategory(data);
    }
}
```

Use cases that take composite inputs (e.g., `id` + `data`) unwrap the object in `execute`:

```ts
async execute({ id, data }: { id: string; data: IUpdateCategoryCredentials }): Promise<Result<ICategoryEntity>> {
    return this.catalogRepository.updateCategory(id, data);
}
```

---

## TODO

- [ ] Create all 21 use case files with JSDoc
