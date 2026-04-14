import { useState } from "react";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";

/**
 * Return type for the order detail modals hook.
 *
 * @interface IUseOrderDetailModals
 */
interface IUseOrderDetailModals {
    addItemOpen: boolean;
    addTierOpen: boolean;
    proofOpen: boolean;
    editOrderOpen: boolean;
    editItemOpen: boolean;
    selectedItemId: string | null;
    selectedItemCategoryName: string | null;
    selectedItem: IOrderItemEntity | null;
    setAddItemOpen: (open: boolean) => void;
    setAddTierOpen: (open: boolean) => void;
    setProofOpen: (open: boolean) => void;
    setEditOrderOpen: (open: boolean) => void;
    setEditItemOpen: (open: boolean) => void;
    openAddTier: (itemId: string, categoryName: string) => void;
    openEditItem: (item: IOrderItemEntity) => void;
}

/**
 * Manages modal states for the order detail container.
 *
 * @description
 * Extracts all modal open/close state from OrderDetailContainer.
 * Tracks which item is selected for add-tier and edit-item modals.
 *
 * @returns {IUseOrderDetailModals} Modal states, setters, and item selection handlers
 */
export const useOrderDetailModals = (): IUseOrderDetailModals => {
    const [addItemOpen, setAddItemOpen] = useState(false);
    const [addTierOpen, setAddTierOpen] = useState(false);
    const [proofOpen, setProofOpen] = useState(false);
    const [editOrderOpen, setEditOrderOpen] = useState(false);
    const [editItemOpen, setEditItemOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [selectedItemCategoryName, setSelectedItemCategoryName] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<IOrderItemEntity | null>(null);

    const openAddTier = (itemId: string, categoryName: string) => {
        setSelectedItemId(itemId);
        setSelectedItemCategoryName(categoryName);
        setAddTierOpen(true);
    };

    const openEditItem = (item: IOrderItemEntity) => {
        setSelectedItem(item);
        setSelectedItemId(item.id);
        setEditItemOpen(true);
    };

    return {
        addItemOpen,
        addTierOpen,
        proofOpen,
        editOrderOpen,
        editItemOpen,
        selectedItemId,
        selectedItemCategoryName,
        selectedItem,
        setAddItemOpen,
        setAddTierOpen,
        setProofOpen,
        setEditOrderOpen,
        setEditItemOpen,
        openAddTier,
        openEditItem
    };
};
