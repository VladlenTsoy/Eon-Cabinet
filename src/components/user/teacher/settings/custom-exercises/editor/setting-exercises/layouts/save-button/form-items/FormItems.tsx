import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Form, Input, message, Select} from "antd";
import {FormItem} from "../../../../../../../../../../layouts/components";
import {SaveOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const {TextArea} = Input;
const {Option} = Select;

interface FormItemsProps {
    exercises: any[];
    setting: any;
}

const FormItems: React.FC<FormItemsProps> = ({exercises, setting}) => {
    const history = useHistory();
    const {app, api} = useSelector((state: any) => state);
    const {categories} = app;
    const [loading, setLoading] = useState(false);

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        await api.user_general.post('/teacher/custom-exercises', {...values, setting, exercises});
        message.success(`Вы успешно создали примеры!`);
        history.push('/settings/custom-exercises');
    };

    return <Form layout="vertical" onFinish={onFinishHandler}>
        <FormItem name="title" label="Название" requiredMsg="Введите название!"/>
        <FormItem
            name="category_id"
            label="Категория"
            requiredMsg="Выберите категорию!"
            shouldUpdate={(prevValues, currentValues) => prevValues.method_id !== currentValues.method_id}
        >
            <Select>
                {
                    categories.filter((category: any) => category.discipline_id === 1)
                        .map((category: any) =>
                            <Option key={category.id} value={category.id}>
                                {category.title}
                            </Option>
                        )
                }
            </Select>
        </FormItem>
        <FormItem name="description" label="Описание" requiredMsg="Введите описание!">
            <TextArea/>
        </FormItem>
        <Button htmlType="submit" block type="primary" loading={loading} icon={<SaveOutlined/>}>Сохранить</Button>
    </Form>;
};

export default FormItems;