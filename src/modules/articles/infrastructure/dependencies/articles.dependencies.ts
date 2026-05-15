import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { ApproveArticleUseCase } from "@/modules/articles/application/usecases/approvearticle.usecase";
import { ArchiveArticleUseCase } from "@/modules/articles/application/usecases/archivearticle.usecase";
import { CreateArticleUseCase } from "@/modules/articles/application/usecases/createarticle.usecase";
import { DeleteArticleUseCase } from "@/modules/articles/application/usecases/deletearticle.usecase";
import { GetAllArticlesUseCase } from "@/modules/articles/application/usecases/getallarticles.usecase";
import { GetArticleByIdUseCase } from "@/modules/articles/application/usecases/getarticlebyid.usecase";
import { PublishArticleUseCase } from "@/modules/articles/application/usecases/publisharticle.usecase";
import { RejectArticleUseCase } from "@/modules/articles/application/usecases/rejectarticle.usecase";
import { SubmitArticleUseCase } from "@/modules/articles/application/usecases/submitarticle.usecase";
import { UnpromoteArticleUseCase } from "@/modules/articles/application/usecases/unpromotearticle.usecase";
import { UpdateArticleUseCase } from "@/modules/articles/application/usecases/updatearticle.usecase";
import { UpdateArticleSeoUseCase } from "@/modules/articles/application/usecases/updatearticleseo.usecase";
import { UpdateArticleTagsUseCase } from "@/modules/articles/application/usecases/updatearticletags.usecase";
import { UploadArticleImageUseCase } from "@/modules/articles/application/usecases/uploadarticleimage.usecase";
import { ArticlesRepositoryImpl } from "@/modules/articles/infrastructure/repositories/articles.repository.impl";

/**
 * Registers articles module dependencies in the Awilix container.
 *
 * @description
 * Registers the repository as a singleton and all use cases as transient.
 * Called during application bootstrap in the service locator.
 *
 * @param container - The Awilix dependency injection container
 */
export function registerArticlesDependencies(container: AwilixContainer): void {
    container.register({
        // Repository
        articlesRepository: asClass(ArticlesRepositoryImpl).singleton(),

        // Queries
        getAllArticlesUseCase: asClass(GetAllArticlesUseCase).transient(),
        getArticleByIdUseCase: asClass(GetArticleByIdUseCase).transient(),

        // Commands — CRUD
        createArticleUseCase: asClass(CreateArticleUseCase).transient(),
        updateArticleUseCase: asClass(UpdateArticleUseCase).transient(),
        deleteArticleUseCase: asClass(DeleteArticleUseCase).transient(),

        // Commands — Workflow
        submitArticleUseCase: asClass(SubmitArticleUseCase).transient(),
        approveArticleUseCase: asClass(ApproveArticleUseCase).transient(),
        publishArticleUseCase: asClass(PublishArticleUseCase).transient(),
        rejectArticleUseCase: asClass(RejectArticleUseCase).transient(),
        archiveArticleUseCase: asClass(ArchiveArticleUseCase).transient(),

        // Commands — Media & Metadata
        uploadArticleImageUseCase: asClass(UploadArticleImageUseCase).transient(),
        updateArticleSeoUseCase: asClass(UpdateArticleSeoUseCase).transient(),
        updateArticleTagsUseCase: asClass(UpdateArticleTagsUseCase).transient(),

        // Commands — Promotion
        unpromoteArticleUseCase: asClass(UnpromoteArticleUseCase).transient()
    });
}
