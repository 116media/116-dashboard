/**
 * Domain entity for a pricing tier snapshot attached to an order item.
 *
 * @interface IItemTierEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} tierName - Display name of the pricing tier
 * @property {number} priceSnapshotUsd - Price in USD at the time the tier was attached
 */
export interface IItemTierEntity {
    id: string;
    tierName: string;
    priceSnapshotUsd: number;
}
