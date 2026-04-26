/**
 * Form model for creating a new tag.
 *
 * @interface ICreateTagCredentials
 * @property {string} name - Tag display name (required, max 50 chars)
 *
 * @remarks
 * The slug is auto-generated from the name in the hook via
 * `generateSlug` — it is not part of the form fields.
 */
export interface ICreateTagCredentials {
    name: string;
}
