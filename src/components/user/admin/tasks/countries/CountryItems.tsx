import React from "react";
import {Col, Input, Row} from "antd";
import {FormItem, Upload} from "../../../../../layouts/components";

const {TextArea} = Input;

interface CountryItemsProps {
    form: any;
}

const CountryItems: React.FC<CountryItemsProps> = ({form}) => {
    return <Row  gutter={15}>
        <Col span={12}>
            <FormItem form={form} name="country" label="Страна" required="Введите страну!"/>
            <FormItem form={form} name="capital" label="Столица" required="Введите столицу!"/>
        </Col>
        <Col span={12}>
            <FormItem form={form} name="description" label="Описание">
                <TextArea rows={6}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <Upload form={form} name="flag" label="Флаг" required="Выберите флаг!"/>
        </Col>
        <Col span={12}>
            <Upload form={form} name="emblem" label="Герб" required="Выберите герб!"/>
        </Col>
    </Row>
};

export default CountryItems;