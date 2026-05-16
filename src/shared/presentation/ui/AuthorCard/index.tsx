import { Avatar, Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IAuthorEntity } from "@/shared/domain/entities/IAuthorEntity";
import { IconUserOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IAuthorCardProps {
    author: IAuthorEntity;
    showEmail?: boolean;
    showRole?: boolean;
    size?: "small" | "default" | "large";
}

const AVATAR_SIZE = {
    small: 32,
    default: 40,
    large: 48
};

const ROLE_COLORS: Record<string, string> = {
    SuperAdmin: "purple",
    Admin: "blue",
    Visitor: "default"
};

/**
 * Shared author profile card with avatar, name, email, and role badge.
 *
 * @component
 *
 * @description
 * Reusable component for displaying content authors across articles,
 * videos, shorts, and lyrics. Renders the author's avatar (or initials
 * fallback), display name, optional email, and optional role tag.
 * Adapts to three sizes for different contexts (list rows, detail
 * pages, sidebars).
 *
 * @example
 * ```tsx
 * <AuthorCard author={article.author} showEmail showRole />
 * <AuthorCard author={video.author} size="small" />
 * ```
 */
const AuthorCard: FC<IAuthorCardProps> = ({
    author,
    showEmail = false,
    showRole = false,
    size = "default"
}) => {
    const initials = author.userName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className={styles.authorCard}>
            <Avatar
                size={AVATAR_SIZE[size]}
                src={author.avatarUrl}
                icon={!author.avatarUrl && !initials ? <IconUserOutlined /> : undefined}
            >
                {!author.avatarUrl ? initials : undefined}
            </Avatar>

            <div className={styles.authorCard__info}>
                <Flex align="center" gap={6}>
                    <Text className={styles.authorCard__name}>{author.userName}</Text>
                    {showRole && author.role && (
                        <Tag color={ROLE_COLORS[author.role] ?? "default"}>{author.role}</Tag>
                    )}
                </Flex>
                {showEmail && author.email && (
                    <Text className={styles.authorCard__email}>{author.email}</Text>
                )}
            </div>
        </div>
    );
};

export default AuthorCard;
