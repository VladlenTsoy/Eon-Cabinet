import React, {useState} from 'react';
import styled from "styled-components";
import ConfirmEmailBg from "../../../../assets/images/pages/confirm_email.svg";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Typography } from "antd";
import {FormItem} from "../../../../layouts/components";
import {useSelector} from "react-redux";

const {Title} = Typography;

const EmailInputWrapper = styled.div`
  text-align: center;
  padding: 1rem 0 1rem;
  
  .image-wrapper{
    width: 250px;
    margin: 2rem auto;
  }
`;

interface EmailInputProps {
    form: any;
    currentUser: any;
    changeDataCurrentUser?: any;
}

const EmailInput: React.FC<EmailInputProps> = ({form, changeDataCurrentUser, currentUser}) => {
    const {api} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);

    const handlerSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                try {
                    const response = await api.user_general.patch(`/${currentUser.id}`, values);
                    return changeDataCurrentUser(response.data);
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            }
        });
    };

    return <EmailInputWrapper>
        <Title level={3}>Введите почту</Title>
        <div className="image-wrapper">
            <img src={ConfirmEmailBg} width="100%" alt="email-input"/>
        </div>
        <Form onSubmit={handlerSubmit}>
            <FormItem
                form={form}
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
            <Button type="primary" htmlType="submit" block loading={loading}>Сохранить</Button>
        </Form>
    </EmailInputWrapper>;
};

export default Form.create<EmailInputProps>()(EmailInput);