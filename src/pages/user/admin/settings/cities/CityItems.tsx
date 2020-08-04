import React from "react";
import {FormItem} from "../../../../../lib/components";
import {Select} from "antd";

const {Option} = Select;

interface CityItemsProps {
}

const CityItems: React.FC<CityItemsProps> = () => {
    return <>
        <FormItem name="title" label="Название" requiredMsg="Введите название!"/>
        <FormItem name="lang_id" label="Язык" requiredMsg="Выберите язык!">
            <Select>
                <Option value={1} key={1}>Русский</Option>
            </Select>
        </FormItem>
    </>
};

export default CityItems;