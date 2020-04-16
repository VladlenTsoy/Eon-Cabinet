import React from 'react';
import {Col, InputNumber, Row} from "antd";
import FormItem from "../../../../../../../../../../lib/form/form-item/FormItem";

interface ListSetting {
}

const ListSetting: React.FC<ListSetting> = () => {
    return <Row  gutter={15}>
        <Col sm={6} xs={12}>
            <FormItem
                name="tables"
                label="Таблиц"
                requiredMsg="Введите кол-во таблиц!"
            >
                <InputNumber min={1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="column"
                label="Столбцов"
                requiredMsg="Введите кол-во столбцов!"
            >
                <InputNumber min={10} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="rows"
                label="Строк"
                requiredMsg="Введите кол-во строк!"
            >
                <InputNumber min={4} max={20} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="time"
                label="Время (Минутах)"
                requiredMsg="Введите время!"
            />
        </Col>
    </Row>
};

export default ListSetting;