import { useCallback, useState } from "react";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { LyricsAction } from "@/modules/lyrics/presentation/constants/lyrics.dropdown";

/**
 * Return type for the lyrics modals hook.
 *
 * @interface IUseLyricsModals
 */
interface IUseLyricsModals {
    createOpen: boolean;
    editOpen: boolean;
    seoOpen: boolean;
    selectedEntity: ILyricsEntity | null;
    setCreateOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setSeoOpen: (open: boolean) => void;
    handleAction: (action: LyricsAction, entity: ILyricsEntity) => void;
}

/**
 * Manages modal states, entity selection, and action dispatch for the lyrics container.
 *
 * @description
 * Extracts all useState and action-routing logic from the lyrics list container:
 * selected entity, modal open/close. Routes "edit" and "seo" to their
 * dedicated modals.
 *
 * @param _reload - Callback to reload the lyrics list
 * @returns {IUseLyricsModals} Modal states, action handlers, and selected entity
 */
export const useLyricsModals = (_reload: () => void): IUseLyricsModals => {
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);

    const [selectedEntity, setSelectedEntity] = useState<ILyricsEntity | null>(null);

    const handleAction = useCallback((action: LyricsAction, entity: ILyricsEntity) => {
        setSelectedEntity(entity);

        switch (action) {
            case "edit":
                setEditOpen(true);
                break;
            case "seo":
                setSeoOpen(true);
                break;
        }
    }, []);

    return {
        createOpen,
        editOpen,
        seoOpen,
        selectedEntity,
        setCreateOpen,
        setEditOpen,
        setSeoOpen,
        handleAction
    };
};
