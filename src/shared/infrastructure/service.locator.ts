import { createContainer, InjectionMode } from "awilix";
import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ForgotPasswordUseCase } from "@/modules/auth/application/usecases/forgotpassword.usecase";
import type { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import type { ResendOtpUseCase } from "@/modules/auth/application/usecases/resendotp.usecase";
import type { ResetPasswordUseCase } from "@/modules/auth/application/usecases/resetpassword.usecase";
import type { SignOutUseCase } from "@/modules/auth/application/usecases/signout.usecase";
import type { SignOutAllUseCase } from "@/modules/auth/application/usecases/signoutall.usecase";
import type { VerifyOtpUseCase } from "@/modules/auth/application/usecases/verifyotp.usecase";
import { registerAuthDependencies } from "@/modules/auth/infrastructure/dependencies/auth.dependencies";
import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ActivateCategoryUseCase } from "@/modules/catalog/application/usecases/activatecategory.usecase";
import type { ActivatePackageUseCase } from "@/modules/catalog/application/usecases/activatepackage.usecase";
import type { AddCategoryPricingUseCase } from "@/modules/catalog/application/usecases/addcategorypricing.usecase";
import type { AddPackageSlotUseCase } from "@/modules/catalog/application/usecases/addpackageslot.usecase";
import type { CreateCategoryUseCase } from "@/modules/catalog/application/usecases/createcategory.usecase";
import type { CreateCustomerUseCase } from "@/modules/catalog/application/usecases/createcustomer.usecase";
import type { CreatePackageUseCase } from "@/modules/catalog/application/usecases/createpackage.usecase";
import type { DeactivateCategoryUseCase } from "@/modules/catalog/application/usecases/deactivatecategory.usecase";
import type { DeactivatePackageUseCase } from "@/modules/catalog/application/usecases/deactivatepackage.usecase";
import type { GetAllCategoriesUseCase } from "@/modules/catalog/application/usecases/getallcategories.usecase";
import type { GetAllCustomersUseCase } from "@/modules/catalog/application/usecases/getallcustomers.usecase";
import type { GetAllPackagesUseCase } from "@/modules/catalog/application/usecases/getallpackages.usecase";
import type { GetCategoryByIdUseCase } from "@/modules/catalog/application/usecases/getcategorybyid.usecase";
import type { GetCustomerByIdUseCase } from "@/modules/catalog/application/usecases/getcustomerbyid.usecase";
import type { GetPackageByIdUseCase } from "@/modules/catalog/application/usecases/getpackagebyid.usecase";
import type { RemoveCategoryPricingUseCase } from "@/modules/catalog/application/usecases/removecategorypricing.usecase";
import type { RemovePackageSlotUseCase } from "@/modules/catalog/application/usecases/removepackageslot.usecase";
import type { UpdateCategoryUseCase } from "@/modules/catalog/application/usecases/updatecategory.usecase";
import type { UpdateCategoryPricingUseCase } from "@/modules/catalog/application/usecases/updatecategorypricing.usecase";
import type { UpdateCustomerUseCase } from "@/modules/catalog/application/usecases/updatecustomer.usecase";
import { registerCatalogDependencies } from "@/modules/catalog/infrastructure/dependencies/catalog.dependencies";
import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { AddItemToOrderUseCase } from "@/modules/commerce/application/usecases/additemtoorder.usecase";
import type { AddTierToItemUseCase } from "@/modules/commerce/application/usecases/addtiertoitem.usecase";
import type { AttachPaymentProofUseCase } from "@/modules/commerce/application/usecases/attachpaymentproof.usecase";
import type { CancelOrderUseCase } from "@/modules/commerce/application/usecases/cancelorder.usecase";
import type { CreateOrderUseCase } from "@/modules/commerce/application/usecases/createorder.usecase";
import type { EditItemUseCase } from "@/modules/commerce/application/usecases/edititem.usecase";
import type { EditOrderUseCase } from "@/modules/commerce/application/usecases/editorder.usecase";
import type { GetCustomerOrdersUseCase } from "@/modules/commerce/application/usecases/getcustomerorders.usecase";
import type { GetOrderByIdUseCase } from "@/modules/commerce/application/usecases/getorderbyid.usecase";
import type { GetOrderPaymentUseCase } from "@/modules/commerce/application/usecases/getorderpayment.usecase";
import type { ListOrdersUseCase } from "@/modules/commerce/application/usecases/listorders.usecase";
import type { ListPaymentsUseCase } from "@/modules/commerce/application/usecases/listpayments.usecase";
import type { ListPendingPaymentOrdersUseCase } from "@/modules/commerce/application/usecases/listpendingpaymentorders.usecase";
import type { RejectPaymentUseCase } from "@/modules/commerce/application/usecases/rejectpayment.usecase";
import type { RemoveItemUseCase } from "@/modules/commerce/application/usecases/removeitem.usecase";
import type { RemoveItemTierUseCase } from "@/modules/commerce/application/usecases/removeitemtier.usecase";
import type { SubmitOrderUseCase } from "@/modules/commerce/application/usecases/submitorder.usecase";
import type { VerifyPaymentUseCase } from "@/modules/commerce/application/usecases/verifypayment.usecase";
import { registerCommerceDependencies } from "@/modules/commerce/infrastructure/dependencies/commerce.dependencies";
import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { ActivateContentTypeUseCase } from "@/modules/lookup/application/usecases/activatecontenttype.usecase";
import type { ActivatePricingTierUseCase } from "@/modules/lookup/application/usecases/activatepricingtier.usecase";
import type { ActivatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/activatepromotionlevel.usecase";
import type { CreateContentTypeUseCase } from "@/modules/lookup/application/usecases/createcontenttype.usecase";
import type { CreatePricingTierUseCase } from "@/modules/lookup/application/usecases/createpricingtier.usecase";
import type { CreatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/createpromotionlevel.usecase";
import type { CreateTagUseCase } from "@/modules/lookup/application/usecases/createtag.usecase";
import type { DeactivateContentTypeUseCase } from "@/modules/lookup/application/usecases/deactivatecontenttype.usecase";
import type { DeactivatePricingTierUseCase } from "@/modules/lookup/application/usecases/deactivatepricingtier.usecase";
import type { DeactivatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/deactivatepromotionlevel.usecase";
import type { DeleteTagUseCase } from "@/modules/lookup/application/usecases/deletetag.usecase";
import type { GetAllContentTypesUseCase } from "@/modules/lookup/application/usecases/getallcontenttypes.usecase";
import type { GetAllPricingTiersUseCase } from "@/modules/lookup/application/usecases/getallpricingtiers.usecase";
import type { GetAllPromotionLevelsUseCase } from "@/modules/lookup/application/usecases/getallpromotionlevels.usecase";
import type { GetAllTagsUseCase } from "@/modules/lookup/application/usecases/getalltags.usecase";
import type { UpdateContentTypeUseCase } from "@/modules/lookup/application/usecases/updatecontenttype.usecase";
import type { UpdatePricingTierUseCase } from "@/modules/lookup/application/usecases/updatepricingtier.usecase";
import type { UpdatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/updatepromotionlevel.usecase";
import type { UpdateTagUseCase } from "@/modules/lookup/application/usecases/updatetag.usecase";
import { registerLookupDependencies } from "@/modules/lookup/infrastructure/dependencies/lookup.dependencies";
import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { ActivatePermissionUseCase } from "@/modules/permissions/application/usecases/activatepermission.usecase";
import type { CreatePermissionUseCase } from "@/modules/permissions/application/usecases/createpermission.usecase";
import type { DeactivatePermissionUseCase } from "@/modules/permissions/application/usecases/deactivatepermission.usecase";
import type { GetAllPermissionsUseCase } from "@/modules/permissions/application/usecases/getallpermissions.usecase";
import type { GetPermissionByIdUseCase } from "@/modules/permissions/application/usecases/getpermissionbyid.usecase";
import type { HardDeletePermissionUseCase } from "@/modules/permissions/application/usecases/harddeletepermission.usecase";
import type { RestorePermissionUseCase } from "@/modules/permissions/application/usecases/restorepermission.usecase";
import type { SoftDeletePermissionUseCase } from "@/modules/permissions/application/usecases/softdeletepermission.usecase";
import type { UpdatePermissionUseCase } from "@/modules/permissions/application/usecases/updatepermission.usecase";
import { registerPermissionsDependencies } from "@/modules/permissions/infrastructure/dependencies/permissions.dependencies";
import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { ActivateRoleUseCase } from "@/modules/roles/application/usecases/activaterole.usecase";
import type { AssignPermissionUseCase } from "@/modules/roles/application/usecases/assignpermission.usecase";
import type { BulkUpdatePermissionsUseCase } from "@/modules/roles/application/usecases/bulkupdatepermissions.usecase";
import type { CreateRoleUseCase } from "@/modules/roles/application/usecases/createrole.usecase";
import type { DeactivateRoleUseCase } from "@/modules/roles/application/usecases/deactivaterole.usecase";
import type { GetAllRolesUseCase } from "@/modules/roles/application/usecases/getallroles.usecase";
import type { GetRoleByIdUseCase } from "@/modules/roles/application/usecases/getrolebyid.usecase";
import type { HardDeleteRoleUseCase } from "@/modules/roles/application/usecases/harddeleterole.usecase";
import type { RemovePermissionUseCase } from "@/modules/roles/application/usecases/removepermission.usecase";
import type { RestoreRoleUseCase } from "@/modules/roles/application/usecases/restorerole.usecase";
import type { SoftDeleteRoleUseCase } from "@/modules/roles/application/usecases/softdeleterole.usecase";
import type { UpdateRoleUseCase } from "@/modules/roles/application/usecases/updaterole.usecase";
import { registerRolesDependencies } from "@/modules/roles/infrastructure/dependencies/roles.dependencies";
import type { IDeviceStorageDataSource } from "@/platform/session/application/data-sources/device.storage.datasource.port";
import type { IDeviceRepositoryPort } from "@/platform/session/application/repositories/device.repository.port";
import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { GetSessionsUseCase } from "@/platform/session/application/usecases/getsessions.usecase";
import type { InitializeDeviceUseCase } from "@/platform/session/application/usecases/initialize.device.usecase";
import type { RefreshTokenUseCase } from "@/platform/session/application/usecases/refresh-token.usecase";
import type { RevokeSessionUseCase } from "@/platform/session/application/usecases/revokesession.usecase";
import { registerSessionDependencies } from "@/platform/session/infrastructure/dependencies/session.dependencies";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { ChangePasswordUseCase } from "@/platform/settings/application/usecases/changepassword.usecase";
import type { GetProfileUseCase } from "@/platform/settings/application/usecases/getprofile.usecase";
import type { GetRolesUseCase } from "@/platform/settings/application/usecases/getroles.usecase";
import type { UpdateAccountUseCase } from "@/platform/settings/application/usecases/updateaccount.usecase";
import type { UpdateAvatarUseCase } from "@/platform/settings/application/usecases/updateavatar.usecase";
import { registerSettingsDependencies } from "@/platform/settings/infrastructure/dependencies/settings.dependencies";

/**
 * Cradle type defining all dependencies available in the DI container.
 *
 * @interface Cradle
 *
 * @description
 * Maps registration names to their resolved types for full type-safe
 * access via `container.cradle`. Each property corresponds to a
 * registration in a per-module dependency file.
 */
export interface Cradle {
    // Data sources
    deviceStorageDataSource: IDeviceStorageDataSource;

    // Repositories
    authRepository: IAuthRepositoryPort;
    sessionRepository: SessionRepositoryPort;
    settingsRepository: ISettingsRepositoryPort;
    deviceRepository: IDeviceRepositoryPort;
    rolesRepository: IRolesRepositoryPort;

    // Auth use cases
    loginUseCase: LoginUseCase;
    forgotPasswordUseCase: ForgotPasswordUseCase;
    verifyOtpUseCase: VerifyOtpUseCase;
    resendOtpUseCase: ResendOtpUseCase;
    resetPasswordUseCase: ResetPasswordUseCase;
    signOutUseCase: SignOutUseCase;
    signOutAllUseCase: SignOutAllUseCase;

    // Session use cases
    refreshTokenUseCase: RefreshTokenUseCase;
    getSessionsUseCase: GetSessionsUseCase;
    revokeSessionUseCase: RevokeSessionUseCase;
    initializeDeviceUseCase: InitializeDeviceUseCase;

    // Settings use cases
    getProfileUseCase: GetProfileUseCase;
    updateAccountUseCase: UpdateAccountUseCase;
    updateAvatarUseCase: UpdateAvatarUseCase;
    changePasswordUseCase: ChangePasswordUseCase;
    getRolesUseCase: GetRolesUseCase;

    // Roles use cases
    activateRoleUseCase: ActivateRoleUseCase;
    assignPermissionUseCase: AssignPermissionUseCase;
    bulkUpdatePermissionsUseCase: BulkUpdatePermissionsUseCase;
    createRoleUseCase: CreateRoleUseCase;
    deactivateRoleUseCase: DeactivateRoleUseCase;
    getAllRolesUseCase: GetAllRolesUseCase;
    getRoleByIdUseCase: GetRoleByIdUseCase;
    hardDeleteRoleUseCase: HardDeleteRoleUseCase;
    removePermissionUseCase: RemovePermissionUseCase;
    restoreRoleUseCase: RestoreRoleUseCase;
    softDeleteRoleUseCase: SoftDeleteRoleUseCase;
    updateRoleUseCase: UpdateRoleUseCase;

    // Permissions repository
    permissionsRepository: IPermissionsRepositoryPort;

    // Permissions use cases
    getAllPermissionsUseCase: GetAllPermissionsUseCase;
    getPermissionByIdUseCase: GetPermissionByIdUseCase;
    createPermissionUseCase: CreatePermissionUseCase;
    updatePermissionUseCase: UpdatePermissionUseCase;
    activatePermissionUseCase: ActivatePermissionUseCase;
    deactivatePermissionUseCase: DeactivatePermissionUseCase;
    softDeletePermissionUseCase: SoftDeletePermissionUseCase;
    hardDeletePermissionUseCase: HardDeletePermissionUseCase;
    restorePermissionUseCase: RestorePermissionUseCase;

    // Lookup repository
    lookupRepository: ILookupRepositoryPort;

    // Lookup use cases
    getAllContentTypesUseCase: GetAllContentTypesUseCase;
    createContentTypeUseCase: CreateContentTypeUseCase;
    updateContentTypeUseCase: UpdateContentTypeUseCase;
    activateContentTypeUseCase: ActivateContentTypeUseCase;
    deactivateContentTypeUseCase: DeactivateContentTypeUseCase;
    getAllPricingTiersUseCase: GetAllPricingTiersUseCase;
    createPricingTierUseCase: CreatePricingTierUseCase;
    updatePricingTierUseCase: UpdatePricingTierUseCase;
    activatePricingTierUseCase: ActivatePricingTierUseCase;
    deactivatePricingTierUseCase: DeactivatePricingTierUseCase;
    getAllPromotionLevelsUseCase: GetAllPromotionLevelsUseCase;
    createPromotionLevelUseCase: CreatePromotionLevelUseCase;
    updatePromotionLevelUseCase: UpdatePromotionLevelUseCase;
    activatePromotionLevelUseCase: ActivatePromotionLevelUseCase;
    deactivatePromotionLevelUseCase: DeactivatePromotionLevelUseCase;
    getAllTagsUseCase: GetAllTagsUseCase;
    createTagUseCase: CreateTagUseCase;
    updateTagUseCase: UpdateTagUseCase;
    deleteTagUseCase: DeleteTagUseCase;

    // Catalog repository
    catalogRepository: ICatalogRepositoryPort;

    // Catalog use cases — Categories
    getAllCategoriesUseCase: GetAllCategoriesUseCase;
    getCategoryByIdUseCase: GetCategoryByIdUseCase;
    createCategoryUseCase: CreateCategoryUseCase;
    updateCategoryUseCase: UpdateCategoryUseCase;
    activateCategoryUseCase: ActivateCategoryUseCase;
    deactivateCategoryUseCase: DeactivateCategoryUseCase;
    addCategoryPricingUseCase: AddCategoryPricingUseCase;
    updateCategoryPricingUseCase: UpdateCategoryPricingUseCase;
    removeCategoryPricingUseCase: RemoveCategoryPricingUseCase;

    // Catalog use cases — Customers
    getAllCustomersUseCase: GetAllCustomersUseCase;
    getCustomerByIdUseCase: GetCustomerByIdUseCase;
    createCustomerUseCase: CreateCustomerUseCase;
    updateCustomerUseCase: UpdateCustomerUseCase;

    // Catalog use cases — Packages
    getAllPackagesUseCase: GetAllPackagesUseCase;
    getPackageByIdUseCase: GetPackageByIdUseCase;
    createPackageUseCase: CreatePackageUseCase;
    activatePackageUseCase: ActivatePackageUseCase;
    deactivatePackageUseCase: DeactivatePackageUseCase;
    addPackageSlotUseCase: AddPackageSlotUseCase;
    removePackageSlotUseCase: RemovePackageSlotUseCase;

    // Commerce repository
    commerceRepository: ICommerceRepositoryPort;

    // Commerce use cases — Order mutations
    createOrderUseCase: CreateOrderUseCase;
    addItemToOrderUseCase: AddItemToOrderUseCase;
    addTierToItemUseCase: AddTierToItemUseCase;
    submitOrderUseCase: SubmitOrderUseCase;
    cancelOrderUseCase: CancelOrderUseCase;
    editOrderUseCase: EditOrderUseCase;
    removeItemUseCase: RemoveItemUseCase;
    removeItemTierUseCase: RemoveItemTierUseCase;
    editItemUseCase: EditItemUseCase;

    // Commerce use cases — Payment mutations
    attachPaymentProofUseCase: AttachPaymentProofUseCase;
    verifyPaymentUseCase: VerifyPaymentUseCase;
    rejectPaymentUseCase: RejectPaymentUseCase;

    // Commerce use cases — Queries
    listOrdersUseCase: ListOrdersUseCase;
    getOrderByIdUseCase: GetOrderByIdUseCase;
    getOrderPaymentUseCase: GetOrderPaymentUseCase;
    listPendingPaymentOrdersUseCase: ListPendingPaymentOrdersUseCase;
    getCustomerOrdersUseCase: GetCustomerOrdersUseCase;
    listPaymentsUseCase: ListPaymentsUseCase;
}

/**
 * Awilix DI container — the composition root for the dashboard.
 *
 * @description
 * Creates a single container with PROXY injection mode and strict lifetime
 * checks. Each feature module registers its own dependencies via a
 * dedicated registration function, mirroring the mobile app's get_it pattern.
 */
const container = createContainer<Cradle>({
    injectionMode: InjectionMode.PROXY,
    strict: true
});

registerSessionDependencies(container);
registerAuthDependencies(container);
registerSettingsDependencies(container);
registerRolesDependencies(container);
registerPermissionsDependencies(container);
registerLookupDependencies(container);
registerCatalogDependencies(container);
registerCommerceDependencies(container);

export default container;
