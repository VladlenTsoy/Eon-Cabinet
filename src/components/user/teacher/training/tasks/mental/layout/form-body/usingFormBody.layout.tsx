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

    // Для Аназана
    lengths?: any;
    types?: any;
    themes?: any;
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
            ...props
        }
    ) => {
        const [fields, setFields] = useState<any[]>([]);
        const [form] = Form.useForm();
        const [loading, setLoading] = useState(false);

        /***
         * Начать упражнения
         *
         * @param values
         */
        const onFinish = async (values: any) => {
            setLoading(true);
            try {
                if (addSettingHomework)
                    await addSettingHomework(values);
                else if (startApplication)
                    await startApplication(values, false);
            } catch (e) {
                setLoading(false);
            }
        };

        const fieldsChange = (changedFields: any[], allFields: any[]) => {
            if (changedFields.length)
                setFields(onChange ? onChange(changedFields, allFields) : allFields);
        };

        return <Form
            form={form}
            // userSetting DELETE
            initialValues={initialValues}
            fields={fields}
            layout='vertical'
            onFinish={onFinish}
            onFieldsChange={fieldsChange}
        >
            <FormItems
                form={form}
                fields={fields}
                loading={loading}
                {...props}
            />
            <Buttons
                fields={fields}
                form={form}
                setLoading={setLoading}
                loading={loading}
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