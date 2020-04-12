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
                requiredMsg="Введите от какой цифры">
                <InputNumber min={1} max={999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="to"
                label="До"
                requiredMsg="Введите до какой цифры">
                <InputNumber min={1} max={999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="count"
                label="Количество цифр"
                requiredMsg="Введите количество цифр!">
                <InputNumber min={1} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="time"
                label="Время (секунды)"
                requiredMsg="Введите время!">
                <InputNumber min={0.2} max={10} step={0.1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default FlashFormItems;