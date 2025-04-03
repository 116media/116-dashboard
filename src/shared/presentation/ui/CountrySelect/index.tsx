import { Flex, Select, Typography } from "antd";
import type { FC } from "react";
import { COUNTRY_LIST } from "@/shared/infrastructure/constants/countries";
import styles from "./index.module.scss";

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
 * Supports search filtering by country name, dial code, and ISO code.
 */
const CountrySelect: FC<ICountrySelectProps> = ({
    value,
    placeholder = "Sélectionner un pays",
    onChange
}) => {
    const filterOption = (input: string, option?: { value?: string }) => {
        const search = input.toLowerCase();
        const country = COUNTRY_LIST.find((c) => c.name === option?.value);
        if (!country) return false;

        return (
            country.name.toLowerCase().includes(search) ||
            country.dialCode.includes(search) ||
            country.isoCode.toLowerCase().includes(search)
        );
    };

    return (
        <Select
            size="large"
            value={value}
            onChange={onChange}
            showSearch={{
                filterOption
            }}
            optionLabelProp="label"
            placeholder={placeholder}
        >
            {COUNTRY_LIST.map((c) => (
                <option value={c.name} key={c.name} label={c.name}>
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
                </option>
            ))}
        </Select>
    );
};

export default CountrySelect;
