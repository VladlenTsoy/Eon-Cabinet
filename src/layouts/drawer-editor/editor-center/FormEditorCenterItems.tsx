import React from "react";
import {FormItem, Upload} from "../../components";
import SelectData from "../../components/form/select-data/SelectData";
import {Col, Input, Row} from "antd";
import {useSelector} from "react-redux";
import {FormInstance} from "antd/es/form";

const {TextArea} = Input;

interface FormEditorCenterItemsProps {
    form: FormInstance;
}

const FormEditorCenterItems: React.FC<FormEditorCenterItemsProps> = ({form}) => {
    const {user} = useSelector((state: any) => (state));

    return <Row gutter={15}>
        {user.access === 'admin' ?
            <Col span={24}>
                <SelectData
                    url="admin/franchises"
                    label="Франшиза"
                    name="franchise_id"
                    requiredMsg="Выберите франшизу!"
                />
            </Col> : null}

        <Col span={12}>
            <FormItem
                name="title"
                label="Название"
                requiredMsg="Введите название!"/>
            <FormItem name="phone" label="Телефон"/>
        </Col>
        <Col span={12}>
            <SelectData
                url="cities"
                label="Город"
                name="city_id"/>
            <FormItem name="address" label="Адрес"/>
        </Col>
        <Col span={24}>
            <FormItem name="description" label="Описание">
                <TextArea/>
            </FormItem>
            <Upload form={form} label="Логотип" name="image"/>
        </Col>
    </Row>
};

export default FormEditorCenterItems;