import React, {useState} from 'react';
import {Button, Col, Form, Input, Row, Select} from "antd";
import {FormItem} from "lib";
import {useDispatch, useSelector} from "react-redux";
import {SaveOutlined} from "@ant-design/icons";
import {groupSelector} from "store/reducers/teacher/group/groupSlice";
import {useParams} from "react-router";
import {categorySelector} from "../../../../../../../../store/reducers/teacher/category/categorySlice";
import {createHomework} from "../../../../../../../../store/reducers/teacher/homework/createHomework";
import {updateHomework} from "../../../../../../../../store/reducers/teacher/homework/updateHomework";

const {TextArea} = Input;

interface FormItemsProps {
    homework?: any;
    fetch: () => void;
    close: () => void;
    exercises: any;
}

const FormItems: React.FC<FormItemsProps> = ({homework, close, fetch, exercises}) => {
    const {categories} = useSelector(categorySelector);
    const {duplicate} = useParams();
    const {group, isSaved} = useSelector(groupSelector);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        if (homework && !duplicate)
            await dispatch(updateHomework({
                homeworkId: homework.id,
                data: {
                    ...values,
                    exercises
                }
            }))
        else
            await dispatch(createHomework({
                duplicate,
                data: {
                    ...values,
                    exercises
                }
            }));
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
                        {categories.map((category: any, key: number) =>
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