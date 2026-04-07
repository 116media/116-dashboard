/**
 * Form model for updating an existing customer.
 *
 * @interface IUpdateCustomerCredentials
 * @property {string} fullName - Customer full name (required, max 100 chars)
 * @property {string} [phone] - Customer phone number (optional, max 20 chars)
 * @property {string} [company] - Customer company name (optional, max 100 chars)
 * @property {string} [notes] - Additional notes (optional, max 500 chars)
 *
 * @remarks
 * The `email` field is not updatable after creation.
 */
export interface IUpdateCustomerCredentials {
    fullName: string;
    phone?: string;
    company?: string;
    notes?: string;
}
