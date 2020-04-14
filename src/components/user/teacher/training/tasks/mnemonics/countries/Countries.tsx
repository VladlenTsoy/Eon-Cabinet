import React from 'react';
import {Col, InputNumber, Row, Select} from "antd";
import {FormItem} from "../../../../../../../layouts/components";
import usingFormBodyLayout from "../../mental/layout/form-body/usingFormBody.layout";

const Countries: React.FC = () => {
    return <Row  gutter={15}>
        <Col span={24}>
            <FormItem name="mode" label="Мод" requiredMsg="Выберите мод!">
                <Select>
                    <Select.Option value="1">Уровень 1</Select.Option>
                    <Select.Option value="2">Уровень 2</Select.Option>
                </Select>
            </FormItem>
        </Col>
        <Col xs={12}>
            <FormItem label="Количество стран" requiredMsg="Введите количество стран" name="count">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col xs={12}>
            <FormItem label="Время (минуты)" requiredMsg="Введите время (минуты)" name="time">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default usingFormBodyLayout(Countries);