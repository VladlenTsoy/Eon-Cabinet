import React from "react";
import {FormItem} from "../../components";
import SelectData from "../../../lib/form/select-data/SelectData";

interface FormEditorCityItemsProps {
}

const FormEditorCityItems: React.FC<FormEditorCityItemsProps> = () => {
    return <>
        <FormItem name="title"/>
        <SelectData
            url="director-franchise/languages"
            label="Язык"
            name="lang_id"
            requiredMsg="Выберите язык!"
        />
    </>
};

export default FormEditorCityItems;