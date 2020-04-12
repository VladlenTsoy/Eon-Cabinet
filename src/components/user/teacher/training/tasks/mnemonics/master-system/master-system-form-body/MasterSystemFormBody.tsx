import React from 'react';
import {Col, InputNumber, Row, Select} from "antd";
import {FormItem} from "../../../../../../../../layouts/components";
import usingFormBodyLayout from "../../../mental/layout/form-body/usingFormBody.layout";

interface MasterSystemFormBodyProps {
}

const MasterSystemFormBody: React.FC<MasterSystemFormBodyProps> = () => {
    return <Row  gutter={15}>
        <Col span={24}>
            <FormItem name="mode" label="Мод" requiredMsg="Выберите мод!">
                <Select>
                    <Select.Option value="1">По порядку</Select.Option>
                    <Select.Option value="2">Вразброс</Select.Option>
                </Select>
            </FormItem>
        </Col>
        <Col xs={12}>
            <FormItem label="Количество цифр" requiredMsg="Введите количество цифр" name="count">
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

export default usingFormBodyLayout(MasterSystemFormBody);