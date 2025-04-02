import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import { type FC, useEffect, useState } from "react";
import type { IProfile } from "@/platform/settings/domain/entities/IProfile";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { SettingsValidator } from "@/platform/settings/presentation/utils/validators/settings.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { COUNTRY_LIST, type ICountryObject } from "@/shared/infrastructure/constants/countries";
import CountrySelect from "@/shared/presentation/ui/CountrySelect";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

import styles from "./index.module.scss";

interface IAccountInfoModalProps {
    isOpen: boolean;
    loading: boolean;
    onClose: () => void;
    user: IProfile | null;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IUpdateAccountCredentials>;
    onSubmit: (values: IUpdateAccountCredentials) => void;
}

const AccountInfoModal: FC<IAccountInfoModalProps> = ({
    isOpen,
    onClose,
    form,
    loading,
    error,
    success,
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
        <CreateEditModal
            width={520}
            open={isOpen}
            success={success}
            loading={loading}
            onClose={onClose}
            formContext="EDIT"
            onSuccessClose={onClose}
            onSubmit={() => form.submit()}
            title={{
                create: "",
                edit: "Modifier les informations du compte"
            }}
        >
            <Form
                form={form}
                layout="vertical"
                size="large"
                onFinish={onSubmit}
                className={styles.modal}
            >
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
                    rules={SettingsValidator.phonePartial("Téléphone", country?.dialCode)}
                >
                    <Input prefix={country?.dialCode} placeholder="Numéro de téléphone" />
                </Form.Item>

                <ErrorAlert error={error} showIcon closable banner={false} />
            </Form>
        </CreateEditModal>
    );
};

export default AccountInfoModal;
