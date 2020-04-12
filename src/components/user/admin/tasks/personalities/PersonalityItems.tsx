import React from "react";
import {Col, Input, Row, DatePicker} from "antd";
import {FormItem, Upload} from "../../../../../layouts/components";

const {TextArea} = Input;

interface PersonalityItemsProps {
    form: any;
}

const PersonalityItems: React.FC<PersonalityItemsProps> = ({form}) => {
    return <Row  gutter={15}>
        <Col span={24}>
            <FormItem  name="full_name" label="Имя" required="Введите имя!"/>
        </Col>
        <Col span={12}>
            <FormItem  name="born" label="Дата рождения" required="Введите дату рождения!">
                <DatePicker style={{width: '100%'}}/>
            </FormItem>
            <FormItem  name="description" label="Описание">
                <TextArea rows={6}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem  name="die" label="Дата смерти">
                <DatePicker style={{width: '100%'}}/>
            </FormItem>
            <Upload form={form} name="photo" label="Фото" required="Выберите фото!"/>
        </Col>
    </Row>
};

export default PersonalityItems;