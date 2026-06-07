import type { FC } from "react";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import ArticleRejectModal from "@/modules/articles/presentation/components/ui/ArticleRejectModal";
import ArticleUnpromoteModal from "@/modules/articles/presentation/components/ui/ArticleUnpromoteModal";
import type { ArticleAction } from "@/modules/articles/presentation/constants/articles.dropdown";
import { ARTICLE_ACTION_CONFIG } from "@/modules/articles/presentation/constants/articles.workflow.config";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import type { IUnpromoteArticleCredentials } from "@/modules/articles/presentation/model/IUnpromoteArticleCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the ArticleWorkflowModal component.
 *
 * @interface IArticleWorkflowModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {ArticleAction | null} action - The workflow action type
 * @property {IArticleSummaryEntity | null} article - The article being acted upon
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display
 * @property {() => void} onConfirm - Confirm handler for non-reject actions
 * @property {(values: IRejectArticleCredentials) => void} [onRejectSubmit] - Submit handler for the reject modal
 * @property {(values: IUnpromoteArticleCredentials) => void} [onUnpromoteSubmit] - Submit handler for the unpromote modal
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IArticleWorkflowModalProps {
    open: boolean;
    loading: boolean;
    action: ArticleAction | null;
    error?: Failure | null | undefined;
    article: IArticleSummaryEntity | null;
    onCancel: () => void;
    onConfirm: () => void;
    onRejectSubmit?: (values: IRejectArticleCredentials) => void;
    onUnpromoteSubmit?: (values: IUnpromoteArticleCredentials) => void;
}

/**
 * Dispatcher modal for article workflow transitions.
 *
 * @component
 *
 * @description
 * Routes each workflow action to its dedicated modal component.
 * The "reject" action renders `ArticleRejectModal`, the "unpromote"
 * action renders `ArticleUnpromoteModal`, and all other actions
 * delegate to the shared `ActionModal`.
 *
 * @param {IArticleWorkflowModalProps} props - Component props
 * @returns {JSX.Element | null} The appropriate modal, or null if no config/article
 */
const ArticleWorkflowModal: FC<IArticleWorkflowModalProps> = ({
    open,
    action,
    article,
    loading,
    error,
    onConfirm,
    onRejectSubmit,
    onUnpromoteSubmit,
    onCancel
}) => {
    const config = action ? ARTICLE_ACTION_CONFIG[action] : undefined;

    if (!config || !article) return null;

    if (action === "reject") {
        return (
            <ArticleRejectModal
                open={open}
                loading={loading}
                onCancel={onCancel}
                title={config.title}
                error={error ?? null}
                description={config.description}
                confirmLabel={config.confirmLabel}
                onSubmit={(values) => onRejectSubmit?.(values)}
            />
        );
    }

    if (action === "unpromote") {
        return (
            <ArticleUnpromoteModal
                open={open}
                loading={loading}
                onCancel={onCancel}
                title={config.title}
                error={error ?? null}
                description={config.description}
                confirmLabel={config.confirmLabel}
                onSubmit={(values) => onUnpromoteSubmit?.(values)}
            />
        );
    }

    return (
        <ActionModal
            open={open}
            loading={loading}
            onCancel={onCancel}
            title={config.title}
            onConfirm={onConfirm}
            error={error ?? null}
            danger={config.danger}
            confirmLabel={config.confirmLabel}
            description={config.description}
        />
    );
};

export default ArticleWorkflowModal;
