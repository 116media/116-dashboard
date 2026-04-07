/**
 * Form model for adding a slot to a package.
 *
 * @interface IAddPackageSlotCredentials
 * @property {string} categoryId - Category identifier (required)
 * @property {boolean} isRequired - Whether the slot is required (required)
 * @property {number} quantity - Slot quantity (required)
 */
export interface IAddPackageSlotCredentials {
    categoryId: string;
    isRequired: boolean;
    quantity: number;
}
