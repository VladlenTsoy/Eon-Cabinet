import React from 'react';
import {FormItem, SelectData} from "../../components";

const FormEditorCategoryItems: React.FC = ({}) => {
    return <>
        <FormItem name="title" label="Название" required="Введите название!"/>
        <SelectData
            url="director-franchise/disciplines"
            label="Дисциплина"
            name="discipline_id"
            required="Выберите дисциплину!"
        />
    </>
};

export default FormEditorCategoryItems;