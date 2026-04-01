import { Alert, Flex, Form, Select, Tag, Typography } from "antd";
import { type FC, useMemo, useState } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Props for the RolePermissionModal component.
 *
 * @interface IRolePermissionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {IRoleWithPermissions | null} role - The role being managed
 * @property {IPermissionEntity[]} permissions - All available permissions
 * @property {boolean} permissionsLoading - Loading state for the permissions list
 * @property {"assign" | "remove"} mode - Whether assigning or removing a permission
 * @property {(permissionId: string) => void} onConfirm - Confirm handler with selected permission ID
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IRolePermissionModalProps {
    open: boolean;
    loading: boolean;
    error: Failure | null | undefined;
    role: IRoleWithPermissions | null;
    permissions: IPermissionEntity[];
    permissionsLoading: boolean;
    mode: "assign" | "remove";
    onConfirm: (permissionId: string) => void;
    onCancel: () => void;
}

/**
 * Modal for assigning or removing a single permission from a role.
 *
 * @component
 *
 * @description
 * Uses the shared `CreateEditModal` for consistent styling.
 * Displays the role name and a searchable Select dropdown.
 * In "assign" mode, shows all permissions with already-assigned
 * ones disabled. In "remove" mode, shows only the permissions
 * currently assigned to the role.
 *
 * @param {IRolePermissionModalProps} props - Component props
 * @returns {JSX.Element | null} The permission modal
 */
const RolePermissionModal: FC<IRolePermissionModalProps> = ({
    open,
    loading,
    error,
    role,
    permissions,
    permissionsLoading,
    mode,
    onConfirm,
    onCancel
}) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const assignedIds = useMemo(
        () => new Set((role?.permissions ?? []).map((p) => p.id)),
        [role?.permissions]
    );

    const options = useMemo(() => {
        if (!role) return [];

        const source =
            mode === "assign"
                ? permissions.filter((p) => !assignedIds.has(p.id))
                : (role.permissions ?? []);

        return source.map((p) => ({
            value: p.id,
            description: p.description,
            label: `${p.resource}:${p.action}`
        }));
    }, [mode, permissions, role, assignedIds]);

    if (!role) return null;

    const handleCancel = () => {
        setSelectedId(null);
        onCancel();
    };

    const handleConfirm = () => {
        if (!selectedId) return;
        onConfirm(selectedId);
        setSelectedId(null);
    };

    const filterOption = (input: string, option?: { label?: string; description?: string }) => {
        const search = input.toLowerCase();
        return (
            (option?.label?.toLowerCase().includes(search) ?? false) ||
            (option?.description?.toLowerCase().includes(search) ?? false)
        );
    };

    return (
        <CreateEditModal
            width={480}
            open={open}
            success={null}
            loading={loading}
            formContext="EDIT"
            onClose={handleCancel}
            onSubmit={handleConfirm}
            onSuccessClose={handleCancel}
            title={{
                create: "",
                edit: mode === "assign" ? "Assigner une permission" : "Retirer une permission"
            }}
        >
            <ErrorAlert error={error} banner showIcon closable={false} />

            <Flex className={styles.rolePermission__info}>
                <Alert showIcon type="info" title={`Rôle : ${role.name}`} />
            </Flex>

            <Form layout="vertical" size="large">
                <Form.Item label="Permission">
                    <Select
                        allowClear
                        showSearch={{
                            filterOption
                        }}
                        value={selectedId}
                        loading={permissionsLoading}
                        disabled={permissionsLoading}
                        onChange={(val) => setSelectedId(val ?? null)}
                        placeholder={mode === "assign" ? "Rechercher..." : "Sélectionner..."}
                        optionRender={(option) => (
                            <Flex gap={24} align="center" className={styles.rolePermission__option}>
                                <Tag color="blue">{option.label}</Tag>
                                {option.data.description && (
                                    <Text ellipsis type="secondary" style={{ fontSize: 12 }}>
                                        {option.data.description}
                                    </Text>
                                )}
                            </Flex>
                        )}
                        options={options}
                    />
                </Form.Item>
            </Form>
        </CreateEditModal>
    );
};

export default RolePermissionModal;
