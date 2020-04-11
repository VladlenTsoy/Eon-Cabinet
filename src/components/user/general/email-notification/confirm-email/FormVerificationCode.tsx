import React, {useState} from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message } from "antd";
import {FormItem} from "../../../../../layouts/components";
import {useSelector} from "react-redux";

interface FormVerificationCodeProps {
    form: any;
    changeDataCurrentUser: any;
    updateResult: any;
}

const FormVerificationCode: React.FC<FormVerificationCodeProps> = ({form, updateResult, changeDataCurrentUser}) => {
    const {api} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                try {
                    let response = await api.user_general.post('/code-confirmation', values);
                    if (response.data.status === 'success')
                        changeDataCurrentUser(response.data.user);
                        return updateResult(true);
                } catch (e) {
                    message.error(e.response.data.message);
                }
                setLoading(false);
            }
        });
    };

    return <Form onSubmit={handleSubmit}>
        <p style={{marginBottom: '1rem'}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor
            sit amet, consectetur
            adipisicing
            elit.</p>
        <FormItem
            form={form}
            name="verification_code"
            placeholder="Проверочный код"
            required="Введите проверочный код!"
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

export default Form.create<FormVerificationCodeProps>()(FormVerificationCode);