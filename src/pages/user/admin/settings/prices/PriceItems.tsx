import React from "react";
import {FormItem} from "../../../../../lib/components";

interface PriceItemsProps {
}

const PriceItems: React.FC<PriceItemsProps> = () => {
    return <>
        <FormItem name="title" label="Название" requiredMsg="Введите название!"/>
        <FormItem name="student" label="Студент" requiredMsg="Введите стоимость студента!"/>
        <FormItem name="teacher" label="Учитель" requiredMsg="Введите стоимость учителя!"/>
    </>
};

export default PriceItems;