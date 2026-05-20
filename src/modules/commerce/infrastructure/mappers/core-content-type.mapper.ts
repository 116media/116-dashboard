import { CoreContentType } from "@/shared/domain/enums/core-content-type.enum";
import { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new content type that isn't handled.
 */
const coreContentTypeMap: Record<EnumCoreContentType, CoreContentType> = {
    [EnumCoreContentType.Article]: CoreContentType.Article,
    [EnumCoreContentType.Video]: CoreContentType.Video,
    [EnumCoreContentType.Short]: CoreContentType.Short,
    [EnumCoreContentType.Custom]: CoreContentType.Custom
};

/**
 * Maps a generated API content type to the domain CoreContentType enum.
 *
 * @param {EnumCoreContentType} type - API content type value
 * @returns {CoreContentType} Corresponding domain enum value
 */
export const mapCoreContentType = (type: EnumCoreContentType): CoreContentType =>
    coreContentTypeMap[type];
