import React from 'react';
import List from "./list/List";
import Basic from "./basic/Basic";

interface FormBodyItemsProps {
    typeTask: string;
    mode: string;
}

const FormBodyItems: React.FC<FormBodyItemsProps> = ({typeTask, mode}) => {
    return <>
        {
            typeTask === 'basic' ?
                <Basic isMultiplication={mode !== 'plus-minus'}/> :
                <List isMultiplication={mode !== 'plus-minus'}/>
        }
    </>;
};

export default FormBodyItems;