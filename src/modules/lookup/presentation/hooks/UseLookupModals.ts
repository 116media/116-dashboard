import { useCallback, useState } from "react";

/**
 * Return type for the lookup modals hook.
 *
 * @interface IUseLookupModals
 * @template TEntity - The entity type for the selected record
 * @template TAction - The action type union (e.g., "edit" | "activate" | "deactivate")
 */
interface IUseLookupModals<TEntity, TAction extends string> {
    selectedEntity: TEntity | null;
    createOpen: boolean;
    editOpen: boolean;
    actionOpen: boolean;
    currentAction: TAction | null;
    setCreateOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    handleAction: (action: TAction, entity: TEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
}

/**
 * Generic modal state management for lookup containers.
 *
 * @description
 * Extracts all useState and action-dispatch logic shared across
 * lookup containers: selected entity, modal open/close states,
 * action routing (edit opens edit modal, others open action modal),
 * and action confirmation via a dynamic action map.
 *
 * @template TEntity - The entity type (must have `id: string`)
 * @template TAction - The action type union
 * @returns Modal states, action handlers, and setters
 */
export const useLookupModals = <
    TEntity extends { id: string },
    TAction extends string
>(): IUseLookupModals<TEntity, TAction> => {
    const [selectedEntity, setSelectedEntity] = useState<TEntity | null>(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<TAction | null>(null);

    const handleAction = useCallback((action: TAction, entity: TEntity) => {
        setSelectedEntity(entity);

        if (action === "edit") {
            setEditOpen(true);
        } else {
            setCurrentAction(action);
            setActionOpen(true);
        }
    }, []);

    const handleActionConfirm = useCallback(
        async (actionMap: Record<string, (id: string) => Promise<void>>) => {
            if (!selectedEntity || !currentAction) return;

            const handler = actionMap[currentAction];
            if (handler) {
                await handler(selectedEntity.id);
                setActionOpen(false);
            }
        },
        [selectedEntity, currentAction]
    );

    return {
        selectedEntity,
        createOpen,
        editOpen,
        actionOpen,
        currentAction,
        setCreateOpen,
        setEditOpen,
        setActionOpen,
        handleAction,
        handleActionConfirm
    };
};
