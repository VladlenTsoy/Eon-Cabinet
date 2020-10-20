import React, {useState} from 'react';
import styled from "styled-components";
import ConfirmEmailBg from "../../../../assets/images/pages/login_page_bg.svg";
import {Form} from "antd";
import {Button, Title, FormItem} from "lib/ui";

const EmailInputWrapper = styled.div`
  text-align: center;
  padding: 1rem 0 1rem;
  
  .image-wrapper{
    width: 250px;
    margin: 2rem auto;
  }
`;

interface EmailInputProps {
    currentUser: any;
    changeDataCurrentUser?: any;
}

// TODO - api
const EmailInput: React.FC<EmailInputProps> = ({changeDataCurrentUser, currentUser}) => {
    const [loading, setLoading] = useState(false);

    const handlerSubmit = async (values: any) => {
        setLoading(true);
        try {
            // const response = await api.user.patch(`/${currentUser.id}`, values);
            // return changeDataCurrentUser(response.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return <EmailInputWrapper>
        <Title level={3}>Введите почту</Title>
        <div className="image-wrapper">
            <img src={ConfirmEmailBg} width="100%" alt="email-input"/>
        </div>
        <Form onFinish={handlerSubmit}>
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
            <Button type="primary" htmlType="submit" block loading={loading}>Сохранить</Button>
        </Form>
    </EmailInputWrapper>;
};

export default EmailInput;