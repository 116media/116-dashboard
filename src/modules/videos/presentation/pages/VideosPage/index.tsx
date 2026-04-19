import type { FC } from "react";
import VideosListContainer from "@/modules/videos/presentation/containers/VideosListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Videos management page.
 *
 * @component
 *
 * @description
 * Renders the videos list container with page title.
 *
 * @returns The videos page
 */
const VideosPage: FC = () => (
    <div className={styles.page}>
        <title>{`Vidéos | ${APP_NAME}`}</title>
        <VideosListContainer />
    </div>
);

export default VideosPage;
