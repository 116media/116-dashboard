import { type AwilixContainer, asClass } from "awilix";
import { ActivateContentTypeUseCase } from "@/modules/lookup/application/usecases/activatecontenttype.usecase";
import { ActivatePricingTierUseCase } from "@/modules/lookup/application/usecases/activatepricingtier.usecase";
import { ActivatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/activatepromotionlevel.usecase";
import { CreateContentTypeUseCase } from "@/modules/lookup/application/usecases/createcontenttype.usecase";
import { CreatePricingTierUseCase } from "@/modules/lookup/application/usecases/createpricingtier.usecase";
import { CreatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/createpromotionlevel.usecase";
import { CreateTagUseCase } from "@/modules/lookup/application/usecases/createtag.usecase";
import { DeactivateContentTypeUseCase } from "@/modules/lookup/application/usecases/deactivatecontenttype.usecase";
import { DeactivatePricingTierUseCase } from "@/modules/lookup/application/usecases/deactivatepricingtier.usecase";
import { DeactivatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/deactivatepromotionlevel.usecase";
import { GetAllContentTypesUseCase } from "@/modules/lookup/application/usecases/getallcontenttypes.usecase";
import { GetAllPricingTiersUseCase } from "@/modules/lookup/application/usecases/getallpricingtiers.usecase";
import { GetAllPromotionLevelsUseCase } from "@/modules/lookup/application/usecases/getallpromotionlevels.usecase";
import { GetAllTagsUseCase } from "@/modules/lookup/application/usecases/getalltags.usecase";
import { UpdateContentTypeUseCase } from "@/modules/lookup/application/usecases/updatecontenttype.usecase";
import { UpdatePricingTierUseCase } from "@/modules/lookup/application/usecases/updatepricingtier.usecase";
import { UpdatePromotionLevelUseCase } from "@/modules/lookup/application/usecases/updatepromotionlevel.usecase";
import { LookupRepositoryImpl } from "@/modules/lookup/infrastructure/repositories/lookup.repository.impl";

/**
 * Registers all lookup module dependencies with the Awilix DI container.
 *
 * @param {AwilixContainer} container - The Awilix container instance
 */
export function registerLookupDependencies(container: AwilixContainer): void {
    container.register({
        lookupRepository: asClass(LookupRepositoryImpl).singleton(),

        // Content Types
        getAllContentTypesUseCase: asClass(GetAllContentTypesUseCase).transient(),
        createContentTypeUseCase: asClass(CreateContentTypeUseCase).transient(),
        updateContentTypeUseCase: asClass(UpdateContentTypeUseCase).transient(),
        activateContentTypeUseCase: asClass(ActivateContentTypeUseCase).transient(),
        deactivateContentTypeUseCase: asClass(DeactivateContentTypeUseCase).transient(),

        // Pricing Tiers
        getAllPricingTiersUseCase: asClass(GetAllPricingTiersUseCase).transient(),
        createPricingTierUseCase: asClass(CreatePricingTierUseCase).transient(),
        updatePricingTierUseCase: asClass(UpdatePricingTierUseCase).transient(),
        activatePricingTierUseCase: asClass(ActivatePricingTierUseCase).transient(),
        deactivatePricingTierUseCase: asClass(DeactivatePricingTierUseCase).transient(),

        // Promotion Levels
        getAllPromotionLevelsUseCase: asClass(GetAllPromotionLevelsUseCase).transient(),
        createPromotionLevelUseCase: asClass(CreatePromotionLevelUseCase).transient(),
        updatePromotionLevelUseCase: asClass(UpdatePromotionLevelUseCase).transient(),
        activatePromotionLevelUseCase: asClass(ActivatePromotionLevelUseCase).transient(),
        deactivatePromotionLevelUseCase: asClass(DeactivatePromotionLevelUseCase).transient(),

        // Tags
        getAllTagsUseCase: asClass(GetAllTagsUseCase).transient(),
        createTagUseCase: asClass(CreateTagUseCase).transient()
    });
}
