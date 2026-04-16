import type { EnumArticleImageType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for an article image attachment.
 *
 * @interface IArticleImageEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} url - Public URL of the uploaded image
 * @property {string} storageKey - Cloud storage key for deletion
 * @property {EnumArticleImageType} imageType - Whether this is a Cover or Body image
 */
export interface IArticleImageEntity {
    id: string;
    url: string;
    storageKey: string;
    imageType: EnumArticleImageType;
}
