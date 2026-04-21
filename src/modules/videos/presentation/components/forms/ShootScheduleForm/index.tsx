import type { FormInstance } from "antd";
import { DatePicker, Form } from "antd";
import type { FC } from "react";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import { VideosShootValidator } from "@/modules/videos/presentation/utils/validators/videos.shoot.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the ShootScheduleForm component.
 *
 * @interface IShootScheduleFormProps
 * @property {FormInstance<IScheduleShootCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IScheduleShootCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IShootScheduleFormProps {
    error: Failure | null | undefined;
    form: FormInstance<IScheduleShootCredentials>;
    onSubmit: (values: IScheduleShootCredentials) => void;
}

/**
 * Form for scheduling a video shoot.
 *
 * @component
 *
 * @description
 * Renders a DatePicker for selecting the shoot date and time.
 * Used inside the shoot schedule modal.
 *
 * @param {IShootScheduleFormProps} props - Component props
 * @returns {JSX.Element} The rendered shoot schedule form
 */
const ShootScheduleForm: FC<IShootScheduleFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="shoot_schedule_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="shootingScheduledAt"
                label="Date du tournage"
                rules={VideosShootValidator.shootingScheduledAt("Date du tournage")}
            >
                <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    style={{ width: "100%" }}
                    placeholder="Sélectionner une date"
                />
            </Item>
        </Form>
    );
};

export default ShootScheduleForm;
