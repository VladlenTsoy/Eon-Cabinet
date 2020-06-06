import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../../../lib";

interface BasicProps {
    isMultiplication: boolean;
}

const Basic: React.FC<BasicProps> = ({isMultiplication}) => {
    return <Row gutter={15}>
        {!isMultiplication ?
            <Col span={12}>
                <FormItem
                    name="count"
                    label="Количество цифр"
                    requiredMsg="Введите количество цифр!">
                    <InputNumber min={1} style={{width: '100%'}}/>
                </FormItem>
            </Col> : null}
        <Col span={isMultiplication ? 24 : 12}>
            <FormItem
                name="times"
                label="Количество раз"
                requiredMsg="Введите количество раз!">
                <InputNumber min={1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default Basic;