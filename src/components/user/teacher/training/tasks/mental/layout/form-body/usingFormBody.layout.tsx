import React, {useState} from 'react';
import {Form} from "antd";
import Buttons from "./buttons/Buttons";

interface FormItemsProps {
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;

    userSetting?: any;
    initialValues?: any;
    onChange?: (changedFields: any, fieldsValue: any) => any[];

    sound?: boolean;
    isMultiAnzan?: boolean;
    isEdit?: boolean;

    // Для Мульти-Анзана
    mods?: string;
    updateInitFields?: () => any[];

    //
    categories?: string[];
    typeTasks?: string[];
    modes?: string[];
    titles?: any[];
}

const usingFormBodyLayout = (FormItems: any) => {
    const FormWrapper: React.FC<FormItemsProps> = (
        {
            userSetting,
            onChange,
            initialValues = {},
            addSettingHomework,
            clearSaveSetting,
            startApplication,
            updateInitFields,
            isEdit,
            children,
            ...props
        }
    ) => {
        const [fields, setFields] = useState<any[]>([]);
        const [form] = Form.useForm();

        const fieldsChange = (changedFields: any[], allFields: any[]) => {
            if (changedFields.length)
                setFields(onChange ? onChange(changedFields, allFields) : allFields);
        };

        return <Form
            form={form}
            initialValues={initialValues}
            fields={fields}
            layout='vertical'
            onFieldsChange={fieldsChange}
        >
            <FormItems
                form={form}
                fields={fields}
                {...props}
            >
                {children}
            </FormItems>
            <Buttons
                form={form}
                addSettingHomework={addSettingHomework}
                startApplication={startApplication}
                clearSaveSetting={clearSaveSetting}
                isEdit={isEdit}
            />
        </Form>
    };
    return FormWrapper;
};

export default usingFormBodyLayout;