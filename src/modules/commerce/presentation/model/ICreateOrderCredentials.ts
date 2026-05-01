/**
 * Form model for creating a new order.
 *
 * @interface ICreateOrderCredentials
 * @property {string} customerId - B2B customer UUID (required)
 * @property {string} [packageId] - Optional package UUID for bundle pricing
 */
export interface ICreateOrderCredentials {
    customerId: string;
    packageId?: string | null;
}
