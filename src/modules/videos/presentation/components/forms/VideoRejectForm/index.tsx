import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import { VideosRejectValidator } from "@/modules/videos/presentation/utils/validators/videos.reject.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the VideoRejectForm component.
 *
 * @interface IVideoRejectFormProps
 * @property {FormInstance<IRejectVideoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IRejectVideoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IVideoRejectFormProps {
    error: Failure | null | undefined;
    form: FormInstance<IRejectVideoCredentials>;
    onSubmit: (values: IRejectVideoCredentials) => void;
}

/**
 * Form for rejecting a video with a reason.
 *
 * @component
 *
 * @description
 * Renders a single rejection reason textarea with character count.
 * Used inline within the workflow confirmation modal when the
 * "reject" action is selected.
 *
 * @param {IVideoRejectFormProps} props - Component props
 * @returns {JSX.Element} The rendered rejection form
 */
const VideoRejectForm: FC<IVideoRejectFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="video_reject_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="rejectionReason"
                label="Raison du rejet"
                rules={VideosRejectValidator.rejectionReason("Raison du rejet")}
            >
                <TextArea
                    rows={4}
                    showCount
                    maxLength={500}
                    placeholder="Indiquez la raison du rejet"
                />
            </Item>
        </Form>
    );
};

export default VideoRejectForm;
