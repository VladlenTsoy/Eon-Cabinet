import React, {useEffect} from 'react';
import {Input, Select} from "antd";
import {FormItem} from "lib/components";

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
            requiredMsg="Введите название!"
        />
        <FormItem
            name="description"
            label="Описание"
            requiredMsg="Введите описание!"
        >
            <TextArea rows={4}/>
        </FormItem>
        <FormItem
            name="access"
            label="Доступ"
            requiredMsg="Выберите доступ!"
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