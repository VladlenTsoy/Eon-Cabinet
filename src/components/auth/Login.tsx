import React, {useState} from "react";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Alert, Button, Input, message, Form} from "antd";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {apiChangeAccessToken} from "../../store/api/actions";
import {Card} from "lib";
import {FormItem, TextLink} from "../../layouts/components";
import {Title, SubTitle, FormWrapper} from "./AuthLayouts";

const Login = () => {
    const {api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.guest.post('/login', values);
            dispatch(apiChangeAccessToken(response.data.data.token));
            history.push('/');
        } catch (e) {
            if (e.response)
                message.error(e.response.data.message);
            else
                message.error('Неизвестная ошибка!');
            setLoading(false);
        }
    };

    return <Card>
        <Title>Авторизация</Title>
        <SubTitle>Вход в личный кабинет</SubTitle>
        <FormWrapper onFinish={handleSubmit}>
            <FormItem name="login" requiredMsg="Введите Логин или Почту!">
                <Input prefix={<UserOutlined/>} placeholder="Логин или Почту"/>
            </FormItem>
            <FormItem name="password" requiredMsg="Введите пароль!">
                <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
            </FormItem>
            {/*<Form.Item>*/}
            {/*<TextLink position="right" to="/forgot-password">*/}
            {/*    Забыли пароль?*/}
            {/*</TextLink>*/}
            {/*</Form.Item>*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Войти
                </Button>
            </Form.Item>
            {/*<Form.Item>*/}
            {/*    <Alert*/}
            {/*        type="info"*/}
            {/*        showIcon*/}
            {/*        message="Данное обновление является бета-версией!"*/}
            {/*        description="Бета-версия будет обновляться ежедневно до завершения бета-периода и не исключены ошибки при работе с сайтом, при неисправности просим Вас уведомлять нас в чате (нижнем в правом углу)."*/}
            {/*    />*/}
            {/*</Form.Item>*/}
            <div style={{textAlign: 'center'}}>
                <a href="http://old.eon.uz/">
                    Предыдущая версия сайта
                </a>
            </div>
        </FormWrapper>
    </Card>
};

export default Login;