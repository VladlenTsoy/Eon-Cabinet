import React, {useCallback, useState} from 'react';
import {Form} from "antd";
import Buttons from "../form-body/buttons/Buttons";
import {Spin} from "../../../../../../../../layouts/components";

interface FormSettingProps {
    isEdit?: boolean;
    initialValues: any;
    userSetting: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const FormSettingLayout: React.FC<FormSettingProps> = (
    {
        initialValues,
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
        children,
        isEdit = false,
    }
) => {
    const [loading, setLoading] = useState(false);
    const [initValues, setInitValues] = useState({...initialValues, ...userSetting});
    const [form] = Form.useForm();

    const clearFormSetting = useCallback(async () => {
        setLoading(true);
        await setInitValues(initialValues);
        await clearSaveSetting();
        form.resetFields();
        setLoading(false);
    }, [form, clearSaveSetting, initialValues]);

    return <Spin tip="Загрузка..." spinning={loading}>
        <Form
            form={form}
            initialValues={initValues}
            layout="vertical"
        >
            {children}
            <Buttons
                form={form}
                isEdit={isEdit}
                clearSaveSetting={clearFormSetting}
                startApplication={startApplication}
                addSettingHomework={addSettingHomework}
            />
        </Form>
    </Spin>;
};

export default FormSettingLayout;