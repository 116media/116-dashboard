import { Flex, Select, Typography } from "antd";
import type { FC } from "react";
import { COUNTRY_LIST } from "@/shared/infrastructure/constants/countries";
import styles from "./index.module.scss";

const { Option } = Select;
const { Text } = Typography;

/**
 * Props for the CountrySelect component.
 *
 * @interface ICountrySelectProps
 * @property {string} [value] - Currently selected country name
 * @property {string} [placeholder] - Placeholder text
 * @property {(value: string) => void} [onChange] - Callback when a country is selected
 */
interface ICountrySelectProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

/**
 * Searchable country select dropdown with flags and dial codes.
 *
 * @component
 *
 * @description
 * Renders an Ant Design Select with the full country list.
 * Each option shows the country flag, dial code, and name.
 * Supports search filtering by country name.
 */
const CountrySelect: FC<ICountrySelectProps> = ({
    value,
    placeholder = "Sélectionner un pays",
    onChange
}) => {
    return (
        <Select
            value={value}
            showSearch
            size="large"
            optionLabelProp="label"
            placeholder={placeholder}
            onChange={onChange}
        >
            {COUNTRY_LIST.map((c) => (
                <Option value={c.name} key={c.name} label={c.name}>
                    <Flex align="center" justify="space-between">
                        <Flex gap={6} align="center">
                            <img
                                src={c.flag}
                                alt={c.isoCode}
                                className={styles.countrySelect__flag}
                            />
                            <Text type="secondary">{c.dialCode}</Text>
                        </Flex>
                        <Text className={styles.countrySelect__name}>{c.name}</Text>
                    </Flex>
                </Option>
            ))}
        </Select>
    );
};

export default CountrySelect;
