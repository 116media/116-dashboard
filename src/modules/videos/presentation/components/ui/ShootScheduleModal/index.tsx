import type { FormInstance } from "antd";
import type { FC } from "react";
import ShootScheduleForm from "@/modules/videos/presentation/components/forms/ShootScheduleForm";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";

/**
 * Props for the ShootScheduleModal component.
 *
 * @interface IShootScheduleModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {Failure | null | undefined} error - Backend error to display in the form alert
 * @property {FormInstance<IScheduleShootCredentials>} form - Ant Design form instance
 * @property {(values: IScheduleShootCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface IShootScheduleModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IScheduleShootCredentials>;
    onSubmit: (values: IScheduleShootCredentials) => void;
    onCancel: () => void;
    onSuccessClose: () => void;
    onReset?: () => void;
}

/**
 * Modal for scheduling a video shoot.
 *
 * @component
 *
 * @description
 * Wraps the `ShootScheduleForm` inside a `CreateEditModal` configured
 * in edit mode. Displays a success view when the scheduling completes.
 *
 * @param {IShootScheduleModalProps} props - Component props
 * @returns {JSX.Element} The shoot schedule modal
 */
const ShootScheduleModal: FC<IShootScheduleModalProps> = ({
    open,
    loading,
    success,
    error,
    form,
    onSubmit,
    onCancel,
    onSuccessClose,
    onReset
}) => {
    return (
        <CreateEditModal
            open={open}
            loading={loading}
            formContext="EDIT"
            success={success}
            onClose={onCancel}
            onSubmit={() => form.submit()}
            onSuccessClose={onSuccessClose}
            afterClose={() => {
                form.resetFields();
                onReset?.();
            }}
            title={{ create: "Planifier un tournage", edit: "Planifier un tournage" }}
        >
            <ShootScheduleForm form={form} error={error} onSubmit={onSubmit} />
        </CreateEditModal>
    );
};

export default ShootScheduleModal;
