import { Button, Card, Drawer, Flex, Typography } from "antd";
import type { FC } from "react";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import PackageSlotForm from "@/modules/catalog/presentation/components/forms/PackageSlotForm";
import PackageSlotsList from "@/modules/catalog/presentation/components/ui/PackageSlotsList";
import PackageSlotsListLoading from "@/modules/catalog/presentation/components/ui/PackageSlotsList/PackageSlotsList.Loading";
import { useAddPackageSlot } from "@/modules/catalog/presentation/hooks/UseAddPackageSlot";
import { useManagePackageSlots } from "@/modules/catalog/presentation/hooks/UseManagePackageSlots";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Title } = Typography;

/**
 * Props for the PackageSlotsPanel component.
 *
 * @interface IPackageSlotsPanelProps
 * @property {boolean} open - Whether the drawer is visible
 * @property {IPackageEntity | null} bundle - The package to manage slots for
 * @property {() => void} onClose - Closes the drawer
 * @property {boolean} loading - Whether the package data is being refreshed
 * @property {() => void} onSuccess - Callback after a successful add/remove
 */
interface IPackageSlotsPanelProps {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onSuccess: () => void;
    bundle: IPackageEntity | null;
}

/**
 * Drawer panel for managing package content slots.
 *
 * @component
 *
 * @description
 * Displays existing slots via `PackageSlotsList` with delete
 * actions. Below the list, renders a `PackageSlotForm` to
 * add new slots.
 *
 * @param {IPackageSlotsPanelProps} props - Component props
 * @returns {JSX.Element} The slots management drawer
 */
const PackageSlotsPanel: FC<IPackageSlotsPanelProps> = ({ open, loading, bundle, onClose, onSuccess }) => {
    const addSlot = useAddPackageSlot(bundle?.id ?? null, onSuccess);
    const manageSlots = useManagePackageSlots(bundle?.id ?? null, onSuccess);

    return (
        <Drawer
            size={520}
            open={open}
            onClose={onClose}
            destroyOnHidden
            title={`Slots — ${bundle?.name ?? ""}`}
        >
            <ErrorAlert error={addSlot.error} showIcon closable banner={false} />
            <ErrorAlert error={manageSlots.removeError} showIcon closable banner={false} />

            <Title level={5}>Slots existants</Title>

            <Flex orientation="vertical">
                {loading ? (
                    <PackageSlotsListLoading />
                ) : (
                    <PackageSlotsList
                        slots={bundle?.slots ?? []}
                        removeLoading={manageSlots.removeLoading}
                        onRemove={manageSlots.onRemoveSlot}
                    />
                )}

                <Title level={5} style={{ marginTop: 24 }}>
                    Ajouter un slot
                </Title>
                <Card>
                    <PackageSlotForm
                        form={addSlot.form}
                        error={addSlot.error}
                        onSubmit={addSlot.onSubmit}
                    />

                    <Flex justify="end">
                        <Button
                            type="primary"
                            loading={addSlot.loading}
                            onClick={() => addSlot.form.submit()}
                        >
                            Ajouter
                        </Button>
                    </Flex>
                </Card>
            </Flex>
        </Drawer>
    );
};

export default PackageSlotsPanel;
