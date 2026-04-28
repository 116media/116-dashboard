/**
 * Domain entity for a content slot within a package.
 *
 * @interface IPackageSlotEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string | null} categoryId - Fixed category UUID, or null for open slot
 * @property {string | null} categoryName - Display name of the fixed category
 * @property {boolean} isRequired - Whether this slot must be fulfilled
 * @property {number} quantity - Number of content pieces for this slot
 */
export interface IPackageSlotEntity {
    id: string;
    categoryId?: string | null;
    categoryName?: string | null;
    isRequired: boolean;
    quantity: number;
}
