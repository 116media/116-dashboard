import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IUnpromoteVideoCredentials } from "@/modules/videos/presentation/model/IUnpromoteVideoCredentials";
import { VideosUnpromoteValidator } from "@/modules/videos/presentation/utils/validators/videos.unpromote.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the VideoUnpromoteForm component.
 *
 * @interface IVideoUnpromoteFormProps
 * @property {FormInstance<IUnpromoteVideoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUnpromoteVideoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IVideoUnpromoteFormProps {
    form: FormInstance<IUnpromoteVideoCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IUnpromoteVideoCredentials) => void;
}

/**
 * Form for removing the promotion of a video with an audit reason.
 *
 * @component
 *
 * @description
 * Renders a single reason textarea with character count.
 * Used inline within the workflow confirmation modal when the
 * "unpromote" action is selected.
 *
 * @param {IVideoUnpromoteFormProps} props - Component props
 * @returns {JSX.Element} The rendered unpromote form
 */
const VideoUnpromoteForm: FC<IVideoUnpromoteFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="video_unpromote_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="reason" label="Raison" rules={VideosUnpromoteValidator.reason("Raison")}>
                <TextArea
                    rows={4}
                    maxLength={500}
                    showCount
                    placeholder="Indiquez la raison du retrait de la promotion"
                />
            </Item>
        </Form>
    );
};

export default VideoUnpromoteForm;
