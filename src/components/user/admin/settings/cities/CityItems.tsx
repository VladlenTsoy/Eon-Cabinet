import React from "react";
import {FormItem} from "../../../../../layouts/components";
import {Select} from "antd";

const {Option} = Select;

interface CityItemsProps {
}

const CityItems: React.FC<CityItemsProps> = () => {
    return <>
        <FormItem name="title" label="Название" required="Введите название!"/>
        <FormItem name="lang_id" label="Язык" required="Выберите язык!">
            <Select>
                <Option value={1} key={1}>Русский</Option>
            </Select>
        </FormItem>
    </>
};

export default CityItems;