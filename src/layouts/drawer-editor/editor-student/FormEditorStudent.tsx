import React, {useEffect} from "react";
import {Form, Col, DatePicker, Input, Row} from "antd";
import moment from 'moment';
import InputPhoto from "../../../lib/form/InputPhoto";
import {FormItem, InputEmail, InputLogin, InputPassword} from "../../components";
import SelectData from "../../../lib/form/select-data/SelectData";
import ActionsFromEditorStudent from "./ActionsFormEditorStudent";

interface FormEditorStudentProps {
    close: any;
    group_id?: string;
    data?: any;
}

const FormEditorStudent: React.FC<FormEditorStudentProps> = ({data, close, group_id}) => {
    const [form] = Form.useForm();

    // TODO - Значения по умолчанию
    useEffect(() => {
        if (data)
            form.setFieldsValue({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                group_id: data.group_id,
                date_of_birth: data.date_of_birth ? moment(data.date_of_birth, 'YYYY-MM-DD') : null,
                login: data.login,
                image: data.image,
            });

        if (group_id)
            form.setFieldsValue({
                group_id: Number(group_id),
            })
    }, []);
    return <>
        <Form layout="vertical" autoComplete="off" id="FormEditorStudent">
            <Row gutter={15}>
                <Col span={24}>
                    <InputPhoto form={form}/>
                </Col>
                <Col span={12}>
                    <FormItem name="first_name" label="Имя" requiredMsg="Введите имя!"/>
                    <InputEmail/>
                    <InputLogin/>
                    <SelectData url="teacher/groups" label="Группа" name="group_id" requiredMsg="Выберите группу!"/>
                </Col>
                <Col span={12}>
                    <FormItem name="last_name" label="Фамилия" requiredMsg="Введите фамилию!"/>
                    <FormItem name="phone" label="Телефон">
                        <Input/>
                    </FormItem>
                    <InputPassword user={data}/>
                    <FormItem name="date_of_birth" label="Дата рождения">
                        <DatePicker style={{width: '100%'}}/>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <ActionsFromEditorStudent form={form} close={close} user={data}/>
    </>
};

// TODO - не присоединен
export default FormEditorStudent;