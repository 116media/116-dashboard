import { useCallback, useState } from "react";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { CustomerAction } from "@/modules/catalog/presentation/constants/catalog.customers.dropdown";

/**
 * Return type for the customer modals hook.
 *
 * @interface IUseCustomerModals
 */
interface IUseCustomerModals {
    editOpen: boolean;
    createOpen: boolean;
    setEditOpen: (open: boolean) => void;
    selectedEntity: ICustomerEntity | null;
    setCreateOpen: (open: boolean) => void;
    handleAction: (action: CustomerAction, entity: ICustomerEntity) => void;
}

/**
 * Manages modal states and entity selection for the customers container.
 *
 * @description
 * Extracts all useState logic from CustomersListContainer:
 * selected entity, create/edit modal open/close, and action dispatch.
 * Customers have no action modal or management panel.
 *
 * @returns Modal states and action handler
 */
export const useCustomerModals = (): IUseCustomerModals => {
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<ICustomerEntity | null>(null);

    const handleAction = useCallback((_action: CustomerAction, entity: ICustomerEntity) => {
        setSelectedEntity(entity);
        setEditOpen(true);
    }, []);

    return {
        selectedEntity,
        createOpen,
        editOpen,
        setCreateOpen,
        setEditOpen,
        handleAction
    };
};
