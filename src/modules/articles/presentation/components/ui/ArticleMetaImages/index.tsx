import { Image, Masonry, Typography } from "antd";
import type { FC } from "react";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import styles from "../ArticleMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IArticleMetaImagesProps {
    images: IArticleImageEntity[];
}

/**
 * Images section of the article meta sidebar.
 *
 * @component
 *
 * @description
 * Renders a masonry grid of all uploaded article images
 * with a count label and preview-on-click support.
 */
const ArticleMetaImages: FC<IArticleMetaImagesProps> = ({ images }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            Images ({images.length})
        </Text>
        <Masonry
            gutter={8}
            columns={2}
            items={images.map((img) => ({
                key: img.id,
                data: img
            }))}
            itemRender={({ data: img }) => (
                <div className={styles.metaSidebar__image}>
                    <Image src={img.url} alt={img.imageType} />
                </div>
            )}
        />
    </div>
);

export default ArticleMetaImages;
