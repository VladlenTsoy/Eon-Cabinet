import React, {useEffect} from 'react';
import {Input, Select} from "antd";
import {FormItem} from "layouts/components";

const {TextArea} = Input;
const {Option} = Select;

interface SaveOlympiadItemsProps {
    form: any;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const SaveOlympiadItems: React.FC<SaveOlympiadItemsProps> = ({form, setIsSaveBtn}) => {

    useEffect(() => {
        setIsSaveBtn(true);
    },[setIsSaveBtn]);

    return <>
        <FormItem
            form={form}
            name="title"
            label="Название"
            required="Введите название!"
        />
        <FormItem
            form={form}
            name="description"
            label="Описание"
            required="Введите описание!"
        >
            <TextArea rows={4}/>
        </FormItem>
        <FormItem
            form={form}
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