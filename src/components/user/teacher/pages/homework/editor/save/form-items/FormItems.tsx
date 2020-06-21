import React, {useState} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from "antd";
import {FormItem} from "lib";
import {useSelector} from "react-redux";
import {SaveOutlined} from "@ant-design/icons";
import {groupSelector} from "store/reducers/teacher/group/groupSlice";
import {useAppContext} from "store/context/use-app-context";
import {useParams} from "react-router";
import {categorySelector} from "../../../../../../../../store/reducers/teacher/category/categorySlice";

const {TextArea} = Input;

interface FormItemsProps {
    homework?: any;
    fetch: () => void;
    close: () => void;
    exercises: any;
    disciplineId: any;
}

const FormItems: React.FC<FormItemsProps> = ({homework, close, fetch, disciplineId, exercises}) => {
    const {api} = useAppContext();
    const {categories} = useSelector(categorySelector);
    const {duplicate} = useParams();
    const {group, isSaved} = useSelector(groupSelector);
    const [loading, setLoading] = useState(false);

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        try {
            if (homework && !duplicate) {
                const response = await api.user.put(`teacher/homework/${homework.id}`, {
                    ...values,
                    discipline: disciplineId,
                    exercises
                });
                if (response.data.status === 'success') {
                    message.success("Вы успешно изменили домашнее задание!");
                }
            } else {
                const response = await api.user.post('teacher/homework', {
                    ...values,
                    discipline: disciplineId,
                    exercises
                });
                if (response.data.status === 'success') {
                    message.success(
                        duplicate ?
                            "Вы успешно продублировали домашнее задание!" :
                            "Вы успешно создали домашнее задание!"
                    );
                }
            }
        } catch (e) {
            message.error("Неизвестная ошибка!");
            console.log(e);
        }
        close();
        await fetch();
    };

    return <Form
        layout="vertical"
        onFinish={onFinishHandler}
        initialValues={
            homework ? {
                level: homework.level,
                category: homework.category_id,
                description: homework.description,
            } : isSaved ? {
                category: group?.category.id,
            } : {}
        }
    >
        <Row gutter={15}>
            <Col span={12}>
                <FormItem name="level" label="Уровень" requiredMsg="Введите уровень!"/>
            </Col>
            <Col span={12}>
                <FormItem
                    name="category"
                    label="Категория"
                    requiredMsg="Введите категорию!"
                >
                    <Select disabled={isSaved}>
                        {categories.filter((category: any) => category.discipline_id === disciplineId)
                            .map((category: any, key: number) =>
                                <Select.Option value={category.id} key={key}>{category.title}</Select.Option>
                            )}
                    </Select>
                </FormItem>
            </Col>
            <Col span={24}>
                <FormItem name="description" label="Описание">
                    <TextArea rows={4}/>
                </FormItem>
            </Col>
        </Row>
        <div className="actions-block">
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined/>}>Сохранить</Button>
            <Button onClick={close}>Отмена</Button>
        </div>
    </Form>;
};

export default FormItems;