import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface ISignOutAllUseCase extends IUseCase<void, ISignOutAllResponse> {}

export class SignOutAllUseCase implements ISignOutAllUseCase {
    constructor(private readonly authRepository: IAuthRepositoryPort) {}

    async execute(): Promise<ISignOutAllResponse> {
        return this.authRepository.signOutAll();
    }
}
