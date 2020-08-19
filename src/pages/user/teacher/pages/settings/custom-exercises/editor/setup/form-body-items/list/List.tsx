import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "lib/ui";

interface ListProps {
    isMultiplication: boolean;
}

const List: React.FC<ListProps> = ({isMultiplication}) => {
    return <Row gutter={15}>
        <Col sm={isMultiplication ? 8 : 6} xs={isMultiplication ? 8 : 12}>
            <FormItem
                name="tables"
                label="Таблиц"
                requiredMsg="Введите кол-во таблиц!"
            >
                <InputNumber min={1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={isMultiplication ? 8 : 6} xs={isMultiplication ? 8 : 12}>
            <FormItem
                name="column"
                label="Столбцов"
                requiredMsg="Введите кол-во столбцов!"
            >
                <InputNumber min={6} max={6} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col sm={isMultiplication ? 8 : 6} xs={isMultiplication ? 8 : 12}>
            <FormItem
                name="rows"
                label="Строк"
                requiredMsg="Введите кол-во строк!"
            >
                <InputNumber min={1} max={20} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        {!isMultiplication ? <Col sm={6} xs={12}>
            <FormItem
                name="count"
                label="Количество цифр"
                requiredMsg="Введите кол-во цифр!"
            >
                <InputNumber min={1} max={20} style={{width: '100%'}}/>
            </FormItem>
        </Col> : null}
    </Row>
};

export default List;