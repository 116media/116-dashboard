import { Button, Flex, Form, Modal, Typography } from "antd";
import type { FC } from "react";
import ArticleUnpromoteForm from "@/modules/articles/presentation/components/forms/ArticleUnpromoteForm";
import type { IUnpromoteArticleCredentials } from "@/modules/articles/presentation/model/IUnpromoteArticleCredentials";
import type { Failure } from "@/shared/domain/failures/failure";

const { Paragraph } = Typography;

/**
 * Props for the ArticleUnpromoteModal component.
 *
 * @interface IArticleUnpromoteModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {string} title - Modal title
 * @property {string} description - Explanation text shown below the title
 * @property {string} confirmLabel - Label for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display in the form
 * @property {(values: IUnpromoteArticleCredentials) => void} onSubmit - Submit handler for the unpromote form
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IArticleUnpromoteModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    error: Failure | null | undefined;
    onSubmit: (values: IUnpromoteArticleCredentials) => void;
    onCancel: () => void;
}

/**
 * Modal for removing the promotion of an article with a required audit reason.
 *
 * @component
 *
 * @description
 * Renders a centered modal with an `ArticleUnpromoteForm` for capturing
 * the audit reason. The footer triggers form submission via `form.submit()`.
 *
 * @param {IArticleUnpromoteModalProps} props - Component props
 * @returns {JSX.Element} The rendered unpromote modal
 */
const ArticleUnpromoteModal: FC<IArticleUnpromoteModalProps> = ({
    open,
    loading,
    title,
    description,
    confirmLabel,
    error,
    onSubmit,
    onCancel
}) => {
    const [form] = Form.useForm<IUnpromoteArticleCredentials>();

    return (
        <Modal
            centered
            open={open}
            onCancel={onCancel}
            title={title}
            footer={
                <Flex gap={8} justify="space-between" flex={1}>
                    <Button danger onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button danger type="primary" loading={loading} onClick={() => form.submit()}>
                        {confirmLabel}
                    </Button>
                </Flex>
            }
        >
            <Paragraph type="secondary">{description}</Paragraph>

            <ArticleUnpromoteForm form={form} error={error} onSubmit={onSubmit} />
        </Modal>
    );
};

export default ArticleUnpromoteModal;
