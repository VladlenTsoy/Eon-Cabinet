import React, {useState} from 'react';
import {Form, Input} from "antd";
import {FormItem, Button} from "lib/ui";
import {SaveOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createCustomExercises} from "../../../../../../../../../../../store/access/teacher/custom-exercises/createCustomExercises";

const {TextArea} = Input;

interface FormItemsProps {
    exercises: any[];
    setting: any;
}

const FormItems: React.FC<FormItemsProps> = ({exercises, setting}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        await dispatch(createCustomExercises({...values, setting, exercises}))
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