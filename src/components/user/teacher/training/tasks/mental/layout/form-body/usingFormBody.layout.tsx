import React, {useCallback, useEffect, useState} from 'react';
import {Form} from "antd";
import Buttons from "./buttons/Buttons";
import {LoadingBlock} from "lib";

interface FormItemsProps {
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;

    userSetting?: any;
    initialValues?: any;
    onChange?: (changedFields: any, fieldsValue: any) => any[];
    settingCustomSorting?: (setting: any, setFields: any) => void;

    sound?: boolean;
    isMultiAnzan?: boolean;
    isEdit?: boolean;

    // Для Аназана
    mods?: string;
    lengths?: any;
    types?: any;
    themes?: any;
}

const usingFormBodyLayout = (FormItems: any) => {
    const FormWrapper: React.FC<FormItemsProps> = (
        {
            userSetting,
            settingCustomSorting,
            onChange,
            initialValues = {},
            addSettingHomework,
            clearSaveSetting,
            startApplication,
            isEdit,
            ...props
        }
    ) => {
        const [fields, setFields] = useState<any[]>([]);
        const [form] = Form.useForm();
        const [loading, setLoading] = useState(false);

        const settingBasicSorting = useCallback((_setting: any) => {
            let _fields = Object.keys(_setting).map((key: string) => ({name: [key], value: _setting[key]}));
            setFields(_fields);
        }, []);

        useEffect(() => {
            try {
                if (userSetting) {
                    settingCustomSorting ?
                        settingCustomSorting(userSetting, setFields) :
                        settingBasicSorting(userSetting);
                }
            } catch (e) {
                console.log(e);
            }
        }, [userSetting, settingBasicSorting, settingCustomSorting]);

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

        return fields.length ?
            <Form
                form={form}
                initialValues={initialValues}
                fields={fields}
                layout='vertical'
                onFinish={onFinish}
                onFieldsChange={fieldsChange}
            >
                <FormItems
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
            </Form> :
            <LoadingBlock/>
    };
    return FormWrapper;
};

export default usingFormBodyLayout;