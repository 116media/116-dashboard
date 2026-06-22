import { type AwilixContainer, asClass } from "awilix";
import { ActivateCategoryUseCase } from "@/modules/catalog/application/usecases/activatecategory.usecase";
import { ActivatePackageUseCase } from "@/modules/catalog/application/usecases/activatepackage.usecase";
import { AddCategoryPricingUseCase } from "@/modules/catalog/application/usecases/addcategorypricing.usecase";
import { AddPackageSlotUseCase } from "@/modules/catalog/application/usecases/addpackageslot.usecase";
import { CreateCategoryUseCase } from "@/modules/catalog/application/usecases/createcategory.usecase";
import { CreateCustomerUseCase } from "@/modules/catalog/application/usecases/createcustomer.usecase";
import { CreatePackageUseCase } from "@/modules/catalog/application/usecases/createpackage.usecase";
import { DeactivateCategoryUseCase } from "@/modules/catalog/application/usecases/deactivatecategory.usecase";
import { DeactivatePackageUseCase } from "@/modules/catalog/application/usecases/deactivatepackage.usecase";
import { GetAllCategoriesUseCase } from "@/modules/catalog/application/usecases/getallcategories.usecase";
import { GetAllCustomersUseCase } from "@/modules/catalog/application/usecases/getallcustomers.usecase";
import { GetAllPackagesUseCase } from "@/modules/catalog/application/usecases/getallpackages.usecase";
import { GetCategoryByIdUseCase } from "@/modules/catalog/application/usecases/getcategorybyid.usecase";
import { GetCustomerByIdUseCase } from "@/modules/catalog/application/usecases/getcustomerbyid.usecase";
import { GetPackageByIdUseCase } from "@/modules/catalog/application/usecases/getpackagebyid.usecase";
import { PinCategoryToFeedUseCase } from "@/modules/catalog/application/usecases/pincategorytofeed.usecase";
import { RemoveCategoryPricingUseCase } from "@/modules/catalog/application/usecases/removecategorypricing.usecase";
import { RemovePackageSlotUseCase } from "@/modules/catalog/application/usecases/removepackageslot.usecase";
import { SetExclusiveCategoryUseCase } from "@/modules/catalog/application/usecases/setexclusivecategory.usecase";
import { UnpinCategoryFromFeedUseCase } from "@/modules/catalog/application/usecases/unpincategoryfromfeed.usecase";
import { UpdateCategoryUseCase } from "@/modules/catalog/application/usecases/updatecategory.usecase";
import { UpdateCategoryPricingUseCase } from "@/modules/catalog/application/usecases/updatecategorypricing.usecase";
import { UpdateCustomerUseCase } from "@/modules/catalog/application/usecases/updatecustomer.usecase";
import { UploadCategoryPosterUseCase } from "@/modules/catalog/application/usecases/uploadcategoryposter.usecase";
import { CatalogRepositoryImpl } from "@/modules/catalog/infrastructure/repositories/catalog.repository.impl";

/**
 * Registers all catalog module dependencies with the Awilix DI container.
 *
 * @param {AwilixContainer} container - The Awilix container instance
 */
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
        setExclusiveCategoryUseCase: asClass(SetExclusiveCategoryUseCase).transient(),
        pinCategoryToFeedUseCase: asClass(PinCategoryToFeedUseCase).transient(),
        unpinCategoryFromFeedUseCase: asClass(UnpinCategoryFromFeedUseCase).transient(),
        uploadCategoryPosterUseCase: asClass(UploadCategoryPosterUseCase).transient(),
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
        removePackageSlotUseCase: asClass(RemovePackageSlotUseCase).transient()
    });
}
