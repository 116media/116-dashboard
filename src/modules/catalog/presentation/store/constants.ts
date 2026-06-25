/**
 * Redux action type constants for the catalog module.
 */
export const ActionType = {
    GetAllCategories: "Catalog/getAllCategories",
    GetCategoryById: "Catalog/getCategoryById",
    CreateCategory: "Catalog/createCategory",
    UpdateCategory: "Catalog/updateCategory",
    ActivateCategory: "Catalog/activateCategory",
    DeactivateCategory: "Catalog/deactivateCategory",
    SetExclusiveCategory: "Catalog/setExclusiveCategory",
    UploadCategoryPoster: "Catalog/uploadCategoryPoster",
    AddCategoryPricing: "Catalog/addCategoryPricing",
    UpdateCategoryPricing: "Catalog/updateCategoryPricing",
    RemoveCategoryPricing: "Catalog/removeCategoryPricing",
    GetAllCustomers: "Catalog/getAllCustomers",
    GetCustomerById: "Catalog/getCustomerById",
    CreateCustomer: "Catalog/createCustomer",
    UpdateCustomer: "Catalog/updateCustomer",
    GetAllPackages: "Catalog/getAllPackages",
    GetPackageById: "Catalog/getPackageById",
    CreatePackage: "Catalog/createPackage",
    ActivatePackage: "Catalog/activatePackage",
    DeactivatePackage: "Catalog/deactivatePackage",
    AddPackageSlot: "Catalog/addPackageSlot",
    RemovePackageSlot: "Catalog/removePackageSlot"
} as const;

/**
 * Redux slice name for the catalog module.
 */
export const SliceName = {
    Catalog: "catalog"
} as const;
