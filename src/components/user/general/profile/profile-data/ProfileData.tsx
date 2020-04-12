import React, {useState} from 'react';
import {Button, Col, DatePicker, Form, message, Row, Typography} from "antd";
import {Card} from "lib";
import {FormItem} from "../../../../../layouts/components";
import styled from "styled-components";
import {setCurrentUserData} from "../../../../../store/user/actions";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';

const {Title} = Typography;

const ProfileTitle = styled(Title)`
   text-align: center;
`;

const ProfileData: React.FC = () => {
    const {api, user} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.user_general.patch(`/${user.id}`, values);
            dispatch(setCurrentUserData(response.data));
            message.success('Вы успешно изменили данные!');
        } catch (e) {
            message.error(e.response.data.message);
        }
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
                <Col lg={12}>
                    <FormItem
                        name="last_name"
                        label="Фамилия"
                        required="Введите фамилию!"
                    />
                    <FormItem
                        name="date_of_birth"
                        label="Дата рождения"
                    >
                        <DatePicker format="DD-MM-YYYY" style={{width: '100%'}}/>
                    </FormItem>
                    <FormItem
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
                <Col lg={12}>
                    <FormItem
                        name="first_name"
                        label="Имя"
                        required="Введите имя!"
                    />
                    <FormItem
                        name="login"
                        label="Логин"
                        required="Введите Логин!"
                    />
                    <FormItem
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

export default ProfileData;
