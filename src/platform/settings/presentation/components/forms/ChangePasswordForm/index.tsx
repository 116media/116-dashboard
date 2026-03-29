import type { FormInstance } from "antd";
import { Button, Form, Input } from "antd";
import type { FC } from "react";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import type { IChangePasswordCredentials } from "@/platform/settings/presentation/model/IChangePasswordCredentials";
import { ChangePasswordValidator } from "@/platform/settings/presentation/utils/validators/changepassword.validator";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconLockOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

interface IChangePasswordFormProps {
    form: FormInstance<IChangePasswordCredentials>;
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    onSubmit: (values: IChangePasswordCredentials) => void;
}

const ChangePasswordForm: FC<IChangePasswordFormProps> = ({ form, loading, error, onSubmit }) => {
    return (
        <SettingsCard title="Changer le mot de passe">
            <div className={styles.changePasswordForm}>
                <Form
                    form={form}
                    layout="vertical"
                    size="large"
                    validateTrigger={["onSubmit", "onBlur"]}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name="oldPassword"
                        label="Mot de passe actuel"
                        rules={ChangePasswordValidator.oldPassword("Mot de passe actuel")}
                    >
                        <Input.Password
                            prefix={<IconLockOutlined />}
                            placeholder="••••••••••••••"
                            visibilityToggle
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="Nouveau mot de passe"
                        rules={ChangePasswordValidator.newPassword("Nouveau mot de passe")}
                    >
                        <Input.Password
                            prefix={<IconLockOutlined />}
                            placeholder="••••••••••••••"
                            visibilityToggle
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirmer le mot de passe"
                        rules={ChangePasswordValidator.confirmPassword(
                            "Confirmation du mot de passe"
                        )}
                    >
                        <Input.Password
                            prefix={<IconLockOutlined />}
                            placeholder="••••••••••••••"
                            visibilityToggle
                        />
                    </Form.Item>

                    <ErrorAlert error={error} showIcon closable banner={false} />

                    <div className={styles.changePasswordForm__footer}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Mettre à jour
                        </Button>
                    </div>
                </Form>
            </div>
        </SettingsCard>
    );
};

export default ChangePasswordForm;
