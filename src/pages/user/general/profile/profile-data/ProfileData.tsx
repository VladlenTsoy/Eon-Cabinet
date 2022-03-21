import React, {useState} from 'react';
import {Col, DatePicker, Form, Row} from "antd";
import {Card, FormItem, Button, Title} from "lib/ui";
import styled from "styled-components";
import moment from 'moment';
import {useUser} from "../../../../../hooks/use-user";
import {useDispatch} from "react-redux";
import {updateUser} from "store/user/updateUser";

const ProfileTitle = styled(Title)`
   text-align: center;
`;

const ProfileData: React.FC = () => {
    const {user} = useUser()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (values: any) => {
        setLoading(true);
        await dispatch(updateUser({userId: user.id, data: values}))
        setLoading(false);
    };

    return <Card>
        <ProfileTitle level={3}>Мои данные</ProfileTitle>
        <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{
                last_name: user.last_name,
                date_of_birth: user.date_of_birth ? moment(user.date_of_birth, 'YYYY-MM-DD') : null,
                email: user.email,
                first_name: user.first_name,
                login: user.login,
                phone: user.phone,
            }}
        >
            <Row gutter={15}>
                <Col sm={12} xs={24}>
                    <FormItem
                        tabIndex={1}
                        name="last_name"
                        label="Фамилия"
                        requiredMsg="Введите фамилию!"
                    />
                    <FormItem
                        name="date_of_birth"
                        label="Дата рождения"
                    >
                        <DatePicker tabIndex={3} format="DD-MM-YYYY" style={{width: '100%'}}/>
                    </FormItem>
                    <FormItem
                        tabIndex={5}
                        name="email"
                        label="Эл.почта"
                        rules={[{
                            required: true,
                            message: 'Введите эл.почту!'
                        }, {
                            type: 'email',
                            message: 'Введен неверный E-mail!',
                        }]}
                    />
                </Col>
                <Col sm={12} xs={24}>
                    <FormItem
                        tabIndex={2}
                        name="first_name"
                        label="Имя"
                        requiredMsg="Введите имя!"
                    />
                    <FormItem
                        tabIndex={4}
                        name="phone"
                        label="Телефон"
                    />
                    <FormItem
                        tabIndex={6}
                        name="login"
                        label="Логин"
                        requiredMsg="Введите Логин!"
                    />
                </Col>
                <Col span={24}>
                    <Button type="primary" htmlType="submit" block loading={loading}>Сохранить</Button>
                </Col>
            </Row>
        </Form>
    </Card>
};

export default ProfileData;
