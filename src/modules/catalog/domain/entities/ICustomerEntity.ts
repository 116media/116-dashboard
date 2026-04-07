/**
 * Domain entity for a B2B customer.
 *
 * @interface ICustomerEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} fullName - Full name of the customer
 * @property {string} email - Email address
 * @property {string | null} phone - Optional phone number
 * @property {string | null} company - Optional company or label name
 * @property {string | null} notes - Optional internal notes
 * @property {string | null} createdAt - ISO 8601 creation timestamp
 * @property {string | null} updatedAt - ISO 8601 last update timestamp
 * @property {string | null} createdBy - Creator identifier
 * @property {string | null} updatedBy - Last updater identifier
 */
export interface ICustomerEntity {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    notes?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
