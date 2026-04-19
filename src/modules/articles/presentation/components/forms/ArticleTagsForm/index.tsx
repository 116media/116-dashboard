import { Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { useAppSelector } from "@/shared/presentation/store/store";

/**
 * Props for the ArticleTagsForm component.
 *
 * @interface IArticleTagsFormProps
 * @property {string[]} tagIds - Currently selected tag identifiers
 * @property {(ids: string[]) => void} onTagsChange - Callback when the tag selection changes
 */
interface IArticleTagsFormProps {
    tagIds: string[];
    onTagsChange: (ids: string[]) => void;
}

/**
 * Tag selection form for associating tags with an article.
 *
 * @component
 *
 * @description
 * Renders a multi-select dropdown populated with tags from the
 * lookup store. Supports search filtering by tag name.
 *
 * @param {IArticleTagsFormProps} props - Component props
 * @returns {JSX.Element} The rendered tag selection form
 */
const ArticleTagsForm: FC<IArticleTagsFormProps> = ({ tagIds, onTagsChange }) => {
    const { data: tags } = useAppSelector(({ lookup: { getTags } }) => getTags);

    const tagOptions = useMemo(
        () =>
            ((tags as ITagEntity[]) ?? []).map((tag) => ({
                label: tag.name,
                value: tag.id
            })),
        [tags]
    );

    return (
        <Select
            mode="multiple"
            size="large"
            showSearch
            options={tagOptions}
            value={tagIds}
            onChange={onTagsChange}
            placeholder="Sélectionner des tags"
            style={{ width: "100%" }}
        />
    );
};

export default ArticleTagsForm;
