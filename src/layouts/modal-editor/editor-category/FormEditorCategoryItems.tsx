import React from 'react';
import {FormItem, SelectData} from "../../components";

const FormEditorCategoryItems: React.FC = () => {
    return <>
        <FormItem name="title" label="Название" requiredMsg="Введите название!"/>
        <SelectData
            url="director-franchise/disciplines"
            label="Дисциплина"
            name="discipline_id"
            requiredMsg="Выберите дисциплину!"
        />
    </>
};

export default FormEditorCategoryItems;