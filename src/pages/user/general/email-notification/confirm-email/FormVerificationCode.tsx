import React, {useState} from 'react';
import {Button, message, Form} from "antd";
import {FormItem} from "../../../../../lib/components";
import {useAppContext} from "../../../../../store/context/use-app-context";

interface FormVerificationCodeProps {
    changeDataCurrentUser: any;
    updateResult: any;
}

const FormVerificationCode: React.FC<FormVerificationCodeProps> = ({updateResult, changeDataCurrentUser}) => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            let response = await api.user.post('/code-confirmation', values);
            if (response.data.status === 'success')
                changeDataCurrentUser(response.data.user);
            return updateResult(true);
        } catch (e) {
            message.error(e.response.data.message);
        }
        setLoading(false);
    };

    // TODO - Придумать текст
    return <Form onFinish={handleSubmit}>
        <p style={{marginBottom: '1rem'}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
            sit amet, consectetur
            adipisicing
            elit.</p>
        <FormItem
            name="verification_code"
            placeholder="Проверочный код"
            requiredMsg="Введите проверочный код!"
        />
        <Button
            className="confirm-button"
            type="primary"
            block
            htmlType="submit"
            loading={loading}>
            Далее
        </Button>
    </Form>;
};

export default FormVerificationCode;