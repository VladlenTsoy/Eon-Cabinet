import React, {useState} from 'react';
import {Button, Col, Form, Input, InputNumber, message, Row, Select} from "antd";
import {FormItem} from "lib";
import {useSelector} from "react-redux";
import {SaveOutlined} from "@ant-design/icons";
import {groupSelector} from "store/reducers/teacher/group/groupSlice";
import {useAppContext} from "store/context/use-app-context";
import {appSelector} from "store/reducers/common/app/appSlice";
import {useParams} from "react-router";

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
    const app = useSelector(appSelector);
    const {duplicate} = useParams<any>();
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
                category: group?.category_id,
            } : {}
        }
    >
        <Row gutter={15}>
            <Col span={12}>
                <FormItem name="level" label="Уровень (Цифру)" requiredMsg="Введите уровень!">
                    <InputNumber min={1} style={{width: '100%'}}/>
                </FormItem>
            </Col>
            <Col span={12}>
                <FormItem
                    name="category"
                    label="Категория"
                    requiredMsg="Введите категорию!"
                >
                    <Select disabled={isSaved}>
                        {app.categories.filter((category: any) => category.discipline_id === disciplineId)
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