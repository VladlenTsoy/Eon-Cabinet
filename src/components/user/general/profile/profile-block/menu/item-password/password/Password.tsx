import * as React from "react";
import { LockOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message } from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";

const PasswordBlock = ({form, currentUser, closeModal}: any) => {
    const {api} = useSelector((state: any) => state);
    const {getFieldDecorator} = form;
    const [loading, setLoading] = useState(false);
    const [confirmDirty, setConfirmDirty] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                try {
                    await api.user_general.post(`/${currentUser.id}/password`, values);
                    message.success('Вы успешно сменили пароль!');
                } catch (e) {
                    console.log(e.response.data.message);
                    message.error(`${e.response.data.message}!`);
                }
                setLoading(false);
            }
        });
    };

    const compareToFirstPassword = (rule: any, value: any, callback: any) => {
        if (value && value !== form.getFieldValue('password_new'))
            callback('Два пароля, которые вы вводите, не совпадают!');
        else
            callback();
    };

    const validateToNextPassword = (rule: any, value: any, callback: any) => {
        if (value && confirmDirty)
            form.validateFields(['confirm'], {force: true});
        callback();
    };

    const handleConfirmBlur = (e: any) => {
        const {value} = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item label="Текущий пароль">
                {getFieldDecorator('password_old', {
                    rules: [{required: true, message: 'Введите текущий пароль!'}],
                })(<Input.Password
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                />)}
            </Form.Item>

            <Form.Item label="Новый пароль" hasFeedback>
                {getFieldDecorator('password_new', {
                    rules: [
                        {required: true, message: 'Введите новый пароль!',},
                        {min: 6, message: 'Пароль должен содержать от 6 символов!',},
                        {validator: validateToNextPassword},
                    ],
                })(<Input.Password
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                />)}
            </Form.Item>

            <Form.Item label="Потвердите новый пароль" hasFeedback style={{marginBottom: '1.5rem'}}>
                {getFieldDecorator('password_confirm', {
                    rules: [
                        {required: true, message: 'Потвердите новый пароль!',},
                        {validator: compareToFirstPassword,},
                    ],
                })(<Input.Password
                    onBlur={handleConfirmBlur}
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                />)}
            </Form.Item>

            <div className="actions-block">
                <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
                <Button onClick={closeModal}>Отмена</Button>
            </div>
        </Form>
    );
};

export default Form.create<any>()(PasswordBlock);