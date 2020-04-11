import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";

interface ProgressionFormItemsProps {
    form: any;
}

const ProgressionFormItems:React.FC<ProgressionFormItemsProps> = ({form}) => {
    return <Row  gutter={15}>
        <Col span={12}>
            <FormItem
                form={form}
                name="count"
                label="Количество цифр"
                required="Введите количество цифр!">
                <InputNumber min={1} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                form={form}
                name="time"
                label="Время (секунды)"
                required="Введите время!">
                <InputNumber min={0.2} max={10} step={0.1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default ProgressionFormItems;