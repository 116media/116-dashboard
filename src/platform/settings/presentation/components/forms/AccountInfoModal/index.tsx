import type { FormInstance } from "antd";
import { Button, Form, Input, Modal, Select } from "antd";
import { type FC, useEffect, useState } from "react";
import type { IProfile } from "@/platform/settings/domain/entities/IProfile";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { SettingsValidator } from "@/platform/settings/presentation/utils/validators/settings.validator";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { COUNTRY_LIST, type ICountryObject } from "@/shared/infrastructure/constants/countries";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import styles from "./index.module.scss";

const { Option } = Select;

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
            title="Modifier les informations du compte"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            width={520}
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
                    <Select showSearch optionLabelProp="label" placeholder="Sélectionner un pays">
                        {COUNTRY_LIST.map((c) => (
                            <Option value={c.name} key={c.name} label={c.name}>
                                <div className="d-flex justify-content-between">
                                    <span>
                                        <img width={15} height={15} src={c.flag} alt={c.isoCode} />
                                    </span>
                                    <span className="mx-2 fw-medium">
                                        {c.name.length > 35 ? `${c.name.slice(0, 32)}...` : c.name}
                                    </span>
                                    <span className="text-secondary">{c.dialCode}</span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="phonePartial"
                    label="Téléphone"
                    rules={SettingsValidator.phonePartial("Téléphone")}
                >
                    <Input prefix={country?.dialCode} placeholder="ex: 788123456" />
                </Form.Item>

                <ErrorAlert error={error} showIcon closable banner={false} />

                <div className={styles.footer}>
                    <Button onClick={onClose}>Annuler</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Mettre à jour
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AccountInfoModal;
