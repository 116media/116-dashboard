import { Form, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { useAppSelector } from "@/shared/presentation/store/store";

const { Item } = Form;

/**
 * Props for the VideoTagsForm component.
 *
 * @interface IVideoTagsFormProps
 * @property {string[]} tagNames - Currently selected tag display names
 * @property {(names: string[]) => void} onTagsChange - Callback when the tag selection changes
 */
interface IVideoTagsFormProps {
    tagNames: string[];
    onTagsChange: (names: string[]) => void;
}

/**
 * Tag selection and creation form for associating tags with a video.
 *
 * @component
 *
 * @description
 * Renders a tag input with autocomplete from existing tags.
 * Existing tags are suggested as the user types. Typing a name
 * that does not exist and pressing Enter creates it inline —
 * the backend upserts by slug on submit.
 *
 * @param {IVideoTagsFormProps} props - Component props
 * @returns {JSX.Element} The rendered tag input
 */
const VideoTagsForm: FC<IVideoTagsFormProps> = ({ tagNames, onTagsChange }) => {
    const { data: tags } = useAppSelector(({ lookup: { getTags } }) => getTags);

    const tagOptions = useMemo(
        () =>
            ((tags as ITagEntity[]) ?? []).map((tag) => ({
                label: tag.name,
                value: tag.name
            })),
        [tags]
    );

    return (
        <Form layout="vertical" size="large">
            <Item label="Tags">
                <Select
                    mode="tags"
                    size="large"
                    value={tagNames}
                    options={tagOptions}
                    onChange={onTagsChange}
                    placeholder="Sélectionner ou créer des tags"
                />
            </Item>
        </Form>
    );
};

export default VideoTagsForm;
