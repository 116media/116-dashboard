import { InboxOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { Form, Select, Upload } from "antd";
import type { FC } from "react";
import { PAYMENT_METHOD_OPTIONS } from "@/modules/commerce/presentation/constants/commerce.payment.dropdown";
import type { IAttachPaymentProofCredentials } from "@/modules/commerce/presentation/model/IAttachPaymentProofCredentials";
import { PaymentValidator } from "@/modules/commerce/presentation/utils/validators/commerce.payment.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { Dragger } = Upload;

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
                name="file"
                label="Preuve de paiement"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={PaymentValidator.file("Preuve de paiement")}
            >
                <Dragger maxCount={1} beforeUpload={() => false} accept="image/*,.pdf">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Cliquez ou glissez le fichier ici</p>
                </Dragger>
            </Item>
        </Form>
    );
};

export default PaymentProofForm;
