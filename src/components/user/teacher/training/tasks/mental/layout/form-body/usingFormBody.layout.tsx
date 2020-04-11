import React, {useState} from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { EditOutlined, FlagOutlined, PlusOutlined, PrinterOutlined, UndoOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from "antd";
import styled from "styled-components";

const ButtonGroupWrapper = styled(Button.Group)`
  width: 100%;
  text-align: center;
`;

interface FormItemsProps {
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    setting: any;
    onChange: (changedFields: any, fieldsValue: any) => void;

    sound?: boolean;
    lengths?: any;
    types?: any;
    themes?: any;
    isMultiAnzan?: boolean;
    mods?: string;
    isEdit?: boolean;
}

const usingFormBodyLayout = (FormItems: any) => {
    const FormWrapper: React.FC<FormItemsProps & FormComponentProps> = (
        {
            form,
            addSettingHomework,
            clearSaveSetting,
            startApplication,
            isEdit,
            ...props
        }
    ) => {
        const [loading, setLoading] = useState(false);

        /***
         * Начать упражнения
         *
         * @param e
         */
        const handleSubmit = (e: any) => {
            e.preventDefault();
            let values = form.getFieldsValue();
            form.validateFields(async (err: any, /*values: any*/) => {
                if (!err) {
                    setLoading(true);
                    try {
                        if (addSettingHomework)
                            await addSettingHomework(values);
                        else if (startApplication)
                            await startApplication(values, false);
                    } catch (e) {
                        setLoading(false);
                    }
                }
            });
        };

        /***
         * Печать листов
         *
         * @param e
         */
        const handlerPrintList = (e: any) => {
            e.preventDefault();
            let values = form.getFieldsValue();
            form.validateFields(async (err: any, /*values: any*/) => {
                if (!err) {
                    setLoading(true);
                    if (startApplication)
                        await startApplication(values, true);
                    setLoading(false);
                }
            });
        };

        /***
         * Очистка настроек
         *
         * @param e
         */
        const clearSetting = (e: any) => {
            e.preventDefault();
            form.resetFields();
            if (clearSaveSetting)
                clearSaveSetting();
        };

        return (
            <Form onSubmit={handleSubmit}>
                <FormItems
                    form={form}
                    loading={loading}
                    {...props}
                />
                <ButtonGroupWrapper size="large">
                    {addSettingHomework ?
                        isEdit ?
                            <Button htmlType="submit" type="primary" icon={<EditOutlined />}>Изменить</Button> :
                            <Button htmlType="submit" type="primary" icon={<PlusOutlined />}>Добавить</Button> :
                        <>
                            <Button icon={<UndoOutlined />} onClick={clearSetting}>Очистить</Button>
                            {form.getFieldValue('anzan') === 'list' ?
                                <Button
                                    icon={<PrinterOutlined />}
                                    type="primary"
                                    onClick={handlerPrintList}
                                    loading={loading}>
                                    Распечатать
                                </Button> : null
                            }
                            <Button
                                htmlType="submit"
                                type="primary"
                                icon={<FlagOutlined />}
                                loading={loading}
                            >
                                Начать
                            </Button>
                        </>
                    }
                </ButtonGroupWrapper>
            </Form>
        );
    };

    return Form.create<FormItemsProps & FormComponentProps>({
        /***
         * Задать настройки пользователя
         *
         * @param setting
         */
        mapPropsToFields({setting}) {
            let a: any = {};
            for (let key in setting)
                a[key] = Form.createFormField({
                    ...setting[key],
                    value: setting[key].value
                });
            return a;
        },

        /***
         * При изменения полей
         *
         * @param props
         * @param changedFields
         * @param fieldsValue
         */
        onFieldsChange(props, changedFields, fieldsValue) {
            props.onChange(changedFields, fieldsValue);
        }
    })(FormWrapper);
};

export default usingFormBodyLayout;