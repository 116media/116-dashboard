import type { FC } from "react";
import PermissionsListContainer from "@/modules/permissions/presentation/containers/PermissionsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Permissions management page.
 *
 * @component
 *
 * @description
 * Entry point for the `/permissions` route. Renders the
 * `PermissionsListContainer` which orchestrates the table,
 * modals, and CRUD operations.
 */
const PermissionsPage: FC = () => {
    return (
        <div className={styles.page}>
            <title>{`Permissions | ${APP_NAME}`}</title>
            <PermissionsListContainer />
        </div>
    );
};

export default PermissionsPage;
