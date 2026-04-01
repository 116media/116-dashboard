import { Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import { IconFilterOutlined } from "@/shared/presentation/ui/Icons";
import { TextTransform } from "@/shared/presentation/utils/text-transform/text-transform.utils";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IResourceFilterProps {
    resources: string[];
    activeResource: string | null;
    onSelect: (resource: string | null) => void;
}

/**
 * Clickable tag-based filter for permission resources.
 *
 * @component
 *
 * @description
 * Renders a row of clickable tags for filtering permissions by resource.
 * Includes a "Toutes" (all) option and one tag per unique resource.
 * Active tag is highlighted in purple.
 */
const ResourceFilter: FC<IResourceFilterProps> = ({ resources, activeResource, onSelect }) => (
    <Flex className={styles.resourceFilter}>
        <Text className={styles.resourceFilter__label}>
            <IconFilterOutlined /> Filtrer par ressource
        </Text>
        <Tag
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(null)}
            color={activeResource === null ? "purple" : "default"}
        >
            Toutes
        </Tag>

        {resources.map((resource) => (
            <Tag
                key={resource}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(resource)}
                color={activeResource === resource ? "purple" : "default"}
            >
                {TextTransform.capitalCase(resource)}
            </Tag>
        ))}
    </Flex>
);

export default ResourceFilter;
