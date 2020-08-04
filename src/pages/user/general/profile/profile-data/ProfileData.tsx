import React, {useState} from 'react';
import {Button, Col, DatePicker, Form, message, Row, Typography} from "antd";
import {Card} from "lib/components";
import {FormItem} from "../../../../../lib/components";
import styled from "styled-components";
import moment from 'moment';
import {useAppContext} from "../../../../../store/context/use-app-context";

const {Title} = Typography;

const ProfileTitle = styled(Title)`
   text-align: center;
`;

const ProfileData: React.FC = () => {
    const {user, api, updateUser} = useAppContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.user.patch(`/${user.id}`, values);
            updateUser(response.data);
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
                <Col sm={12} xs={24}>
                    <FormItem
                        name="last_name"
                        label="Фамилия"
                        requiredMsg="Введите фамилию!"
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
                <Col sm={12} xs={24}>
                    <FormItem
                        name="first_name"
                        label="Имя"
                        requiredMsg="Введите имя!"
                    />
                    <FormItem
                        name="login"
                        label="Логин"
                        requiredMsg="Введите Логин!"
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
