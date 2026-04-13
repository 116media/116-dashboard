import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { ChangePasswordUseCase } from "@/platform/settings/application/usecases/changepassword.usecase";
import { GetProfileUseCase } from "@/platform/settings/application/usecases/getprofile.usecase";
import { GetRolesUseCase } from "@/platform/settings/application/usecases/getroles.usecase";
import { UpdateAccountUseCase } from "@/platform/settings/application/usecases/updateaccount.usecase";
import { UpdateAvatarUseCase } from "@/platform/settings/application/usecases/updateavatar.usecase";
import { SettingsRepositoryImpl } from "@/platform/settings/infrastructure/repositories/settings.repository.impl";

export function registerSettingsDependencies(container: AwilixContainer): void {
    container.register({
        settingsRepository: asClass(SettingsRepositoryImpl).singleton(),

        getProfileUseCase: asClass(GetProfileUseCase).transient(),
        updateAccountUseCase: asClass(UpdateAccountUseCase).transient(),
        updateAvatarUseCase: asClass(UpdateAvatarUseCase).transient(),
        changePasswordUseCase: asClass(ChangePasswordUseCase).transient(),
        getRolesUseCase: asClass(GetRolesUseCase).transient()
    });
}
