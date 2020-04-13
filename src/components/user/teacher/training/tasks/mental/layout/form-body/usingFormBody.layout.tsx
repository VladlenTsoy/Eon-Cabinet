import React, {useState} from 'react';
import {Form} from "antd";
import Buttons from "./buttons/Buttons";

interface FormItemsProps {
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    setting?: any;
    fields?: any;
    onChange: (changedFields: any, fieldsValue: any) => void;

    initialValues?: any;

    sound?: boolean;
    lengths?: any;
    types?: any;
    themes?: any;
    isMultiAnzan?: boolean;
    mods?: string;
    isEdit?: boolean;
}

const usingFormBodyLayout = (FormItems: any) => {
    const FormWrapper: React.FC<FormItemsProps> = (
        {
            onChange,
            initialValues = {},
            addSettingHomework,
            clearSaveSetting,
            startApplication,
            isEdit,
            fields,
            ...props
        }
    ) => {
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

        const fieldsChange = (changedFields: any, allFields: any) => {
            onChange(changedFields, allFields);
        };

        return (
            <Form
                form={form}
                initialValues={initialValues}
                fields={fields}
                layout='vertical'
                onFinish={onFinish}
                onFieldsChange={fieldsChange}
            >
                <FormItems
                    form={form}
                    loading={loading}
                    {...props}
                />
                <Buttons
                    form={form}
                    setLoading={setLoading}
                    loading={loading}
                    addSettingHomework={addSettingHomework}
                    startApplication={startApplication}
                    clearSaveSetting={clearSaveSetting}
                    isEdit={isEdit}
                />
            </Form>
        );
    };
    return FormWrapper;
};

export default usingFormBodyLayout;