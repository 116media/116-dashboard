import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button, Flex, Layout, Space, Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import notFound from "@/assets/lottie/404_anim.lottie";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import { OVERVIEW_PATH } from "@/shared/infrastructure/constants/paths";
import { IconHomeOutlined } from "@/shared/presentation/ui/Icons";
import { LottieUtils } from "@/shared/presentation/utils/lottie/lottie.utils";

import styles from "./index.module.scss";

const { Content } = Layout;
const { Title } = Typography;

/**
 * 404 Not Found page component.
 *
 * @component
 *
 * @description
 * Displays a user-friendly 404 error page with:
 * - Animated 404 Lottie illustration
 * - French error message
 * - Navigation button to return to dashboard
 * - SEO-optimized page title
 *
 * @returns The 404 not found page
 */
export const NotFoundPage: FC = () => {
    const lottieOptions = LottieUtils.options(notFound);

    return (
        <HelmetProvider>
            <Content className={styles.notFound}>
                <Helmet>
                    <title>Page introuvable | {APP_NAME}</title>
                </Helmet>

                <Space orientation="vertical" align="center" size="large">
                    <DotLottieReact className={styles.notFound__lottie} {...lottieOptions} />

                    <Flex justify="center">
                        <Title data-text="title">Oops! Page non trouvée</Title>
                    </Flex>
                    <Button
                        size="large"
                        type="primary"
                        rel="noopener"
                        href={OVERVIEW_PATH}
                        icon={<IconHomeOutlined />}
                    >
                        Retour à l'Accueil
                    </Button>
                </Space>
            </Content>
        </HelmetProvider>
    );
};
