import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface ISignOutUseCase extends IUseCase<void, ISignOutResponse> {}

export class SignOutUseCase implements ISignOutUseCase {
    constructor(private readonly authRepository: IAuthRepositoryPort) {}

    async execute(): Promise<ISignOutResponse> {
        return this.authRepository.signOut();
    }
}
