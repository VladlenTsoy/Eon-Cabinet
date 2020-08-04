import React, {useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {FormItem} from "../../../../../../../../../../../lib/components";
import {SaveOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useAppContext} from "../../../../../../../../../../../store/context/use-app-context";

const {TextArea} = Input;

interface FormItemsProps {
    exercises: any[];
    setting: any;
}

const FormItems: React.FC<FormItemsProps> = ({exercises, setting}) => {
    const history = useHistory();
    const {api} = useAppContext();
    const [loading, setLoading] = useState(false);

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        await api.user.post('/teacher/custom-exercises', {...values, setting, exercises});
        message.success(`Вы успешно создали примеры!`);
        history.push('/settings/custom-exercises');
    };

    return <Form layout="vertical" onFinish={onFinishHandler}>
        <FormItem name="title" label="Название" requiredMsg="Введите название!"/>
        <FormItem name="description" label="Описание" requiredMsg="Введите описание!">
            <TextArea/>
        </FormItem>
        <Button htmlType="submit" block type="primary" loading={loading} icon={<SaveOutlined/>}>Сохранить</Button>
    </Form>;
};

export default FormItems;