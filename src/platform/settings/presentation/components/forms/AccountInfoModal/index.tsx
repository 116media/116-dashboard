import type { FormInstance } from "antd";
import { Button, Form, Input, Modal } from "antd";
import { type FC, useEffect, useState } from "react";
import type { IProfile } from "@/platform/settings/domain/entities/IProfile";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { SettingsValidator } from "@/platform/settings/presentation/utils/validators/settings.validator";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { COUNTRY_LIST, type ICountryObject } from "@/shared/infrastructure/constants/countries";
import CountrySelect from "@/shared/presentation/ui/CountrySelect";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import styles from "./index.module.scss";

interface IAccountInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: FormInstance<IUpdateAccountCredentials>;
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    onSubmit: (values: IUpdateAccountCredentials) => void;
    user: IProfile | null;
}

const AccountInfoModal: FC<IAccountInfoModalProps> = ({
    isOpen,
    onClose,
    form,
    loading,
    error,
    onSubmit,
    user
}) => {
    const [country, setCountry] = useState<ICountryObject>();
    const selectedCountryName = Form.useWatch("countryName", form);

    useEffect(() => {
        if (selectedCountryName) {
            const found = COUNTRY_LIST.find((c) => c.name === selectedCountryName);
            if (found) setCountry(found);
        }
    }, [selectedCountryName]);

    useEffect(() => {
        if (isOpen && user) {
            form.setFieldsValue({
                userName: user.userName,
                email: user.email ?? "",
                countryName: user.countryName ?? undefined,
                phonePartial: user.partialPhoneNumber ?? undefined
            });
        }
    }, [isOpen, user, form]);

    return (
        <Modal
            width={520}
            open={isOpen}
            destroyOnHidden
            onCancel={onClose}
            className={styles.modal}
            title="Modifier les informations du compte"
            footer={[
                <Button danger key="cancel" onClick={onClose}>Annuler</Button>,
                <Button key="submit" htmlType="submit" type="primary" loading={loading} onClick={() => form.submit()}>
                    Mettre à jour
                </Button>
            ]}
        >
            <Form form={form} layout="vertical" size="large" onFinish={onSubmit}>
                <Form.Item name="email" label="Adresse e-mail">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="userName"
                    label="Pseudo"
                    rules={SettingsValidator.userName("Pseudo")}
                >
                    <Input placeholder="Nom d'utilisateur" />
                </Form.Item>

                <Form.Item
                    name="countryName"
                    label="Indicatif téléphonique"
                    rules={SettingsValidator.countryName("Pays")}
                >
                    <CountrySelect />
                </Form.Item>

                <Form.Item
                    name="phonePartial"
                    label="Téléphone"
                    rules={SettingsValidator.phonePartial("Téléphone")}
                >
                    <Input prefix={country?.dialCode} placeholder="Ex: 788123456" />
                </Form.Item>

                <ErrorAlert error={error} showIcon closable banner={false} />
            </Form>
        </Modal>
    );
};

export default AccountInfoModal;
