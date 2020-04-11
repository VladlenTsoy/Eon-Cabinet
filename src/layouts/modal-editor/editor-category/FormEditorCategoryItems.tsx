import React from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {FormItem, SelectData} from "../../components";

const FormEditorCategoryItems: React.FC<FormComponentProps> = ({form}) => {
    return <>
        <FormItem form={form} name="title" label="Название" required="Введите название!"/>
        <SelectData
            form={form}
            url="director-franchise/disciplines"
            label="Дисциплина"
            name="discipline_id"
            required="Выберите дисциплину!"
        />
    </>
};

export default Form.create<FormComponentProps>()(FormEditorCategoryItems);