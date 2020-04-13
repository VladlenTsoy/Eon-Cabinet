import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from "antd";
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import HeaderSettingAnzan
    from "../../../../../training/tasks/mental/anzan/anzan-form-body/header-setting-anzan/HeaderSettingAnzan";

type EditorProps = FormComponentProps & {
    setting: any;
    onChange: (changedFields: any, fieldsValue: any) => void;
    settingSave: (setting: any) => void;
    lengths: any;
    types: any;
    themes: any;
} ;

const EditorForm: React.FC<EditorProps> = ({form, setting, lengths, themes, types, settingSave}) => {
    const isMultiplication = form.getFieldValue('mode') === 'divide' || form.getFieldValue('mode') === 'multiply';

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
                settingSave(values);
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <HeaderSettingAnzan
                forceDefaultAlgorithms
                typeAnzan={form.getFieldValue('anzan')}
                isMultiplication={isMultiplication}
                setting={setting}
                lengths={lengths}
                types={types}
                themes={themes}
            />
            <Button icon={<ArrowRightOutlined />} type="primary" htmlType="submit" size="large" block shape="round">Далее</Button>
        </Form>
    );
};

export default Form.create<EditorProps>({
    /***
     * Задать настройки пользователя
     *
     * @param setting
     */
    mapPropsToFields({setting}) {
        let a: any = {};
        for (let key in setting)
            if (setting.hasOwnProperty(key))
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
})(EditorForm);