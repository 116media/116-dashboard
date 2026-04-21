import { Button, Flex, Form, Modal, Typography } from "antd";
import type { FC } from "react";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import ArticleRejectForm from "@/modules/articles/presentation/components/forms/ArticleRejectForm";
import type { ArticleAction } from "@/modules/articles/presentation/constants/articles.dropdown";
import { ARTICLE_ACTION_CONFIG } from "@/modules/articles/presentation/constants/articles.workflow.config";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

const { Paragraph } = Typography;

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
 * @property {(values: IRejectArticleCredentials) => void} [onRejectSubmit] - Submit handler for the reject form
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
}

/**
 * Confirmation modal for article workflow transitions.
 *
 * @component
 *
 * @description
 * Maps article action types to French titles, descriptions, and danger
 * styling via `ARTICLE_ACTION_CONFIG`. For most actions, delegates
 * rendering to the shared `ActionModal`. For the "reject" action,
 * renders a custom modal with an inline `ArticleRejectForm` to
 * capture the rejection reason before confirming.
 *
 * @param {IArticleWorkflowModalProps} props - Component props
 * @returns {JSX.Element | null} The workflow modal, or null if no config/article
 */
const ArticleWorkflowModal: FC<IArticleWorkflowModalProps> = ({
    open,
    action,
    article,
    loading,
    error,
    onConfirm,
    onRejectSubmit,
    onCancel
}) => {
    const [rejectForm] = Form.useForm<IRejectArticleCredentials>();
    const config = action ? ARTICLE_ACTION_CONFIG[action] : undefined;

    if (!config || !article) return null;

    if (action === "reject") {
        const handleRejectSubmit = (values: IRejectArticleCredentials) => {
            onRejectSubmit?.(values);
        };

        return (
            <Modal open={open} centered title={config.title} footer={null} onCancel={onCancel}>
                <Paragraph type="secondary">{config.description}</Paragraph>

                <ArticleRejectForm
                    form={rejectForm}
                    error={error ?? null}
                    onSubmit={handleRejectSubmit}
                />

                <Flex justify="end" gap={8} style={{ marginTop: 16 }}>
                    <Button onClick={onCancel} danger>
                        Annuler
                    </Button>
                    <Button
                        type="primary"
                        danger
                        loading={loading}
                        onClick={() => rejectForm.submit()}
                    >
                        {config.confirmLabel}
                    </Button>
                </Flex>
            </Modal>
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
