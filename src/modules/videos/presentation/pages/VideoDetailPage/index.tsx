import type { FC } from "react";
import VideoDetailContainer from "@/modules/videos/presentation/containers/VideoDetailContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Video detail page.
 *
 * @component
 *
 * @description
 * Wraps the video detail container in a white card layout
 * matching the dashboard page style.
 */
const VideoDetailPage: FC = () => (
    <div className={styles.page}>
        <title>{`Détail de la vidéo | ${APP_NAME}`}</title>
        <VideoDetailContainer />
    </div>
);

export default VideoDetailPage;
