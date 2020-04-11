import React from 'react';
import {FormItem} from "../../../../../../layouts/components";
import {Col, Row, Input, Select} from "antd";
import {useSelector} from "react-redux";

const {TextArea} = Input;

interface SaveHomeworkItemsProps {
    form: any;
    disciplineId: any;
}

const SaveHomeworkItems: React.FC<SaveHomeworkItemsProps> = ({form, disciplineId}) => {
    const {app} = useSelector((state: any) => state);
    return <Row  gutter={15}>
        <Col span={12}>
            <FormItem form={form} name="level" label="Уровень" required="Введите уровень!"/>
        </Col>
        <Col span={12}>
            <FormItem
                form={form}
                name="category"
                label="Категория"
                required="Введите категорию!"
            >
                <Select>
                    {app.categories.filter((category: any) => category.discipline_id === disciplineId)
                        .map((category: any, key: number) =>
                            <Select.Option value={category.id} key={key}>{category.title}</Select.Option>
                        )}
                </Select>
            </FormItem>
        </Col>
        <Col span={24}>
            <FormItem form={form} name="description" label="Описание">
                <TextArea rows={4}/>
            </FormItem>
        </Col>
    </Row>;
};

export default SaveHomeworkItems;