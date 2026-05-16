import { Flex, Select, Typography } from "antd";
import type { FC } from "react";
import { LANGUAGE_LIST } from "@/shared/infrastructure/constants/languages";

const { Text } = Typography;

/**
 * Props for the LanguageSelect component.
 *
 * @interface ILanguageSelectProps
 * @property {string} [value] - Currently selected language code
 * @property {string} [placeholder] - Placeholder text
 * @property {(value: string) => void} [onChange] - Callback when a language is selected
 */
interface ILanguageSelectProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

/**
 * Searchable language select dropdown.
 *
 * @component
 *
 * @description
 * Renders an Ant Design Select with a list of languages.
 * Each option shows the language name on the left and native name on the right.
 * Supports search filtering by name, native name, and ISO code.
 */
const LanguageSelect: FC<ILanguageSelectProps> = ({
    value,
    placeholder = "Sélectionner une langue",
    onChange
}) => {
    const filterOption = (input: string, option?: { value?: string }) => {
        const search = input.toLowerCase();
        const lang = LANGUAGE_LIST.find((l) => l.code === option?.value);
        if (!lang) return false;

        return (
            lang.name.toLowerCase().includes(search) ||
            lang.nativeName.toLowerCase().includes(search) ||
            lang.code.toLowerCase().includes(search)
        );
    };

    return (
        <Select
            allowClear
            size="large"
            value={value}
            onChange={onChange}
            showSearch={{ filterOption }}
            optionLabelProp="label"
            placeholder={placeholder}
        >
            {LANGUAGE_LIST.map((l) => (
                <option value={l.code} key={l.code} label={l.name}>
                    <Flex align="center" justify="space-between">
                        <Text>{l.name}</Text>
                        <Text type="secondary">{l.nativeName}</Text>
                    </Flex>
                </option>
            ))}
        </Select>
    );
};

export default LanguageSelect;
