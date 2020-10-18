import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../../lib/ui";
import Stepper from "../../../../../../../../../lib/ui/data-entry/stepper/Stepper";

const FlashFormItems: React.FC = () => {
    return <Row gutter={15}>
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
                <Stepper min={1} max={10}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="time"
                label="Время (секунды)"
                requiredMsg="Введите время!">
                <Stepper min={0.2} max={10} step={0.1}/>
            </FormItem>
        </Col>
    </Row>;
};

export default FlashFormItems;