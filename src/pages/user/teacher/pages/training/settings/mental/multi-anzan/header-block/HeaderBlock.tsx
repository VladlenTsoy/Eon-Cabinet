import React, {useState} from 'react';
import styled from "styled-components";
import {Form} from "antd";
import {FormProps} from "antd/es/form";
import HeaderRadio from "./header-radio/HeaderRadio";
import HeaderAction from "./header-actions/HeaderAction";

const HeaderBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
  
  .ant-form-item{
    margin-bottom: 0;
  }
`;

const FormWrapper: React.FC<FormProps> = styled(Form)`
  &.ant-form{
    display: flex;
    align-items: center;
    margin-right: auto;
  }
`;

interface HeaderBlockProps {
    fields: any;
    initialValues: any;
    isDisabledMode: boolean;
    isMaxStudent?: boolean;
    onChange: (changedFields: any[], allFields: any[]) => void;
    addExercise: (setting: any) => void;
    handlerStart: (setting: any) => void;
    clearExercise: () => void;
}

const HeaderBlock: React.FC<HeaderBlockProps> = (
    {
        initialValues,
        fields,
        isDisabledMode,
        isMaxStudent,
        addExercise,
        onChange,
        handlerStart,
        clearExercise,
    }
) => {
    const [mode, setMode] = useState(initialValues?.mode || 'addition');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    /**
     * Отправка настроек для начала упражнения
     */
    const handlerSubmit = async (values: any) => {
        setLoading(true);
        try {
            await handlerStart(values);
        } catch (e) {
            setLoading(false);
        }
    };

    const onChangeForm = (changedValues: any) => {
        if (changedValues.mode)
            setMode(changedValues.mode);
    }

    const handlerClear = () => {
        form.resetFields();
        clearExercise();
    };

    return (
        <HeaderBlockWrapper>
            <FormWrapper
                form={form}
                fields={fields}
                onFieldsChange={onChange}
                id="multi-from"
                onValuesChange={onChangeForm}
                onFinish={handlerSubmit}
                initialValues={initialValues || {
                    mode: 'addition',
                    group: false
                }}
            >
                <HeaderRadio
                    mode={mode}
                    isDisabledMode={isDisabledMode}
                />
            </FormWrapper>
            <HeaderAction
                loading={loading}
                isMaxStudent={isMaxStudent}
                handlerClear={handlerClear}
                mode={mode}
                addExercise={addExercise}
            />
        </HeaderBlockWrapper>
    );
};

export default HeaderBlock;