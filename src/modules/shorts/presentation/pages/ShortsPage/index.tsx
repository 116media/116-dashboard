import type { FC } from "react";
import ShortsListContainer from "@/modules/shorts/presentation/containers/ShortsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

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
    <>
        <title>{`Courts-m\u00e9trages | ${APP_NAME}`}</title>
        <ShortsListContainer />
    </>
);

export default ShortsPage;
