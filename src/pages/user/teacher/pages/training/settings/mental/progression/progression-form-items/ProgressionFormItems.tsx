import React from 'react';
import {Col, Row} from "antd";
import {FormItem} from "lib/ui";
import Stepper from "lib/ui/data-entry/stepper/Stepper";

const ProgressionFormItems: React.FC = () => {
    return <Row gutter={15}>
        <Col span={12}>
            <FormItem
                name="count"
                label="Количество цифр"
                requiredMsg="Введите количество цифр!">
                <Stepper min={1} max={99}/>
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

export default ProgressionFormItems;