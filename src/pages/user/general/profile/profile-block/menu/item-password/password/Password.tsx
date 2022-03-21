import React from "react";
import {LockOutlined, SaveOutlined} from '@ant-design/icons';
import {Input, Form} from "antd";
import {Button} from "lib/ui";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updatePasswordUser} from "store/user/updatePasswordUser";
import {User} from "../../../../../../../../lib/types/common/User";

interface PasswordProps {
    currentUser: User;
    closeModal: () => void;
}

const PasswordBlock: React.FC<PasswordProps> = ({currentUser, closeModal}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (values: any) => {
        setLoading(true);
        await dispatch(updatePasswordUser({userId: currentUser.id, data: values}))
        closeModal();
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
