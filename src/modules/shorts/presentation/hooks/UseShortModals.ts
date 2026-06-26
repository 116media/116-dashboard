import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { ShortAction } from "@/modules/shorts/presentation/constants/shorts.dropdown";
import { VIDEO_DETAIL_PATH } from "@/shared/presentation/constants/paths";

/**
 * Return type for the short modals hook.
 *
 * @interface IUseShortModals
 */
interface IUseShortModals {
    createOpen: boolean;
    editOpen: boolean;
    actionOpen: boolean;
    thumbnailOpen: boolean;
    previewOpen: boolean;
    previewUrl: string | null;
    currentAction: ShortAction | null;
    selectedEntity: IShortVideoEntity | null;
    setCreateOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    setThumbnailOpen: (open: boolean) => void;
    handlePreviewVideo: (url: string) => void;
    closePreview: () => void;
    handleAction: (action: ShortAction, entity: IShortVideoEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
}

/**
 * Manages modal states, entity selection, and action dispatch for the shorts container.
 *
 * @description
 * Extracts all useState and action-routing logic from the shorts list container:
 * selected entity, modal open/close, and generic action confirmation via an action map.
 * Routes "thumbnail" to its dedicated modal, while activate, deactivate, and delete
 * go through the generic action confirmation flow.
 *
 * @param reload - Callback to reload the shorts list
 * @returns {IUseShortModals} Modal states, action handlers, and selected entity
 */
export const useShortModals = (reload: () => void): IUseShortModals => {
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [thumbnailOpen, setThumbnailOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [currentAction, setCurrentAction] = useState<ShortAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<IShortVideoEntity | null>(null);

    const navigate = useNavigate();

    const handleAction = useCallback(
        (action: ShortAction, entity: IShortVideoEntity) => {
            setSelectedEntity(entity);

            switch (action) {
                case "viewVideo":
                    if (entity.videoId) {
                        navigate(`${VIDEO_DETAIL_PATH}/${entity.videoId}`);
                    }
                    break;
                case "edit":
                    setEditOpen(true);
                    break;
                case "thumbnail":
                    setThumbnailOpen(true);
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

    const handlePreviewVideo = useCallback((url: string) => {
        setPreviewUrl(url);
        setPreviewOpen(true);
    }, []);

    const closePreview = useCallback(() => setPreviewOpen(false), []);

    return {
        createOpen,
        editOpen,
        actionOpen,
        thumbnailOpen,
        previewOpen,
        previewUrl,
        currentAction,
        selectedEntity,
        setCreateOpen,
        setEditOpen,
        setActionOpen,
        setThumbnailOpen,
        handlePreviewVideo,
        closePreview,
        handleAction,
        handleActionConfirm
    };
};
