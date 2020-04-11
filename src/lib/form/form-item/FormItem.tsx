import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from "antd";

interface FormItemProps {
    form: any;
    name: string;
    size?: 'small' | 'middle' | 'large';
    label?: string;
    autofocus?: boolean;
    required?: string;
    rules?: any;
    valuePropName?: string;
    getValueFromEvent?: any;
    initialValue?: any;
    placeholder?: any;
    marginBottom?: string;
}

const FormItem: React.FC<FormItemProps> = (
    {
        form,
        label,
        size ,
        name,
        children,
        rules,
        required,
        autofocus = false,
        getValueFromEvent,
        placeholder,
        initialValue,
        marginBottom,
        valuePropName = 'value',
    }
) => {
    const {getFieldDecorator} = form;
    return <Form.Item
        label={label}
        style={marginBottom ? {marginBottom: marginBottom} : {}}
    >
        {getFieldDecorator(name, {
            initialValue: initialValue,
            valuePropName: valuePropName,
            rules: rules || (required ? [{required: true, message: required}] : null),
            getValueFromEvent: getValueFromEvent
        })(
            children ||
            <Input
                placeholder={placeholder}
                size={size}
                autoFocus={autofocus}
            />
        )}
    </Form.Item>;
};

export default FormItem;