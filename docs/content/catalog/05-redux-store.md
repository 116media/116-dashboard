# Phase 5: Redux Store

Single `catalog` slice with 21 action thunks covering all 3 resources.

**Path:** `src/modules/catalog/presentation/store/`

---

## Constants

**File:** `constants.ts`

```ts
export const ActionType = {
    // Categories
    GetCategories: "catalog/getCategories",
    GetCategoryById: "catalog/getCategoryById",
    CreateCategory: "catalog/createCategory",
    UpdateCategory: "catalog/updateCategory",
    ActivateCategory: "catalog/activateCategory",
    DeactivateCategory: "catalog/deactivateCategory",
    AddCategoryPricing: "catalog/addCategoryPricing",
    UpdateCategoryPricing: "catalog/updateCategoryPricing",
    RemoveCategoryPricing: "catalog/removeCategoryPricing",

    // Customers
    GetCustomers: "catalog/getCustomers",
    GetCustomerById: "catalog/getCustomerById",
    CreateCustomer: "catalog/createCustomer",
    UpdateCustomer: "catalog/updateCustomer",

    // Packages
    GetPackages: "catalog/getPackages",
    GetPackageById: "catalog/getPackageById",
    CreatePackage: "catalog/createPackage",
    ActivatePackage: "catalog/activatePackage",
    DeactivatePackage: "catalog/deactivatePackage",
    AddPackageSlot: "catalog/addPackageSlot",
    RemovePackageSlot: "catalog/removePackageSlot",
} as const;

export const SliceName = { Catalog: "catalog" } as const;
```

> **Critical:** The suffix after `"catalog/"` must exactly match the state key. `ActionWrapperPending/Fulfilled/Rejected` extracts it via `action.type.split("/")[1]`.

---

## State Type

**File:** `type.ts`

```ts
type ICatalogState = {
    // Categories
    getCategories: IBasicInitialState<IPaginatedResult<ICategoryEntity>>;
    getCategoryById: IBasicInitialState<ICategoryEntity>;
    createCategory: IBasicInitialState<ICategoryEntity>;
    updateCategory: IBasicInitialState<ICategoryEntity>;
    activateCategory: IBasicInitialState<ICategoryEntity>;
    deactivateCategory: IBasicInitialState<ICategoryEntity>;
    addCategoryPricing: IBasicInitialState<ICategoryEntity>;
    updateCategoryPricing: IBasicInitialState<ICategoryEntity>;
    removeCategoryPricing: IBasicInitialState<void>;

    // Customers
    getCustomers: IBasicInitialState<IPaginatedResult<ICustomerEntity>>;
    getCustomerById: IBasicInitialState<ICustomerEntity>;
    createCustomer: IBasicInitialState<ICustomerEntity>;
    updateCustomer: IBasicInitialState<ICustomerEntity>;

    // Packages
    getPackages: IBasicInitialState<IPaginatedResult<IPackageEntity>>;
    getPackageById: IBasicInitialState<IPackageEntity>;
    createPackage: IBasicInitialState<IPackageEntity>;
    activatePackage: IBasicInitialState<IPackageEntity>;
    deactivatePackage: IBasicInitialState<IPackageEntity>;
    addPackageSlot: IBasicInitialState<IPackageEntity>;
    removePackageSlot: IBasicInitialState<void>;
};

type CatalogStateKey = keyof ICatalogState;
```

---

## Initial State

**File:** `state.ts`

Uses `createInitialState<T>()` for each key.

---

## Slice

**File:** `index.ts`

Uses `createSlice` with `clear` + `purge` reducers and `addCase` for all 21 actions × 3 lifecycle events (pending/fulfilled/rejected) = 63 `addCase` entries.

---

## Action Files (21 files)

One `createAsyncThunk` per endpoint:

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `getcategories.action.ts` | `IPaginationParams` | `IPaginatedResult<ICategoryEntity>` |
| `getcategorybyid.action.ts` | `string` | `ICategoryEntity` |
| `createcategory.action.ts` | `ICreateCategoryCredentials` | `ICategoryEntity` |
| `updatecategory.action.ts` | `{ id: string; data: IUpdateCategoryCredentials }` | `ICategoryEntity` |
| `activatecategory.action.ts` | `string` | `ICategoryEntity` |
| `deactivatecategory.action.ts` | `string` | `ICategoryEntity` |
| `addcategorypricing.action.ts` | `{ id: string; data: IAddCategoryPricingCredentials }` | `ICategoryEntity` |
| `updatecategorypricing.action.ts` | `{ id: string; pricingId: string; data: IUpdateCategoryPricingCredentials }` | `ICategoryEntity` |
| `removecategorypricing.action.ts` | `{ id: string; pricingId: string }` | `void` |
| `getcustomers.action.ts` | `IPaginationParams` | `IPaginatedResult<ICustomerEntity>` |
| `getcustomerbyid.action.ts` | `string` | `ICustomerEntity` |
| `createcustomer.action.ts` | `ICreateCustomerCredentials` | `ICustomerEntity` |
| `updatecustomer.action.ts` | `{ id: string; data: IUpdateCustomerCredentials }` | `ICustomerEntity` |
| `getpackages.action.ts` | `IPaginationParams` | `IPaginatedResult<IPackageEntity>` |
| `getpackagebyid.action.ts` | `string` | `IPackageEntity` |
| `createpackage.action.ts` | `ICreatePackageCredentials` | `IPackageEntity` |
| `activatepackage.action.ts` | `string` | `IPackageEntity` |
| `deactivatepackage.action.ts` | `string` | `IPackageEntity` |
| `addpackageslot.action.ts` | `{ id: string; data: IAddPackageSlotCredentials }` | `IPackageEntity` |
| `removepackageslot.action.ts` | `{ id: string; slotId: string }` | `void` |

---

## Integration

- [x] Add `catalog: catalogReducer` to `root.reducer.ts`
- [x] Extend `Cradle` interface in `service.locator.ts`
- [x] Call `registerCatalogDependencies(container)` in `service.locator.ts`

---

## TODO

- [x] Create `constants.ts`
- [x] Create `type.ts`
- [x] Create `state.ts`
- [x] Create all 21 action files (note: `getpackagebyid` and `removecategorypricing` bring the count to 21, not 20)
- [x] Create `index.ts` (slice)
- [x] Wire into `root.reducer.ts`
- [x] Wire into `service.locator.ts`
