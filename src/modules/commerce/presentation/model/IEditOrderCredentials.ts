/**
 * Form model for editing a draft order's customer or package assignment.
 *
 * @interface IEditOrderCredentials
 * @property {string} [customerId] - Optional customer UUID to reassign
 * @property {string | null} [packageId] - Optional package UUID to assign (null to unset)
 */
export interface IEditOrderCredentials {
    customerId?: string;
    packageId?: string | null;
}
