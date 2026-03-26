/**
 * Generic type for unknown object structures.
 *
 * @interface IUnknownObject
 *
 * @description
 * Represents an object with unknown keys and values.
 *
 * Used for flexible typing where exact structure is not known ahead of time.
 *
 * @property {unknown | IUnknownObject} [key] - Dynamic property with unknown or nested object value
 */
export interface IUnknownObject {
    [key: string]: unknown | IUnknownObject;
}
