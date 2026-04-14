/**
 * Form model for updating an existing customer.
 *
 * @interface IUpdateCustomerCredentials
 * @property {string} fullName - Customer full name (required, max 100 chars)
 * @property {string} email - Customer email address (required)
 * @property {string} [phone] - Customer phone number (optional, max 20 chars)
 * @property {string} [company] - Customer company name (optional, max 100 chars)
 * @property {string} [notes] - Additional notes (optional, max 500 chars)
 */
export interface IUpdateCustomerCredentials {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    notes?: string;
}
