import React from "react";
import {Input, Select} from "antd";
import {FormItem} from "../../../../../layouts/components";
import {useSelector} from "react-redux";

const {TextArea} = Input;
const {Option} = Select;

interface PersonalityItemsProps {
}

const WordItems: React.FC<PersonalityItemsProps> = () => {
    const {language} = useSelector((state: any) => (state));
    const types = language.common.tasksTraining.wordsList.mode;
    const levels = language.common.tasksTraining.wordsList.type;

    return <>
        <FormItem name="word" label="Слово" required="Введите слово!"/>
        <FormItem name="type" label="Тип" required="Выберите тип!">
            <Select>
                {types.map((type: any, key: number) =>
                    <Option value={key} key={key}>{type}</Option>
                )}
            </Select>
        </FormItem>
        <FormItem name="level" label="Уровень" required="Выберите уровень!">
            <Select>
                {levels.map((level: any, key: number) =>
                    <Option value={key} key={key}>{level}</Option>
                )}
            </Select>
        </FormItem>
        <FormItem name="description" label="Описание">
            <TextArea rows={6}/>
        </FormItem>
        <FormItem name="lang_id" label="Язык" required="Выберите язык!">
            <Select>
                <Option value={1} key={1}>Русский</Option>
                <Option value={2} key={2}>Узбекский</Option>
                <Option value={3} key={3}>O'zbek</Option>
            </Select>
        </FormItem>
    </>
};

export default WordItems;