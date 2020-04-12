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
                // TODO - Значение по умолчанию
                // initialValue={1}
                required="Введите кол-во таблиц!"
            >
                <InputNumber min={1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="column"
                label="Столбцов"
                // TODO - Значение по умолчанию
                // initialValue={10}
                required="Введите кол-во столбцов!"
            >
                <InputNumber min={10} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="rows"
                label="Строк"
                // TODO - Значение по умолчанию
                // initialValue={4}
                required="Введите кол-во строк!"
            >
                <InputNumber min={4} max={20} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={6} xs={12}>
            <FormItem
                name="time"
                // TODO - Значение по умолчанию
                // initialValue={1}
                label="Время (Минутах)"
                required="Введите время!"
            />
        </Col>
    </Row>
};

export default ListSetting;