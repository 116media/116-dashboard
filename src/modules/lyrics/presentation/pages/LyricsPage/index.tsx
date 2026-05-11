import type { FC } from "react";
import LyricsListContainer from "@/modules/lyrics/presentation/containers/LyricsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Lyrics management page.
 *
 * @component
 *
 * @description
 * Renders the lyrics list container with page title.
 *
 * @returns The lyrics page
 */
const LyricsPage: FC = () => (
    <div className={styles.page}>
        <title>{`Paroles | ${APP_NAME}`}</title>
        <LyricsListContainer />
    </div>
);

export default LyricsPage;
