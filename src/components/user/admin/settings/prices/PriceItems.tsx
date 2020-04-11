import React from "react";
import {FormItem} from "../../../../../layouts/components";

interface PriceItemsProps {
    form: any;
}

const PriceItems: React.FC<PriceItemsProps> = ({form}) => {
    return <>
        <FormItem form={form} name="title" label="Название" required="Введите название!"/>
        <FormItem form={form} name="student" label="Студент" required="Введите стоимость студента!"/>
        <FormItem form={form} name="teacher" label="Учитель" required="Введите стоимость учителя!"/>
    </>
};

export default PriceItems;