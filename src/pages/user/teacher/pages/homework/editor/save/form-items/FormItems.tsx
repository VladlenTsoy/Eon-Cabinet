import React, {useState} from 'react';
import {Button, Col, Form, Input, Row, Select, InputNumber} from "antd";
import {FormItem} from "lib/ui";
import {useDispatch, useSelector} from "react-redux";
import {SaveOutlined} from "@ant-design/icons";
import {groupSelector} from "store/group/groupSlice";
import {useParams} from "react-router";
import {createHomework} from "store/homework/createHomework";
import {updateHomework} from "store/homework/updateHomework";
import {ParamsProps} from "../../../../groups/more/Group";
import {useSelectGroupById} from "store/group/groupSelectors";
import {useSelectAllCategories} from "store/category/categorySelectors";

const {TextArea} = Input;

interface FormItemsProps {
    homework?: any;
    fetch: () => void;
    close: () => void;
    exercises: any;
}

const FormItems: React.FC<FormItemsProps> = ({homework, close, fetch, exercises}) => {
    const categories = useSelectAllCategories();
    const {duplicate} = useParams<any>();
    // TODO - note group id params
    const {id} = useParams<ParamsProps>();
    const group = useSelectGroupById(Number(id));
    const {isSaved} = useSelector(groupSelector);
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
                <FormItem name="level" label="Уровень" requiredMsg="Введите уровень!">
                    <InputNumber width="100%" min={1} style={{width: '100%'}}/>
                </FormItem>
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
                <FormItem name="description" label="Описание" requiredMsg="Введите описание!">
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
