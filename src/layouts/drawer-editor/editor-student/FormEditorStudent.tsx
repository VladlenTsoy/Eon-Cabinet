import React, {useEffect} from "react";
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, DatePicker, Input, Row } from "antd";
import moment from 'moment';
import InputPhoto from "../../components/form/InputPhoto";
import {FormItem, InputEmail, InputLogin, InputPassword} from "../../components";
import SelectData from "../../components/form/select-data/SelectData";
import ActionsFromEditorStudent from "./ActionsFormEditorStudent";

interface FormEditorStudentProps {
    close: any;
    group_id?: string;
    data?: any;
}

const FormEditorStudent: React.FC<FormComponentProps & FormEditorStudentProps> = ({form, data, close, group_id}) => {
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
                    <FormItem form={form} name="first_name" label="Имя" required="Введите имя!"/>
                    <InputEmail form={form}/>
                    <InputLogin form={form}/>
                    <SelectData form={form} url="teacher/groups" label="Группа" name="group_id" required="Выберите группу!"/>
                </Col>
                <Col span={12}>
                    <FormItem form={form} name="last_name" label="Фамилия" required="Введите фамилию!"/>
                    <FormItem form={form} name="phone" label="Телефон">
                        <Input/>
                    </FormItem>
                    <InputPassword form={form} user={data}/>
                    <FormItem form={form} name="date_of_birth" label="Дата рождения">
                        <DatePicker style={{width: '100%'}}/>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <ActionsFromEditorStudent form={form} close={close} user={data}/>
    </>
};

export default Form.create<FormComponentProps & FormEditorStudentProps>()(FormEditorStudent);