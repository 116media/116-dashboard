import { Button, Col, Flex, Row } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import VideoMetaSidebar from "@/modules/videos/presentation/components/ui/VideoMetaSidebar";
import VideoPreview from "@/modules/videos/presentation/components/ui/VideoPreview";
import { VIDEO_PATH } from "@/shared/presentation/constants/paths";
import { IconArrowLeftOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

interface IVideoDetailViewProps {
    video: IVideoEntity;
}

/**
 * Full video detail view — two-column layout.
 *
 * @component
 *
 * @description
 * Left column: video preview (thumbnail, title, description, tags).
 * Right column: admin sidebar with informations, SEO, and options.
 * Back button navigates to the videos list.
 */
const VideoDetailView: FC<IVideoDetailViewProps> = ({ video }) => {
    const navigate = useNavigate();

    return (
        <>
            <Flex align="center" className={styles.videoDetail__back}>
                <Button
                    type="link"
                    variant="text"
                    icon={<IconArrowLeftOutlined />}
                    onClick={() => navigate(VIDEO_PATH)}
                >
                    Retour aux vidéos
                </Button>
            </Flex>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={14}>
                    <VideoPreview video={video} />
                </Col>
                <Col xs={24} lg={10}>
                    <VideoMetaSidebar video={video} />
                </Col>
            </Row>
        </>
    );
};

export default VideoDetailView;
