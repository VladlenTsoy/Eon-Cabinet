import React from "react";
import {Form} from 'antd';
import {FormItemProps} from 'antd/es/form';
import {Input} from "antd";

type Diff<T extends keyof any, U extends keyof any> =
    ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

interface ItemProps {
    size?: 'small' | 'middle' | 'large';
    tabIndex?: number;
    autofocus?: boolean;
    placeholder?: any;
    marginBottom?: string;
    requiredMsg?: string;
    children?: any;
}

const FormItem: React.FC<Overwrite<FormItemProps, ItemProps>> = (
    {
        size,
        placeholder,
        tabIndex,
        autofocus = false,
        //
        requiredMsg,
        marginBottom,
        rules,
        //
        children,
        ...props
    }
) => {
    return <Form.Item
        style={marginBottom ? {marginBottom: marginBottom} : {}}
        rules={rules || (requiredMsg ? [{required: true, message: requiredMsg}] : undefined)}
        {...props}
    >
        {
            children ||
            <Input
                tabIndex={tabIndex}
                placeholder={placeholder}
                size={size}
                autoFocus={autofocus}
            />
        }
    </Form.Item>;
};

export default FormItem;