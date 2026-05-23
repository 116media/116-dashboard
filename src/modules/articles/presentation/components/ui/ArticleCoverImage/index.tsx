import { Image } from "antd";
import type { FC } from "react";
import styles from "../ArticlePreview/index.module.scss";

interface IArticleCoverImageProps {
    src: string;
    alt: string;
}

/**
 * Cover image for the article preview.
 *
 * @component
 *
 * @description
 * Renders the article cover image with a preview mask
 * and border radius styling from the parent preview module.
 */
const ArticleCoverImage: FC<IArticleCoverImageProps> = ({ src, alt }) => (
    <div className={styles.articlePreview__cover}>
        <Image width="100%" alt={alt} src={src} preview={{ mask: "Aperçu" }} />
    </div>
);

export default ArticleCoverImage;
