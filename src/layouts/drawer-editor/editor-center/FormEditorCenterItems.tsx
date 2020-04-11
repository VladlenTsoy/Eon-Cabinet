import React from "react";
import {FormItem, Upload} from "../../components";
import SelectData from "../../components/form/select-data/SelectData";
import {Col, Input, Row} from "antd";
import {useSelector} from "react-redux";

const {TextArea} = Input;

interface FormEditorCenterItemsProps {
    form: any;
}

const FormEditorCenterItems: React.FC<FormEditorCenterItemsProps> = ({form}) => {
    const {user} = useSelector((state: any) => (state));

    return <Row gutter={15}>
        {user.access === 'admin' ?
            <Col span={24}>
                <SelectData
                    form={form}
                    url="admin/franchises"
                    label="Франшиза"
                    name="franchise_id"
                    required="Выберите франшизу!"
                />
            </Col> : null}

        <Col span={12}>
            <FormItem
                form={form}
                name="title"
                label="Название"
                required="Введите название!"/>
            <FormItem form={form} name="phone" label="Телефон"/>
        </Col>
        <Col span={12}>
            <SelectData
                form={form}
                url="cities"
                label="Город"
                name="city_id"/>
            <FormItem form={form} name="address" label="Адрес"/>
        </Col>
        <Col span={24}>
            <FormItem form={form} name="description" label="Описание">
                <TextArea/>
            </FormItem>
            <Upload form={form} label="Логотип" name="image"/>
        </Col>
    </Row>
};

export default FormEditorCenterItems;