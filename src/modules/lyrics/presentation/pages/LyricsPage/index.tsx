import type { FC } from "react";
import LyricsListContainer from "@/modules/lyrics/presentation/containers/LyricsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

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
    <>
        <title>{`Paroles | ${APP_NAME}`}</title>
        <LyricsListContainer />
    </>
);

export default LyricsPage;
