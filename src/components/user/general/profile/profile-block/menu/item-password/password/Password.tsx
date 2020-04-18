import React from "react";
import {LockOutlined, SaveOutlined} from '@ant-design/icons';
import {Button, Input, message, Form} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";

interface PasswordProps {
    currentUser: any;
    closeModal: () => void;
}

const PasswordBlock: React.FC<PasswordProps> = ({currentUser, closeModal}) => {
    const [form] = Form.useForm();
    const {api} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await api.user_general.post(`/${currentUser.id}/password`, values);
            message.success('Вы успешно сменили пароль!');
            closeModal();
        } catch (e) {
            console.log(e.response.data.message);
            message.error(`${e.response.data.message}!`);
            setLoading(false);
        }
    };

    const compareToFirstPassword = (rule: any, value: any, callback: any) => {
        if (value && value !== form.getFieldValue('password_new'))
            callback('Два пароля, которые вы вводите, не совпадают!');
        else
            callback();
    };

    return <Form onFinish={handleSubmit} className="login-form" layout="vertical" form={form}>
        <Form.Item
            label="Текущий пароль"
            name="password_old"
            rules={[{required: true, message: 'Введите текущий пароль!'}]}

        >
            <Input.Password prefix={<LockOutlined/>}/>
        </Form.Item>

        <Form.Item
            label="Новый пароль"
            hasFeedback
            name="password_new"
            rules={[
                {required: true, message: "Введите пароль!"},
                {min: 5, message: "Пароль должен состоять мин. из 5 символов!"},
                {pattern: /^[A-Za-z0-9]+$/, whitespace: true, message: "Только латинский буквы и цифры!"},
                // {validator: validateToNextPassword},
            ]}
        >
            <Input.Password prefix={<LockOutlined/>}/>
        </Form.Item>

        <Form.Item
            label="Потвердите новый пароль"
            hasFeedback
            dependencies={['password_new']}
            style={{marginBottom: '1.5rem'}}
            rules={[
                {required: true, message: 'Потвердите новый пароль!',},
                {validator: compareToFirstPassword},
            ]}
            name="password_confirm"
        >
            <Input.Password prefix={<LockOutlined/>}/>
        </Form.Item>

        <div className="actions-block">
            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} loading={loading}>Сохранить</Button>
            <Button onClick={closeModal}>Отмена</Button>
        </div>
    </Form>;
};

export default PasswordBlock;