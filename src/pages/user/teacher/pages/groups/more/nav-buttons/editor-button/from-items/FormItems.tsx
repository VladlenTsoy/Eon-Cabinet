import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, DatePicker, Form, Row} from "antd";
import {DrawerActions, FormItem, InputEmail, InputLogin, InputPassword} from "lib/components";
import {Student} from "store/access/teacher/students/studentsSlice";
import {updateStudent} from "store/access/teacher/students/updateStudent";
import {createStudent} from "store/access/teacher/students/createStudent";
import InputPhoto from "lib/components/form/InputPhoto";
import SelectGroup from "./items/SelectGroup";
import {SaveOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../Group";

interface FormItemsProps {
    close: () => void;
    student?: Student;
}

const FormItems: React.FC<FormItemsProps> = ({close, student}) => {
    const {id} = useParams<ParamsProps>();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onFinishHandler = async (values: any) => {
        setLoading(true);

        if (student)
            await dispatch(updateStudent({studentId: student.id, data: values}));
        else
            await dispatch(createStudent(values));

        close();
        setLoading(false);
    };

    return <Form
        layout="vertical"
        onFinish={onFinishHandler}
        initialValues={student || id ? {group_id: Number(id)} : undefined}
    >
        <Row gutter={15}>
            <Col span={24}>
                <InputPhoto form={form}/>
            </Col>
            <Col sm={12} xs={24}>
                <FormItem name="first_name" label="Имя" requiredMsg="Введите имя!"/>
                <InputEmail/>
                <InputLogin/>
                <SelectGroup/>
            </Col>
            <Col sm={12} xs={24}>
                <FormItem name="last_name" label="Фамилия" requiredMsg="Введите фамилию!"/>
                <FormItem name="phone" label="Телефон"/>
                <InputPassword user={student}/>
                <FormItem
                    name="date_of_birth"
                    label="Дата рождения"
                >
                    <DatePicker style={{width: '100%'}}/>
                </FormItem>
            </Col>
        </Row>
        <DrawerActions>
            <Button onClick={close} style={{marginRight: 8}}>
                Отмена
            </Button>
            <Button
                htmlType="submit"
                loading={loading}
                type="primary"
                icon={<SaveOutlined/>}
            >
                Сохранить
            </Button>
        </DrawerActions>
    </Form>
};

export default React.memo(FormItems);