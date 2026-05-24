import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { VideoAction } from "@/modules/videos/presentation/constants/videos.dropdown";
import { VIDEO_DETAIL_PATH } from "@/shared/presentation/constants/paths";

/**
 * Return type for the video modals hook.
 *
 * @interface IUseVideoModals
 */
interface IUseVideoModals {
    createOpen: boolean;
    editOpen: boolean;
    actionOpen: boolean;
    seoOpen: boolean;
    tagsOpen: boolean;
    thumbnailOpen: boolean;
    youtubeOpen: boolean;
    shootOpen: boolean;
    createShortOpen: boolean;
    currentAction: VideoAction | null;
    selectedEntity: IVideoSummaryEntity | null;
    setCreateOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    setSeoOpen: (open: boolean) => void;
    setTagsOpen: (open: boolean) => void;
    setThumbnailOpen: (open: boolean) => void;
    setYoutubeOpen: (open: boolean) => void;
    setShootOpen: (open: boolean) => void;
    setCreateShortOpen: (open: boolean) => void;
    handleAction: (action: VideoAction, entity: IVideoSummaryEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
}

/**
 * Manages modal states, entity selection, and action dispatch for the videos container.
 *
 * @description
 * Extracts all useState and action-routing logic from the videos list container:
 * selected entity, modal open/close, and generic action confirmation via an action map.
 * Routes "edit", "seo", "tags", "thumbnail", "youtube", and "shoot" to their dedicated
 * modals, while all workflow actions (submit, approve, publish, reject, archive, delete)
 * go through the generic action confirmation flow.
 *
 * @param reload - Callback to reload the videos list
 * @returns {IUseVideoModals} Modal states, action handlers, and selected entity
 */
export const useVideoModals = (reload: () => void): IUseVideoModals => {
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);
    const [tagsOpen, setTagsOpen] = useState(false);
    const [thumbnailOpen, setThumbnailOpen] = useState(false);
    const [youtubeOpen, setYoutubeOpen] = useState(false);
    const [shootOpen, setShootOpen] = useState(false);
    const [createShortOpen, setCreateShortOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState<VideoAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<IVideoSummaryEntity | null>(null);

    const navigate = useNavigate();

    const handleAction = useCallback(
        (action: VideoAction, entity: IVideoSummaryEntity) => {
            setSelectedEntity(entity);

            switch (action) {
                case "view":
                    navigate(`${VIDEO_DETAIL_PATH}/${entity.id}`);
                    break;
                case "edit":
                    setEditOpen(true);
                    break;
                case "seo":
                    setSeoOpen(true);
                    break;
                case "tags":
                    setTagsOpen(true);
                    break;
                case "thumbnail":
                    setThumbnailOpen(true);
                    break;
                case "youtube":
                    setYoutubeOpen(true);
                    break;
                case "shoot":
                    setShootOpen(true);
                    break;
                case "createShort":
                    setCreateShortOpen(true);
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
        createOpen,
        editOpen,
        actionOpen,
        seoOpen,
        tagsOpen,
        thumbnailOpen,
        youtubeOpen,
        shootOpen,
        createShortOpen,
        currentAction,
        selectedEntity,
        setCreateOpen,
        setEditOpen,
        setActionOpen,
        setSeoOpen,
        setTagsOpen,
        setThumbnailOpen,
        setYoutubeOpen,
        setShootOpen,
        setCreateShortOpen,
        handleAction,
        handleActionConfirm
    };
};
