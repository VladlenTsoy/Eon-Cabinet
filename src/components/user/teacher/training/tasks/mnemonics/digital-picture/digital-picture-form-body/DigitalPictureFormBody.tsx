import React from 'react';
import usingFormBodyLayout from "../../../mental/layout/form-body/usingFormBody.layout";
import {Col, InputNumber, Row, Select} from "antd";
import {FormItem} from "layouts/components";

interface DigitalPictureFormBodyProps {
}

const DigitalPictureFormBody: React.FC<DigitalPictureFormBodyProps> = () => {
    return <Row  gutter={15}>
        <Col span={24}>
            <FormItem name="mode" label="Мод" required="Выберите мод!">
                <Select>
                    <Select.Option value="1">Уровень 1</Select.Option>
                    <Select.Option value="2">Уровень 2</Select.Option>
                </Select>
            </FormItem>
        </Col>
        <Col md={8} xs={12}>
            <FormItem label="Количество" required="Введите количество цифр" name="count">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col md={8} xs={12}>
            <FormItem label="Время" required="Введите время" name="time">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col md={8} xs={24}>
            <FormItem label="Появление второй карты через" required="Введите время" name="time_card">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default usingFormBodyLayout(DigitalPictureFormBody);