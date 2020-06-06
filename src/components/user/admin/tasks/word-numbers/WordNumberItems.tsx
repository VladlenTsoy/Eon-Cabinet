import React from "react";
import {FormItem} from "../../../../../lib";

interface WordNumberItemsProps {
}

const WordNumberItems: React.FC<WordNumberItemsProps> = () => {
    return <>
        <FormItem name="number" label="Цифра" requiredMsg="Введите цифру!"/>
        <FormItem name="word" label="Слово" requiredMsg="Введите слово!"/>
    </>
};

export default WordNumberItems;