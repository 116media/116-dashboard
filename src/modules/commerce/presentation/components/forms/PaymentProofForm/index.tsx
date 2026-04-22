import type { FormInstance } from "antd";
import { Form, Select } from "antd";
import { type FC, useCallback, useState } from "react";
import { PAYMENT_METHOD_OPTIONS } from "@/modules/commerce/presentation/constants/commerce.payment.dropdown";
import type { IAttachPaymentProofCredentials } from "@/modules/commerce/presentation/model/IAttachPaymentProofCredentials";
import { PaymentValidator } from "@/modules/commerce/presentation/utils/validators/commerce.payment.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { RAW_FILE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";

const { Item } = Form;

/**
 * Props for the PaymentProofForm component.
 *
 * @interface IPaymentProofFormProps
 * @property {FormInstance} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IAttachPaymentProofCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IPaymentProofFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IAttachPaymentProofCredentials) => void;
}

/**
 * Form for attaching a payment proof to an order.
 *
 * @component
 *
 * @description
 * Renders a payment method select and a file upload dragger
 * for attaching proof of payment (image or PDF).
 *
 * @param {IPaymentProofFormProps} props - Component props
 * @returns {JSX.Element} The rendered payment proof form
 */
const PaymentProofForm: FC<IPaymentProofFormProps> = ({ form, error, onSubmit }) => {
    const [hasFile, setHasFile] = useState(false);

    const handleFileSelect = useCallback(
        (file: File) => {
            form.setFieldValue("file", [{ originFileObj: file }]);
            setHasFile(true);
        },
        [form]
    );

    const handleFileRemove = useCallback(() => {
        form.setFieldValue("file", null);
        setHasFile(false);
    }, [form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="payment_proof_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="paymentMethod"
                label="Mode de paiement"
                rules={PaymentValidator.paymentMethod("Mode de paiement")}
            >
                <Select
                    options={[...PAYMENT_METHOD_OPTIONS]}
                    placeholder="Sélectionner un mode de paiement"
                />
            </Item>

            <Item
                label="Preuve de paiement"
                rules={[{ required: !hasFile, message: "La preuve de paiement est requise" }]}
            >
                <FileUploader
                    mode="deferred"
                    preset={RAW_FILE_PRESET}
                    onFileSelect={handleFileSelect}
                    onRemove={handleFileRemove}
                />
            </Item>
        </Form>
    );
};

export default PaymentProofForm;
