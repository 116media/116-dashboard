import { Button, Flex, Form, Modal, Typography } from "antd";
import type { FC } from "react";
import ArticleRejectForm from "@/modules/articles/presentation/components/forms/ArticleRejectForm";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import type { Failure } from "@/shared/domain/failures/failure";

const { Paragraph } = Typography;

/**
 * Props for the ArticleRejectModal component.
 *
 * @interface IArticleRejectModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {string} title - Modal title
 * @property {string} description - Explanation text shown below the title
 * @property {string} confirmLabel - Label for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display in the form
 * @property {(values: IRejectArticleCredentials) => void} onSubmit - Submit handler for the rejection form
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IArticleRejectModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    error: Failure | null | undefined;
    onSubmit: (values: IRejectArticleCredentials) => void;
    onCancel: () => void;
}

/**
 * Modal for rejecting an article with a required reason.
 *
 * @component
 *
 * @description
 * Renders a centered modal with an `ArticleRejectForm` for capturing
 * the rejection reason. The footer triggers form submission via `form.submit()`.
 *
 * @param {IArticleRejectModalProps} props - Component props
 * @returns {JSX.Element} The rendered rejection modal
 */
const ArticleRejectModal: FC<IArticleRejectModalProps> = ({
    open,
    loading,
    title,
    description,
    confirmLabel,
    error,
    onSubmit,
    onCancel
}) => {
    const [form] = Form.useForm<IRejectArticleCredentials>();

    return (
        <Modal
            centered
            open={open}
            title={title}
            onCancel={onCancel}
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

            <ArticleRejectForm form={form} error={error} onSubmit={onSubmit} />
        </Modal>
    );
};

export default ArticleRejectModal;
