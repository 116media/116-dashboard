import { type AwilixContainer, asClass } from "awilix";
import { ActivatePermissionUseCase } from "@/modules/permissions/application/usecases/activatepermission.usecase";
import { CreatePermissionUseCase } from "@/modules/permissions/application/usecases/createpermission.usecase";
import { DeactivatePermissionUseCase } from "@/modules/permissions/application/usecases/deactivatepermission.usecase";
import { GetAllPermissionsUseCase } from "@/modules/permissions/application/usecases/getallpermissions.usecase";
import { GetPermissionByIdUseCase } from "@/modules/permissions/application/usecases/getpermissionbyid.usecase";
import { HardDeletePermissionUseCase } from "@/modules/permissions/application/usecases/harddeletepermission.usecase";
import { RestorePermissionUseCase } from "@/modules/permissions/application/usecases/restorepermission.usecase";
import { SoftDeletePermissionUseCase } from "@/modules/permissions/application/usecases/softdeletepermission.usecase";
import { UpdatePermissionUseCase } from "@/modules/permissions/application/usecases/updatepermission.usecase";
import { PermissionsRepositoryImpl } from "@/modules/permissions/infrastructure/repositories/permissions.repository.impl";

/**
 * Registers all permissions module dependencies with the Awilix DI container.
 *
 * @param {AwilixContainer} container - The Awilix container instance
 */
export function registerPermissionsDependencies(container: AwilixContainer): void {
    container.register({
        permissionsRepository: asClass(PermissionsRepositoryImpl).singleton(),
        getAllPermissionsUseCase: asClass(GetAllPermissionsUseCase).transient(),
        getPermissionByIdUseCase: asClass(GetPermissionByIdUseCase).transient(),
        createPermissionUseCase: asClass(CreatePermissionUseCase).transient(),
        updatePermissionUseCase: asClass(UpdatePermissionUseCase).transient(),
        activatePermissionUseCase: asClass(ActivatePermissionUseCase).transient(),
        deactivatePermissionUseCase: asClass(DeactivatePermissionUseCase).transient(),
        softDeletePermissionUseCase: asClass(SoftDeletePermissionUseCase).transient(),
        hardDeletePermissionUseCase: asClass(HardDeletePermissionUseCase).transient(),
        restorePermissionUseCase: asClass(RestorePermissionUseCase).transient()
    });
}
