import React, {useEffect, useState} from "react";
import {Select, Form, message, Button} from "antd";
import {useSelector} from "react-redux";
import {FormItem} from "../../../../../../../../lib";

const {Option} = Select;

interface FormItemsProps {
    group: any;
    fetch: () => void;
    close: () => void;
}

const FormItems: React.FC<FormItemsProps> = ({group, fetch, close}) => {
    const [form] = Form.useForm();
    const {app, api} = useSelector((state: any) => state);
    const {disciplines, categories} = app;
    const [loading, setLoading] = useState(false);
    const [disciplineCategories, setDisciplineCategories] = useState([]);

    useEffect(() => {
        if (group)
            setDisciplineCategories(
                categories.filter((category: any) => category.discipline_id === group.method_id)
            )
    }, [group, categories]);

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        if (group) {
            await api.user.put(`teacher/group/${group.id}`, values);
            message.success("Вы успешно изменили группу!");
        } else {
            await api.user.post(`teacher/group`, values);
            message.success("Вы успешно добавили группу!");
        }
        await fetch();
        close();
    };

    //
    const changeDiscipline = (value: number) => {
        if (categories.length) {
            let sortCategories = categories.filter((category: any) => category.discipline_id === value);
            setDisciplineCategories(sortCategories);
            //
            if (sortCategories[0])
                form.setFieldsValue({
                    category_id: sortCategories[0].id,
                });
        }
    };

    return <Form
        layout="vertical"
        form={form}
        onFinish={onFinishHandler}
        initialValues={
            group ?
                {
                    title: group.title,
                    method_id: group.method_id || undefined,
                    category_id: group.category_id || undefined,
                } : undefined
        }
    >
        <FormItem
            name="title"
            label="Название"
            requiredMsg="Введите название!"
        />
        <FormItem
            name="method_id"
            label="Метод"
            requiredMsg="Выберите дисциплину!"
        >
            <Select onChange={changeDiscipline}>
                {disciplines.map((discipline: any) =>
                    <Option key={discipline.id} value={discipline.id}>{discipline.title}</Option>)}
            </Select>
        </FormItem>
        <FormItem
            name="category_id"
            label="Категория"
            requiredMsg="Выберите категорию!"
            shouldUpdate={(prevValues, currentValues) => prevValues.method_id !== currentValues.method_id}
        >
            <Select>
                {
                    disciplineCategories
                        .map((category: any) =>
                            <Option key={category.id} value={category.id}>
                                {category.title}
                            </Option>
                        )
                }
            </Select>
        </FormItem>
        <div className="actions-block">
            <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
            <Button onClick={close}>Отмена</Button>
        </div>
    </Form>
};

export default FormItems;