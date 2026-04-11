import { useState } from "react";

/**
 * Return type for the order detail modals hook.
 *
 * @interface IUseOrderDetailModals
 */
interface IUseOrderDetailModals {
    addItemOpen: boolean;
    addTierOpen: boolean;
    proofOpen: boolean;
    selectedItemId: string | null;
    setAddItemOpen: (open: boolean) => void;
    setAddTierOpen: (open: boolean) => void;
    setProofOpen: (open: boolean) => void;
    openAddTier: (itemId: string) => void;
}

/**
 * Manages modal states for the order detail container.
 *
 * @description
 * Extracts all modal open/close state from OrderDetailContainer.
 * Tracks which item is selected when opening the add-tier modal.
 *
 * @returns {IUseOrderDetailModals} Modal states, setters, and item selection handler
 */
export const useOrderDetailModals = (): IUseOrderDetailModals => {
    const [addItemOpen, setAddItemOpen] = useState(false);
    const [addTierOpen, setAddTierOpen] = useState(false);
    const [proofOpen, setProofOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const openAddTier = (itemId: string) => {
        setSelectedItemId(itemId);
        setAddTierOpen(true);
    };

    return {
        addItemOpen,
        addTierOpen,
        proofOpen,
        selectedItemId,
        setAddItemOpen,
        setAddTierOpen,
        setProofOpen,
        openAddTier
    };
};
