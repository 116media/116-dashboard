import { Button, Flex, Typography } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IBulkPermissionFooterProps {
    totalAssigned: number;
    hasPendingChanges: boolean;
    loading: boolean;
    onCancel: () => void;
    onSave: () => void;
}

/**
 * Footer for the bulk permission modal.
 *
 * @component
 *
 * @description
 * Displays either a pending changes warning or the total assigned count.
 * Provides cancel and save buttons. Save is disabled when no changes exist.
 */
const BulkPermissionFooter: FC<IBulkPermissionFooterProps> = ({
    totalAssigned,
    hasPendingChanges,
    loading,
    onCancel,
    onSave
}) => (
    <Flex className={styles.bulkPermissionFooter}>
        <span>
            {hasPendingChanges ? (
                <Text className={styles.bulkPermissionFooter__pending}>
                    Modifications en attente de sauvegarde
                </Text>
            ) : (
                <Text className={styles.bulkPermissionFooter__count}>
                    {totalAssigned} permissions assignées
                </Text>
            )}
        </span>
        <Flex gap={8}>
            <Button onClick={onCancel} danger>
                Annuler
            </Button>
            <Button type="primary" loading={loading} onClick={onSave} disabled={!hasPendingChanges}>
                Enregistrer
            </Button>
        </Flex>
    </Flex>
);

export default BulkPermissionFooter;
