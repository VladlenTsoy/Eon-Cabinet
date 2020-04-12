import React, {useEffect} from 'react';
import {Input, Select} from "antd";
import {FormItem} from "layouts/components";

const {TextArea} = Input;
const {Option} = Select;

interface SaveOlympiadItemsProps {
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const SaveOlympiadItems: React.FC<SaveOlympiadItemsProps> = ({setIsSaveBtn}) => {

    useEffect(() => {
        setIsSaveBtn(true);
    },[setIsSaveBtn]);

    return <>
        <FormItem
            name="title"
            label="Название"
            required="Введите название!"
        />
        <FormItem
            name="description"
            label="Описание"
            required="Введите описание!"
        >
            <TextArea rows={4}/>
        </FormItem>
        <FormItem
            name="access"
            label="Доступ"
            required="Выберите доступ!"
        >
            <Select>
                <Option value="public">Публичный</Option>
                <Option value="invite">По запросам</Option>
                <Option value="private">Закрытый</Option>
            </Select>
        </FormItem>
    </>;
};

export default SaveOlympiadItems;