import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";

interface FlashFormItemsProps {
}

const FlashFormItems:React.FC<FlashFormItemsProps> = () => {
    return <Row  gutter={15}>
        <Col span={12}>
            <FormItem
                name="from"
                label="От"
                required="Введите от какой цифры">
                <InputNumber min={1} max={999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="to"
                label="До"
                required="Введите до какой цифры">
                <InputNumber min={1} max={999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="count"
                label="Количество цифр"
                required="Введите количество цифр!">
                <InputNumber min={1} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="time"
                label="Время (секунды)"
                required="Введите время!">
                <InputNumber min={0.2} max={10} step={0.1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default FlashFormItems;