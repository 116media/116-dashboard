import type { FC } from "react";
import RolesListContainer from "@/modules/roles/presentation/containers/RolesListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Roles management page.
 *
 * @component
 *
 * @description
 * Entry point for the `/roles` route. Renders the
 * `RolesListContainer` which orchestrates the table,
 * modals, and CRUD operations.
 */
const RolesPage: FC = () => {
    return (
        <div className={styles.page}>
            <title>{`Rôles | ${APP_NAME}`}</title>
            <RolesListContainer />
        </div>
    );
};

export default RolesPage;
