import { Flex, Progress, Typography } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IUploadProgressProps {
    fileName: string | null;
    fileSize: string | null;
    percent: number;
}

/**
 * Upload progress indicator shown during file upload.
 *
 * @component
 *
 * @description
 * Displays file name, size, percentage, and a progress bar
 * inside a bordered container. Used by FileUploader during
 * immediate mode uploads.
 */
const UploadProgress: FC<IUploadProgressProps> = ({ fileName, fileSize, percent }) => (
    <div className={styles.uploadProgress}>
        <Flex justify="space-between" align="center">
            <Flex gap={8} align="center">
                <Text strong>{fileName}</Text>
                <Text type="secondary">{fileSize}</Text>
            </Flex>
            <Text type="secondary">{percent} %</Text>
        </Flex>
        <Progress
            size="small"
            showInfo={false}
            percent={percent}
            className={styles.uploadProgress__bar}
        />
    </div>
);

export default UploadProgress;
