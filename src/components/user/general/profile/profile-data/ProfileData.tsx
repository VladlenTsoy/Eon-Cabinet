import React, {useState} from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, DatePicker, message, Row, Typography } from "antd";
import {Card} from "lib";
import {FormItem} from "../../../../../layouts/components";
import styled from "styled-components";
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import {setCurrentUserData} from "../../../../../store/user/actions";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';

const {Title} = Typography;

const ProfileTitle = styled(Title)`
   text-align: center;
`;

const ProfileData: React.FC<FormComponentProps> = ({form}) => {
    const {api, user} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                try {
                    const response = await api.user_general.patch(`/${user.id}`, values);
                    dispatch(setCurrentUserData(response.data));
                    message.success('Вы успешно изменили данные!');
                } catch (e) {
                    message.error(e.response.data.message);
                }
                setLoading(false);
            }
        });
    };

    return <Card>
        <ProfileTitle level={3}>Мои данные</ProfileTitle>
        <Form onSubmit={handleSubmit} layout="vertical">
            <Row gutter={15}>
                <Col lg={12}>
                    <FormItem
                        form={form}
                        name="last_name"
                        label="Фамилия"
                        required="Введите фамилию!"
                        initialValue={user.last_name}
                    />
                    <FormItem
                        form={form}
                        name="date_of_birth"
                        label="Дата рождения"
                        initialValue={user.date_of_birth ? moment(user.date_of_birth, 'YYYY-MM-DD') : null}
                    >
                        <DatePicker format="DD-MM-YYYY" style={{width: '100%'}}/>
                    </FormItem>
                    <FormItem
                        form={form}
                        name="email"
                        label="Эл.почта"
                        initialValue={user.email}
                        rules={[{
                            required: true,
                            message: 'Введите эл.почту!'
                        }, {
                            type: 'email',
                            message: 'Введен неверный E-mail!',
                        }]}
                    />
                </Col>
                <Col lg={12}>
                    <FormItem
                        form={form}
                        name="first_name"
                        label="Имя"
                        initialValue={user.first_name}
                        required="Введите имя!"
                    />
                    <FormItem
                        form={form}
                        name="login"
                        label="Логин"
                        initialValue={user.login}
                        required="Введите Логин!"
                    />
                    <FormItem
                        form={form}
                        initialValue={user.phone}
                        name="phone"
                        label="Телефон"
                    />
                </Col>
                <Col span={24}>
                    <Button type="primary" htmlType="submit" block loading={loading}>Сохранить</Button>
                </Col>
            </Row>
        </Form>
    </Card>
};

export default Form.create<any>()(ProfileData);
