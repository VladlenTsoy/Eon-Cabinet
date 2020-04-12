import React from 'react';
import usingFormBodyLayout from "../../../mental/layout/form-body/usingFormBody.layout";
import {Col, InputNumber, Row, Select} from "antd";
import {FormItem} from "layouts/components";

interface PersonalitiesFormBodyProps {
}

const PersonalitiesFormBody:React.FC<PersonalitiesFormBodyProps> = () => {
    return <Row  gutter={15}>
        <Col span={24}>
            <FormItem name="mode" label="Мод" required="Выберите мод!">
                <Select>
                    <Select.Option value="1">Уровень 1</Select.Option>
                    <Select.Option value="2">Уровень 2</Select.Option>
                    <Select.Option value="3">Уровень 3</Select.Option>
                </Select>
            </FormItem>
        </Col>
        <Col sm={12} xs={24}>
            <FormItem label="Количество личностей" required="Введите количество личностей" name="count">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={12} xs={24}>
            <FormItem label="Время (минуты)" required="Введите время (минуты)" name="time">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default usingFormBodyLayout(PersonalitiesFormBody);