import { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";
import { EnumArticleImageType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new image type that isn't handled.
 */
const articleImageTypeMap: Record<EnumArticleImageType, ArticleImageType> = {
    [EnumArticleImageType.Cover]: ArticleImageType.Cover,
    [EnumArticleImageType.Body]: ArticleImageType.Body
};

/**
 * Maps a generated API article image type to the domain ArticleImageType enum.
 *
 * @param {EnumArticleImageType} type - API article image type value
 * @returns {ArticleImageType} Corresponding domain enum value
 */
export const mapArticleImageType = (type: EnumArticleImageType): ArticleImageType =>
    articleImageTypeMap[type];
