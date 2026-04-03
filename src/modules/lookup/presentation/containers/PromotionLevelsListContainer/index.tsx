import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import PromotionLevelForm from "@/modules/lookup/presentation/components/forms/PromotionLevelForm";
import type { PromotionLevelAction } from "@/modules/lookup/presentation/components/tables/PromotionLevelsTable/columns";
import { promotionLevelsTableColumns } from "@/modules/lookup/presentation/components/tables/PromotionLevelsTable/columns";
import PromotionLevelActionModal from "@/modules/lookup/presentation/components/ui/PromotionLevelActionModal";
import { PROMOTION_LEVEL_STATUS_OPTIONS } from "@/modules/lookup/presentation/constants/lookup.promotion-levels.status";
import { useCreatePromotionLevel } from "@/modules/lookup/presentation/hooks/UseCreatePromotionLevel";
import { usePromotionLevelActions } from "@/modules/lookup/presentation/hooks/UsePromotionLevelActions";
import { usePromotionLevelsList } from "@/modules/lookup/presentation/hooks/UsePromotionLevelsList";
import { useUpdatePromotionLevel } from "@/modules/lookup/presentation/hooks/UseUpdatePromotionLevel";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconStarOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the promotion levels list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the promotion levels table, create/edit modals, and action
 * confirmation modal. Wires all hooks and manages modal state.
 * Uses client-side status filtering with no pagination or search.
 */
const PromotionLevelsListContainer: FC = () => {
    const list = usePromotionLevelsList();
    const createPromotionLevel = useCreatePromotionLevel();
    const [selectedEntity, setSelectedEntity] = useState<IPromotionLevelEntity | null>(null);
    const updatePromotionLevel = useUpdatePromotionLevel(selectedEntity);
    const actions = usePromotionLevelActions(list.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<PromotionLevelAction | null>(null);

    const { isSuperAdmin } = useAuthorization();

    const handleAction = useCallback(
        (action: PromotionLevelAction, entity: IPromotionLevelEntity) => {
            setSelectedEntity(entity);

            switch (action) {
                case "edit":
                    setEditOpen(true);
                    break;
                default:
                    setCurrentAction(action);
                    setActionOpen(true);
                    break;
            }
        },
        []
    );

    const handleActionConfirm = async () => {
        if (!selectedEntity || !currentAction) return;

        const actionMap = {
            activate: actions.onActivate,
            deactivate: actions.onDeactivate
        } as const;

        const handler = actionMap[currentAction as keyof typeof actionMap];
        if (handler) {
            await handler(selectedEntity.id);
            setActionOpen(false);
        }
    };

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Niveaux de promotion"
                subtitle="Gérer les niveaux de promotion disponibles."
                icon={<IconStarOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
                createLabel="Créer une promotion"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={PROMOTION_LEVEL_STATUS_OPTIONS}
                searchValue=""
                onSearchChange={() => {}}
                onSearch={() => {}}
            />

            <Table
                rowKey="id"
                dataSource={list.items}
                columns={promotionLevelsTableColumns(handleAction, isSuperAdmin)}
                loading={list.loading}
                pagination={false}
            />

            {createOpen && (
                <CreateEditModal
                    open={createOpen}
                    formContext="CREATE"
                    loading={createPromotionLevel.loading}
                    success={createPromotionLevel.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createPromotionLevel.form.submit()}
                    title={{
                        create: "Créer un niveau de promotion",
                        edit: "Modifier le niveau de promotion"
                    }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
                        createPromotionLevel.resetCreate();
                        list.reload();
                    }}
                >
                    <PromotionLevelForm
                        form={createPromotionLevel.form}
                        error={createPromotionLevel.error}
                        formContext="CREATE"
                    />
                </CreateEditModal>
            )}

            {editOpen && (
                <CreateEditModal
                    open={editOpen}
                    formContext="EDIT"
                    loading={updatePromotionLevel.loading}
                    success={updatePromotionLevel.success}
                    onClose={() => {
                        setEditOpen(false);
                        updatePromotionLevel.resetUpdate();
                    }}
                    onSubmit={() => updatePromotionLevel.form.submit()}
                    title={{
                        create: "Créer un niveau de promotion",
                        edit: "Modifier le niveau de promotion"
                    }}
                    onSuccessClose={() => {
                        setEditOpen(false);
                        updatePromotionLevel.resetUpdate();
                        list.reload();
                    }}
                >
                    <PromotionLevelForm
                        form={updatePromotionLevel.form}
                        error={updatePromotionLevel.error}
                        formContext="EDIT"
                        initialValues={selectedEntity}
                    />
                </CreateEditModal>
            )}

            <PromotionLevelActionModal
                open={actionOpen}
                promotionLevel={selectedEntity}
                action={currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />
        </>
    );
};

export default PromotionLevelsListContainer;
