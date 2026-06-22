import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import {
    SHORT_DROPDOWN_ITEMS,
    type ShortAction
} from "@/modules/shorts/presentation/constants/shorts.dropdown";
import { ENTITY_STATUS_CONFIG } from "@/shared/presentation/constants/entity.status.config";
import { ADMIN_PATH } from "@/shared/presentation/constants/paths";
import { Colors } from "@/shared/presentation/constants/theme";
import {
    IconCheckCircleFilled,
    IconStopOutlined,
    IconVideoCameraFilled
} from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { ShortAction };

/**
 * Generates Ant Design table column definitions for the shorts table.
 *
 * @description
 * Builds columns for title, video URL, has full video, active status,
 * author, view count, like count, and an actions dropdown.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @param onPreviewVideo - Callback to open the réel video preview overlay
 * @returns Column configuration for the Ant Design Table
 */
export const shortsTableColumns = (
    onAction: (action: ShortAction, record: IShortVideoEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean,
    onPreviewVideo: (url: string) => void
): ColumnsType<IShortVideoEntity> => [
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
        title: "Vidéo",
        dataIndex: "videoUrl",
        key: "videoUrl",
        width: 90,
        align: "center",
        render: (videoUrl: string | null) =>
            videoUrl ? (
                <IconVideoCameraFilled
                    role="button"
                    tabIndex={0}
                    aria-label="Aperçu du réel"
                    onClick={() => onPreviewVideo(videoUrl)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onPreviewVideo(videoUrl);
                        }
                    }}
                    style={{ color: Colors.BrandPrimary, fontSize: 18, cursor: "pointer" }}
                />
            ) : (
                <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Vidéo liée",
        dataIndex: "hasFullVideo",
        key: "hasFullVideo",
        width: 110,
        align: "center",
        render: (hasFullVideo: boolean) =>
            hasFullVideo ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Actif",
        dataIndex: "isActive",
        key: "isActive",
        width: 110,
        align: "center",
        render: (isActive: boolean) => (
            <StatusTag status={isActive ? "active" : "inactive"} config={ENTITY_STATUS_CONFIG} />
        )
    },
    {
        title: "Auteur",
        dataIndex: "authorId",
        key: "authorId",
        width: 160,
        ellipsis: true,
        render: (_: string, record: IShortVideoEntity) => (
            <a href={`${ADMIN_PATH}/${record.authorId}`}>
                {record.author?.userName ?? record.authorId.slice(0, 8)}
            </a>
        )
    },
    {
        title: "Vues",
        dataIndex: "viewCount",
        key: "viewCount",
        width: 80,
        align: "center",
        sorter: (a, b) => a.viewCount - b.viewCount,
        render: (count: number) => <Text>{count}</Text>
    },
    {
        title: "Likes",
        dataIndex: "likeCount",
        key: "likeCount",
        width: 80,
        align: "center",
        sorter: (a, b) => a.likeCount - b.likeCount,
        render: (count: number) => <Text>{count}</Text>
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IShortVideoEntity) => {
            const items: ITableActionItem[] = SHORT_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: item.label,
                danger: item.danger,
                hidden: item.hidden(record, isSuperAdmin, isAdminOrSuperAdmin),
                onClick: () => onAction(item.key, record)
            }));

            return <TableActionDropdown items={items} />;
        }
    }
];
