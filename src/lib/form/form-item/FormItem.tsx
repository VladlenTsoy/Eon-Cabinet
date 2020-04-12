import React from "react";
import {Form} from 'antd';
import {Input} from "antd";

interface FormItemProps {
    name: string;
    size?: 'small' | 'middle' | 'large';
    label?: string;
    autofocus?: boolean;
    required?: string;
    rules?: any;
    valuePropName?: string;
    getValueFromEvent?: any;
    placeholder?: any;
    marginBottom?: string;
}

const FormItem: React.FC<FormItemProps> = (
    {
        label,
        size,
        name,
        children,
        rules,
        required,
        autofocus = false,
        getValueFromEvent,
        placeholder,
        marginBottom,
        valuePropName = 'value',
    }
) => {
    return <Form.Item
        label={label}
        name={name}
        style={marginBottom ? {marginBottom: marginBottom} : {}}
        valuePropName={valuePropName}
        rules={rules || (required ? [{required: true, message: required}] : null)}
        getValueFromEvent={getValueFromEvent}
    >
        {
            children ||
            <Input
                placeholder={placeholder}
                size={size}
                autoFocus={autofocus}
            />
        }
    </Form.Item>;
};

export default FormItem;