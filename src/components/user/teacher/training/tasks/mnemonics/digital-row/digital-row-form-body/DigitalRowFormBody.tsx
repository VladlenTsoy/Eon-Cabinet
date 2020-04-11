import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../layouts/components";
import usingFormBodyLayout from "../../../mental/layout/form-body/usingFormBody.layout";

interface DigitalRowFormBodyProps {
    form: any;
}

const DigitalRowFormBody: React.FC<DigitalRowFormBodyProps> = ({form}) => {
    return <Row  gutter={15}>
        <Col xs={12}>
            <FormItem form={form} label="Количество цифр" required="Введите количество цифр" name="count">
                <InputNumber style={{width: '100%'}} max={100} min={1}/>
            </FormItem>
        </Col>
        <Col xs={12}>
            <FormItem form={form} label="Время (минуты)" required="Введите время (минуты)" name="time">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default usingFormBodyLayout(DigitalRowFormBody);