import { useCallback, useState } from "react";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { ArticleAction } from "@/modules/articles/presentation/constants/articles.dropdown";

/**
 * Return type for the article modals hook.
 *
 * @interface IUseArticleModals
 */
interface IUseArticleModals {
    createOpen: boolean;
    editOpen: boolean;
    actionOpen: boolean;
    seoOpen: boolean;
    tagsOpen: boolean;
    imageUploadOpen: boolean;
    currentAction: ArticleAction | null;
    selectedEntity: IArticleSummaryEntity | null;
    setCreateOpen: (open: boolean) => void;
    setEditOpen: (open: boolean) => void;
    setActionOpen: (open: boolean) => void;
    setSeoOpen: (open: boolean) => void;
    setTagsOpen: (open: boolean) => void;
    setImageUploadOpen: (open: boolean) => void;
    handleAction: (action: ArticleAction, entity: IArticleSummaryEntity) => void;
    handleActionConfirm: (
        actionMap: Record<string, (id: string) => Promise<void>>
    ) => Promise<void>;
}

/**
 * Manages modal states, entity selection, and action dispatch for the articles container.
 *
 * @description
 * Extracts all useState and action-routing logic from the articles list container:
 * selected entity, modal open/close, and generic action confirmation via an action map.
 * Routes "edit", "seo", "tags", and "upload" to their dedicated modals, while all
 * workflow actions (submit, approve, publish, reject, archive, delete) go through
 * the generic action confirmation flow.
 *
 * @param reload - Callback to reload the articles list
 * @returns {IUseArticleModals} Modal states, action handlers, and selected entity
 */
export const useArticleModals = (reload: () => void): IUseArticleModals => {
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);
    const [tagsOpen, setTagsOpen] = useState(false);
    const [imageUploadOpen, setImageUploadOpen] = useState(false);

    const [currentAction, setCurrentAction] = useState<ArticleAction | null>(null);
    const [selectedEntity, setSelectedEntity] = useState<IArticleSummaryEntity | null>(null);

    const handleAction = useCallback((action: ArticleAction, entity: IArticleSummaryEntity) => {
        setSelectedEntity(entity);

        switch (action) {
            case "edit":
                setEditOpen(true);
                break;
            case "seo":
                setSeoOpen(true);
                break;
            case "tags":
                setTagsOpen(true);
                break;
            case "upload":
                setImageUploadOpen(true);
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
        imageUploadOpen,
        currentAction,
        selectedEntity,
        setCreateOpen,
        setEditOpen,
        setActionOpen,
        setSeoOpen,
        setTagsOpen,
        setImageUploadOpen,
        handleAction,
        handleActionConfirm
    };
};
