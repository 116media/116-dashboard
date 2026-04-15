import { Image, Typography } from "antd";
import type { FC } from "react";
import { IconFilePdfOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Text } = Typography;

const FALLBACK_IMAGE =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

/**
 * Props for the PaymentProofPreview component.
 *
 * @interface IPaymentProofPreviewProps
 *
 * @property {string} proofUrl - URL to the proof file
 * @property {string} fileName - Original file name of the proof
 */
interface IPaymentProofPreviewProps {
    proofUrl: string;
    fileName: string;
}

/**
 * Preview panel for the payment proof file.
 *
 * @component
 *
 * @description
 * Renders an image preview with lightbox for image files,
 * or a PDF icon with download link for PDF files.
 *
 * @param {IPaymentProofPreviewProps} props - Component props
 * @returns {JSX.Element} The proof preview panel
 */
const PaymentProofPreview: FC<IPaymentProofPreviewProps> = ({ proofUrl, fileName }) => {
    const isPdf = /\.pdf$/i.test(fileName);

    return (
        <div className={styles.proofPreview}>
            <Text type="secondary" strong className={styles.proofPreview__sectionLabel}>
                Preuve de paiement
            </Text>

            {!isPdf ? (
                <div className={styles.proofPreview__imageWrapper}>
                    <Image
                        src={proofUrl}
                        alt={fileName}
                        fallback={FALLBACK_IMAGE}
                        preview={{ mask: "Aperçu" }}
                    />
                </div>
            ) : (
                <div className={styles.proofPreview__pdf}>
                    <IconFilePdfOutlined className={styles.proofPreview__pdfIcon} />
                    <a href={proofUrl} target="_blank" rel="noopener noreferrer">
                        Télécharger le fichier
                    </a>
                </div>
            )}
        </div>
    );
};

export default PaymentProofPreview;
