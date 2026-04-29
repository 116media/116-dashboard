import { useCallback, useState } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { CategoryAction } from "@/modules/catalog/presentation/constants/catalog.categories.dropdown";
import { getCategoryByIdAction } from "@/modules/catalog/presentation/store/getcategorybyid.action";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the category modals hook.
 *
 * @interface IUseCategoryModals
 */
interface IUseCategoryModals {
    editOpen: boolean;
    createOpen: boolean;
    actionOpen: boolean;
    pricingOpen: boolean;
    refreshLoading: boolean;
    currentAction: CategoryAction | null;
    selectedEntity: ICategoryEntity | null;
    setCreateOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    setPricingOpen: (open: boolean) => void;
    handleAction: (action: CategoryAction, entity: ICategoryEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
    refreshSelectedEntity: () => Promise<void>;
}

/**
 * Manages modal states, entity selection, and refresh for the categories container.
 *
 * @description
 * Extracts all useState and side-effect logic from CategoriesListContainer:
 * selected entity, modal open/close, action dispatch, and entity refresh
 * after pricing mutations.
 *
 * @param reload - Callback to reload the categories list
 * @returns Modal states, action handlers, and refresh function
 */
export const useCategoryModals = (reload: () => void): IUseCategoryModals => {
    const dispatch = useAppDispatch();
    const { loading: refreshLoading } = useAppSelector(
        ({ catalog: { getCategoryById } }) => getCategoryById
    );

    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [pricingOpen, setPricingOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState<CategoryAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<ICategoryEntity | null>(null);

    const handleAction = useCallback((action: CategoryAction, entity: ICategoryEntity) => {
        setSelectedEntity(entity);

        switch (action) {
            case "edit":
                setEditOpen(true);
                break;
            case "managePricing":
                setPricingOpen(true);
                break;
            default:
                setCurrentAction(action);
                setActionOpen(true);
                break;
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

    const refreshSelectedEntity = useCallback(async () => {
        if (!selectedEntity) return;
        const result = await dispatch(getCategoryByIdAction(selectedEntity.id));

        if (getCategoryByIdAction.fulfilled.match(result)) {
            setSelectedEntity(result.payload);
        }
        reload();
    }, [dispatch, selectedEntity, reload]);

    return {
        selectedEntity,
        createOpen,
        editOpen,
        actionOpen,
        pricingOpen,
        currentAction,
        refreshLoading,
        setCreateOpen,
        setEditOpen,
        setActionOpen,
        setPricingOpen,
        handleAction,
        handleActionConfirm,
        refreshSelectedEntity
    };
};
