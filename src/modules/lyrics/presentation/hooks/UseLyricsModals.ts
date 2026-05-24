import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { LyricsAction } from "@/modules/lyrics/presentation/constants/lyrics.dropdown";
import { VIDEO_DETAIL_PATH } from "@/shared/presentation/constants/paths";

/**
 * Return type for the lyrics modals hook.
 *
 * @interface IUseLyricsModals
 */
interface IUseLyricsModals {
    seoOpen: boolean;
    editOpen: boolean;
    createOpen: boolean;
    actionOpen: boolean;
    currentAction: LyricsAction | null;
    selectedEntity: ILyricsEntity | null;
    setSeoOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setCreateOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    handleAction: (action: LyricsAction, entity: ILyricsEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
}

/**
 * Manages modal states, entity selection, and action dispatch for the lyrics container.
 *
 * @description
 * Extracts all useState and action-routing logic from the lyrics list container:
 * selected entity, modal open/close. Routes "edit" and "seo" to their
 * dedicated modals, and "viewVideo" navigates to the video detail page.
 *
 * @param _reload - Callback to reload the lyrics list
 * @returns {IUseLyricsModals} Modal states, action handlers, and selected entity
 */
export const useLyricsModals = (_reload: () => void): IUseLyricsModals => {
    const navigate = useNavigate();

    const [seoOpen, setSeoOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState<LyricsAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<ILyricsEntity | null>(null);

    const handleAction = useCallback(
        (action: LyricsAction, entity: ILyricsEntity) => {
            setSelectedEntity(entity);

            switch (action) {
                case "edit":
                    setEditOpen(true);
                    break;
                case "seo":
                    setSeoOpen(true);
                    break;
                case "viewVideo":
                    if (entity.videoId) {
                        navigate(`${VIDEO_DETAIL_PATH}/${entity.videoId}`);
                    }
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
            }
        },
        [selectedEntity, currentAction]
    );

    return {
        createOpen,
        editOpen,
        seoOpen,
        actionOpen,
        currentAction,
        selectedEntity,
        setCreateOpen,
        setEditOpen,
        setSeoOpen,
        setActionOpen,
        handleAction,
        handleActionConfirm
    };
};
