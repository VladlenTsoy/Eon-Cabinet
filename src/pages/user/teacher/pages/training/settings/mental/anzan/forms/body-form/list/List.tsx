import React from 'react';
import {Col, Row} from "antd";
import FormItem from "lib/components/form/form-item/FormItem";
import Stepper from "../../../../../../../../../../../lib/components/stepper/Stepper";

const List: React.FC = () => {
    return <Row gutter={15}>
        <Col sm={6} xs={12}>
            <FormItem
                name="tables"
                label="Таблиц"
                requiredMsg="Введите кол-во таблиц!"
            >
                <Stepper min={1}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="column"
                label="Столбцов"
                requiredMsg="Введите кол-во столбцов!"
            >
                <Stepper min={2} max={10}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="rows"
                label="Строк"
                requiredMsg="Введите кол-во строк!"
            >
                <Stepper min={2} max={20}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="time"
                label="Время (Минутах)"
                requiredMsg="Введите время!"
            >
                <Stepper min={1}/>
            </FormItem>
        </Col>
    </Row>
};

export default React.memo(List);