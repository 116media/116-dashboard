import { Button, Drawer, List, Popconfirm, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import PackageSlotForm from "@/modules/catalog/presentation/components/forms/PackageSlotForm";
import { useAddPackageSlot } from "@/modules/catalog/presentation/hooks/UseAddPackageSlot";
import { useManagePackageSlots } from "@/modules/catalog/presentation/hooks/UseManagePackageSlots";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconDeleteFilled } from "@/shared/presentation/ui/Icons";

const { Text, Title } = Typography;

interface IPackageSlotsPanelProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    pkg: IPackageEntity | null;
}

const PackageSlotsPanel: FC<IPackageSlotsPanelProps> = ({ open, pkg, onClose, onSuccess }) => {
    const addSlot = useAddPackageSlot(pkg?.id ?? null, onSuccess);
    const manageSlots = useManagePackageSlots(pkg?.id ?? null, onSuccess);

    return (
        <Drawer
            open={open}
            width={480}
            onClose={onClose}
            destroyOnClose
            title={`Slots — ${pkg?.name ?? ""}`}
        >
            <ErrorAlert error={addSlot.error} showIcon closable banner={false} />
            <ErrorAlert error={manageSlots.removeError} showIcon closable banner={false} />

            <Title level={5}>Slots existants</Title>

            <List
                size="small"
                dataSource={pkg?.slots ?? []}
                locale={{ emptyText: "Aucun slot configuré" }}
                renderItem={(slot: IPackageSlotEntity) => (
                    <List.Item
                        actions={[
                            <Popconfirm
                                key="delete"
                                title="Supprimer ce slot ?"
                                onConfirm={() => manageSlots.onRemoveSlot(slot.id)}
                                okText="Oui"
                                cancelText="Non"
                            >
                                <Button
                                    type="text"
                                    size="small"
                                    danger
                                    loading={manageSlots.removeLoading}
                                    icon={<IconDeleteFilled />}
                                />
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <>
                                    <Text strong>{slot.categoryName ?? "Catégorie libre"}</Text>
                                    {" × "}
                                    <Text>{slot.quantity}</Text>
                                </>
                            }
                            description={
                                <Tag color={slot.isRequired ? "blue" : "default"}>
                                    {slot.isRequired ? "Obligatoire" : "Optionnel"}
                                </Tag>
                            }
                        />
                    </List.Item>
                )}
            />

            <Title level={5} style={{ marginTop: 24 }}>
                Ajouter un slot
            </Title>

            <PackageSlotForm
                form={addSlot.form}
                error={addSlot.error}
                onSubmit={addSlot.onSubmit}
            />

            <Button type="primary" loading={addSlot.loading} onClick={() => addSlot.form.submit()}>
                Ajouter
            </Button>
        </Drawer>
    );
};

export default PackageSlotsPanel;
