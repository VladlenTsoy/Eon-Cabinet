import React, {useState} from 'react';
import {Button, message, Form} from "antd";

interface FormEditorDataProps {
    data: any;
    close: any;
    sendData: any;
    disciplineId?: any;
    isFranchise?: any;
}

const usingFormEditorModalData = (FormItemsComponent: any) => {
    const FormEditorModalData: React.FC<FormEditorDataProps> = ({data, close, sendData, ...props}) => {
        const [form] = Form.useForm();
        const [loading, setLoading] = useState(false);

        const onFinish = async (values: any) => {
            setLoading(true);
            try {
                await sendData(values);
                form.resetFields();
                close(null, true);
            } catch (e) {
                if (e.response)
                    message.error(e.response.data.message);
                else
                    message.error('Неизвестная ошибка!');
                setLoading(false);
            }
        };

        return <Form onFinish={onFinish} form={form}>
            <FormItemsComponent form={form} {...props}/>
            <div className="actions-block">
                <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
                <Button onClick={close}>Отмена</Button>
            </div>
        </Form>
    };
    return FormEditorModalData;
};

export default usingFormEditorModalData;