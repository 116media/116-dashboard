import { type AwilixContainer, asClass } from "awilix";
import { ActivateRoleUseCase } from "@/modules/roles/application/usecases/activaterole.usecase";
import { AssignPermissionUseCase } from "@/modules/roles/application/usecases/assignpermission.usecase";
import { BulkUpdatePermissionsUseCase } from "@/modules/roles/application/usecases/bulkupdatepermissions.usecase";
import { CreateRoleUseCase } from "@/modules/roles/application/usecases/createrole.usecase";
import { DeactivateRoleUseCase } from "@/modules/roles/application/usecases/deactivaterole.usecase";
import { GetAllRolesUseCase } from "@/modules/roles/application/usecases/getallroles.usecase";
import { GetRoleByIdUseCase } from "@/modules/roles/application/usecases/getrolebyid.usecase";
import { HardDeleteRoleUseCase } from "@/modules/roles/application/usecases/harddeleterole.usecase";
import { RemovePermissionUseCase } from "@/modules/roles/application/usecases/removepermission.usecase";
import { RestoreRoleUseCase } from "@/modules/roles/application/usecases/restorerole.usecase";
import { SoftDeleteRoleUseCase } from "@/modules/roles/application/usecases/softdeleterole.usecase";
import { UpdateRoleUseCase } from "@/modules/roles/application/usecases/updaterole.usecase";
import { RolesRepositoryImpl } from "@/modules/roles/infrastructure/repositories/roles.repository.impl";

/**
 * Registers all roles module dependencies with the Awilix DI container.
 *
 * @param {AwilixContainer} container - The Awilix container instance
 */
export function registerRolesDependencies(container: AwilixContainer): void {
    container.register({
        rolesRepository: asClass(RolesRepositoryImpl).singleton(),
        getAllRolesUseCase: asClass(GetAllRolesUseCase).transient(),
        getRoleByIdUseCase: asClass(GetRoleByIdUseCase).transient(),
        createRoleUseCase: asClass(CreateRoleUseCase).transient(),
        updateRoleUseCase: asClass(UpdateRoleUseCase).transient(),
        activateRoleUseCase: asClass(ActivateRoleUseCase).transient(),
        deactivateRoleUseCase: asClass(DeactivateRoleUseCase).transient(),
        softDeleteRoleUseCase: asClass(SoftDeleteRoleUseCase).transient(),
        hardDeleteRoleUseCase: asClass(HardDeleteRoleUseCase).transient(),
        restoreRoleUseCase: asClass(RestoreRoleUseCase).transient(),
        assignPermissionUseCase: asClass(AssignPermissionUseCase).transient(),
        removePermissionUseCase: asClass(RemovePermissionUseCase).transient(),
        bulkUpdatePermissionsUseCase: asClass(BulkUpdatePermissionsUseCase).transient()
    });
}
