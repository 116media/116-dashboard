import { useCallback, useState } from "react";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { PackageAction } from "@/modules/catalog/presentation/constants/catalog.packages.dropdown";
import { getPackageByIdAction } from "@/modules/catalog/presentation/store/getpackagebyid.action";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the package modals hook.
 *
 * @interface IUsePackageModals
 */
interface IUsePackageModals {
    slotsOpen: boolean;
    createOpen: boolean;
    actionOpen: boolean;
    refreshLoading: boolean;
    currentAction: PackageAction | null;
    selectedEntity: IPackageEntity | null;
    setSlotsOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    setCreateOpen: (open: boolean) => void;
    handleAction: (action: PackageAction, entity: IPackageEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
    refreshSelectedEntity: () => Promise<void>;
}

/**
 * Manages modal states, entity selection, and refresh for the packages container.
 *
 * @description
 * Extracts all useState and side-effect logic from PackagesListContainer:
 * selected entity, modal open/close, action dispatch, and entity refresh
 * after slot mutations.
 *
 * @param reload - Callback to reload the packages list
 * @returns Modal states, action handlers, and refresh function
 */
export const usePackageModals = (reload: () => void): IUsePackageModals => {
    const dispatch = useAppDispatch();
    const { loading: refreshLoading } = useAppSelector(
        ({ catalog: { getPackageById } }) => getPackageById
    );

    const [slotsOpen, setSlotsOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState<PackageAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<IPackageEntity | null>(null);

    const handleAction = useCallback((action: PackageAction, entity: IPackageEntity) => {
        setSelectedEntity(entity);

        if (action === "manageSlots") setSlotsOpen(true);
        else {
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

    const refreshSelectedEntity = useCallback(async () => {
        if (!selectedEntity) return;
        const result = await dispatch(getPackageByIdAction(selectedEntity.id));
        if (getPackageByIdAction.fulfilled.match(result)) {
            setSelectedEntity(result.payload);
        }
        reload();
    }, [dispatch, selectedEntity, reload]);

    return {
        selectedEntity,
        createOpen,
        actionOpen,
        slotsOpen,
        currentAction,
        refreshLoading,
        setCreateOpen,
        setActionOpen,
        setSlotsOpen,
        handleAction,
        handleActionConfirm,
        refreshSelectedEntity
    };
};
