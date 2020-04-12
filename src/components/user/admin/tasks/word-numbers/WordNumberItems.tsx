import React from "react";
import {FormItem} from "../../../../../layouts/components";

interface WordNumberItemsProps {
}

const WordNumberItems: React.FC<WordNumberItemsProps> = () => {
    return <>
        <FormItem name="number" label="Цифра" required="Введите цифру!"/>
        <FormItem name="word" label="Слово" required="Введите слово!"/>
    </>
};

export default WordNumberItems;