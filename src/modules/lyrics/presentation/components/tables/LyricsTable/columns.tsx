import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import {
    LYRICS_DROPDOWN_ITEMS,
    type LyricsAction
} from "@/modules/lyrics/presentation/constants/lyrics.dropdown";
import { getLanguageName } from "@/shared/infrastructure/constants/languages";
import { ADMIN_PATH } from "@/shared/presentation/constants/paths";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconStopOutlined } from "@/shared/presentation/ui/Icons";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { LyricsAction };

/**
 * Generates Ant Design table column definitions for the lyrics table.
 *
 * @description
 * Builds columns for song title, artist name, language, author, linked
 * content (video), and an actions dropdown. The dropdown items are
 * filtered based on the current user's role.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const lyricsTableColumns = (
    onAction: (action: LyricsAction, record: ILyricsEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<ILyricsEntity> => [
    {
        title: "Titre",
        dataIndex: "songTitle",
        key: "songTitle",
        width: 220,
        ellipsis: true,
        sorter: (a, b) => a.songTitle.localeCompare(b.songTitle),
        render: (title: string) => (
            <Text strong ellipsis>
                {title}
            </Text>
        )
    },
    {
        title: "Artiste",
        dataIndex: "artistName",
        key: "artistName",
        width: 180,
        ellipsis: true,
        sorter: (a, b) => a.artistName.localeCompare(b.artistName),
        render: (name: string) => <Text>{name}</Text>
    },
    {
        title: "Langue",
        dataIndex: "language",
        key: "language",
        width: 140,
        render: (lang: string) => <Text>{getLanguageName(lang)}</Text>
    },
    {
        title: "Auteur",
        dataIndex: "authorId",
        key: "authorId",
        width: 160,
        ellipsis: true,
        render: (_: string, record: ILyricsEntity) => (
            <a href={`${ADMIN_PATH}/${record.authorId}`}>
                {record.author?.userName ?? record.authorId.slice(0, 8)}
            </a>
        )
    },
    {
        title: "Lié à",
        key: "linkedTo",
        width: 160,
        render: (_: unknown, record: ILyricsEntity) => {
            if (record.videoId) return <Text type="secondary">Video</Text>;
            return <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />;
        }
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: ILyricsEntity) => {
            const items: ITableActionItem[] = LYRICS_DROPDOWN_ITEMS.map((item) => ({
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
