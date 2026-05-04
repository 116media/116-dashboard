import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { OrderAction } from "@/modules/commerce/presentation/constants/commerce.orders.dropdown";
import { ORDER_DETAIL_PATH } from "@/shared/presentation/constants/paths";

/**
 * Return type for the order modals hook.
 *
 * @interface IUseOrderModals
 */
interface IUseOrderModals {
    createOpen: boolean;
    addItemOpen: boolean;
    actionOpen: boolean;
    currentAction: OrderAction | null;
    selectedEntity: IOrderSummaryEntity | null;
    setCreateOpen: (open: boolean) => void;
    setAddItemOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    handleAction: (action: OrderAction, entity: IOrderSummaryEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
}

/**
 * Manages modal states, entity selection, and action dispatch for the orders container.
 *
 * @description
 * Extracts all useState and action-routing logic from OrdersListContainer:
 * selected entity, modal open/close, navigation on "view", and generic
 * action confirmation via an action map.
 *
 * @param reload - Callback to reload the orders list
 * @returns {IUseOrderModals} Modal states, action handlers, and selected entity
 */
export const useOrderModals = (reload: () => void): IUseOrderModals => {
    const navigate = useNavigate();

    const [createOpen, setCreateOpen] = useState(false);
    const [addItemOpen, setAddItemOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState<OrderAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<IOrderSummaryEntity | null>(null);

    const handleAction = useCallback(
        (action: OrderAction, entity: IOrderSummaryEntity) => {
            setSelectedEntity(entity);

            switch (action) {
                case "view":
                    navigate(`${ORDER_DETAIL_PATH}/${entity.id}`);
                    break;
                case "addItem":
                    setAddItemOpen(true);
                    break;
                default:
                    setCurrentAction(action);
                    setActionOpen(true);
                    break;
            }
        },
        [navigate]
    );

    const handleActionConfirm = useCallback(
        async (actionMap: Record<string, (id: string) => Promise<void>>) => {
            if (!selectedEntity || !currentAction) return;

            const handler = actionMap[currentAction];
            if (handler) {
                await handler(selectedEntity.id);
                setActionOpen(false);
                reload();
            }
        },
        [selectedEntity, currentAction, reload]
    );

    return {
        selectedEntity,
        createOpen,
        addItemOpen,
        actionOpen,
        currentAction,
        setCreateOpen,
        setAddItemOpen,
        setActionOpen,
        handleAction,
        handleActionConfirm
    };
};
