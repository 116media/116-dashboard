import type { FC } from "react";
import ShortsListContainer from "@/modules/shorts/presentation/containers/ShortsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Shorts management page.
 *
 * @component
 *
 * @description
 * Renders the shorts list container with page title.
 *
 * @returns The shorts page
 */
const ShortsPage: FC = () => (
    <div className={styles.page}>
        <title>{`Réels | ${APP_NAME}`}</title>
        <ShortsListContainer />
    </div>
);

export default ShortsPage;
