import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import {
    VIDEO_DROPDOWN_ITEMS,
    type VideoAction
} from "@/modules/videos/presentation/constants/videos.dropdown";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import { CONTENT_STATUS_CONFIG } from "@/shared/presentation/constants/content.status.config";
import { Colors } from "@/shared/presentation/constants/theme";
import {
    IconCheckCircleFilled,
    IconCloseCircleFilled,
    IconYoutubeFilled
} from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";

const { Text, Link } = Typography;

export type { VideoAction };

/**
 * Generates Ant Design table column definitions for the videos table.
 *
 * @description
 * Builds columns for title, category, YouTube link icon, status tag,
 * featured flag, lyrics flag, published date, and an actions dropdown.
 * The dropdown items are filtered based on video status and the current
 * user's role.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const videosTableColumns = (
    onAction: (action: VideoAction, record: IVideoSummaryEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<IVideoSummaryEntity> => [
    {
        title: "Titre",
        dataIndex: "title",
        key: "title",
        width: 220,
        ellipsis: true,
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (title: string) => (
            <Text strong ellipsis>
                {title}
            </Text>
        )
    },
    {
        title: "Catégorie",
        dataIndex: "categoryName",
        key: "categoryName",
        width: 160,
        ellipsis: true,
        sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
        render: (name: string) => <Text>{name}</Text>
    },
    {
        title: "YouTube",
        dataIndex: "youtubeVideoUrl",
        key: "youtubeVideoUrl",
        width: 90,
        align: "center",
        render: (youtubeVideoUrl: string | null) =>
            youtubeVideoUrl ? (
                <Link href={youtubeVideoUrl} target="_blank" rel="noopener noreferrer">
                    <IconYoutubeFilled style={{ color: Colors.Error, fontSize: 18 }} />
                </Link>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Statut",
        dataIndex: "status",
        key: "status",
        width: 160,
        render: (status: EnumContentStatus) => (
            <StatusTag status={status} config={CONTENT_STATUS_CONFIG} />
        )
    },
    {
        title: "En vedette",
        dataIndex: "isFeatured",
        key: "isFeatured",
        width: 110,
        align: "center",
        render: (isFeatured: boolean) =>
            isFeatured ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconCloseCircleFilled style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Paroles",
        dataIndex: "hasLyrics",
        key: "hasLyrics",
        width: 90,
        align: "center",
        render: (hasLyrics: boolean) =>
            hasLyrics ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconCloseCircleFilled style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Publié le",
        dataIndex: "publishedAt",
        key: "publishedAt",
        width: 160,
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY HH:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IVideoSummaryEntity) => {
            const items: ITableActionItem[] = VIDEO_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: item.label,
                danger: item.danger,
                onClick: () => onAction(item.key, record),
                hidden: item.hidden(record, isSuperAdmin, isAdminOrSuperAdmin)
            }));

            return <TableActionDropdown items={items} />;
        }
    }
];
