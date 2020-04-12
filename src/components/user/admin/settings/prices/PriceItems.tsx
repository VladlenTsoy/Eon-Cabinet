import React from "react";
import {FormItem} from "../../../../../layouts/components";

interface PriceItemsProps {
}

const PriceItems: React.FC<PriceItemsProps> = () => {
    return <>
        <FormItem name="title" label="Название" required="Введите название!"/>
        <FormItem name="student" label="Студент" required="Введите стоимость студента!"/>
        <FormItem name="teacher" label="Учитель" required="Введите стоимость учителя!"/>
    </>
};

export default PriceItems;