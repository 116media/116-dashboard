import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";

/**
 * Domain entity for a bundle deal package.
 *
 * @interface IPackageEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Package display name
 * @property {string} description - Package description
 * @property {number} flatPriceUsd - Flat price in USD
 * @property {boolean} isActive - Whether the package is currently active
 * @property {IPackageSlotEntity[]} slots - Content slots in this package
 * @property {string | null} createdAt - ISO 8601 creation timestamp
 * @property {string | null} updatedAt - ISO 8601 last update timestamp
 * @property {string | null} createdBy - Creator identifier
 * @property {string | null} updatedBy - Last updater identifier
 */
export interface IPackageEntity {
    id: string;
    name: string;
    description: string;
    flatPriceUsd: number;
    isActive: boolean;
    slots: IPackageSlotEntity[];
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
