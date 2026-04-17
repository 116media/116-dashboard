import type { FC } from "react";
import VideosListContainer from "@/modules/videos/presentation/containers/VideosListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

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
    <>
        <title>{`Vidéos | ${APP_NAME}`}</title>
        <VideosListContainer />
    </>
);

export default VideosPage;
