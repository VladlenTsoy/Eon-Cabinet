import React from "react";
import {FormItem} from "../../components";
import SelectData from "../../components/form/select-data/SelectData";

interface FormEditorCityItemsProps {
    form: any;
}

const FormEditorCityItems: React.FC<FormEditorCityItemsProps> = ({form}) => {
    return <>
        <FormItem form={form} name="title"/>
        <SelectData
            form={form}
            url="director-franchise/languages"
            label="Язык"
            name="lang_id"
            required="Выберите язык!"
        />
    </>
};

export default FormEditorCityItems;