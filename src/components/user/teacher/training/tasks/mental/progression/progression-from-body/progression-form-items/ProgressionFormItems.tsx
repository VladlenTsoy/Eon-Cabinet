import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";

interface ProgressionFormItemsProps {
}

const ProgressionFormItems:React.FC<ProgressionFormItemsProps> = () => {
    return <Row  gutter={15}>
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

export default ProgressionFormItems;