import React, {useMemo, useState} from "react";
import { SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message } from "antd";
import {useSelector} from "react-redux";
import {FormItem} from "../../../../../layouts/components";

const FormulTitleSettingAnzan: React.FC<any> = ({form, defaultTypes}) => {
    const {language} = useSelector((state: any) => state);
    const [btnLoading, setBtnLoading] = useState(false);
    const types = Object.entries(language.common.typeNames[0]);

    useMemo(() => {
        let formuls: any = {};
        types.map((type: any) =>
            formuls[type[0]] = type[1]
        );
        form.setFieldsValue(formuls);
    }, [form, types]);

    // useEffect(() => {
    //     let formuls: any = {};
    //     types.map((type: any) =>
    //         formuls[type[0]] = type[1]
    //     );
    //     form.setFieldsValue(formuls);
    // }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any) => {
            if (!err) {
                setBtnLoading(true);
                try {
                    message.success('Вы успешно изменили название формул!');
                } catch (e) {
                    message.error(e.response.data.message);
                }
                setBtnLoading(false);
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {defaultTypes.map((type: any, key: any) =>
                <FormItem
                    form={form}
                    name={type[0]}
                    label={type[1]}
                    key={key}
                    required={`Введите название формулы (${type[1]})`}>
                    <Input/>
                </FormItem>
            )}
            <Button
                htmlType="submit"
                type="primary"
                block
                icon={<SaveOutlined />}
                loading={btnLoading}
            >
                Сохранить
            </Button>
        </Form>
    );
};

export default Form.create<any>()(FormulTitleSettingAnzan);