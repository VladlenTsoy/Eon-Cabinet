import React from "react";
import {FormItem} from "../../../../../layouts/components";

interface WordNumberItemsProps {
    form: any;
}

const WordNumberItems: React.FC<WordNumberItemsProps> = ({form}) => {
    return <>
        <FormItem form={form} name="number" label="Цифра" required="Введите цифру!"/>
        <FormItem form={form} name="word" label="Слово" required="Введите слово!"/>
    </>
};

export default WordNumberItems;