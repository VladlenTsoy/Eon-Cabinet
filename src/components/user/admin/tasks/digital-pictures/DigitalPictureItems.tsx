import React from "react";
import {FormItem, Upload} from "../../../../../layouts/components";

interface PersonalityItemsProps {
    form: any;
}

const DigitalPictureItems: React.FC<PersonalityItemsProps> = ({form}) => {
    return <>
        <FormItem
            name="number"
            label="Цифра"
            required="Введите цифру!"/>
        <Upload
            form={form}
            name="picture"
            label="Картинка"
            required="Выберите картинку!"/>
    </>
};

export default DigitalPictureItems;