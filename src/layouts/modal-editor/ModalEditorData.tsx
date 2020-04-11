import React, {useState} from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message } from "antd";

interface FormEditorDataProps {
    data: any;
    close: any;
    sendData: any;
    disciplineId?: any;
    isFranchise?: any;
}

const usingFormEditorModalData = (FormItemsComponent: any) => {
    const FormEditorModalData: React.FC<FormEditorDataProps & FormComponentProps & any> = ({form, data, close, sendData, ...props}) => {
        const [loading, setLoading] = useState(false);

        const handleSubmit = (e: any) => {
            e.preventDefault();
            form.validateFields(async (err: any, values: any) => {
                if (!err) {
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

                }
            });
        };

        return <Form onSubmit={handleSubmit}>
            <FormItemsComponent form={form} {...props}/>
            <div className="actions-block">
                <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
                <Button onClick={close}>Отмена</Button>
            </div>
        </Form>
    };

    return Form.create<FormEditorDataProps & FormComponentProps>({
        name: 'modal-items',
        mapPropsToFields({data}) {
            let a: any = {};
            for (let key in data)
                a[key] = Form.createFormField({value: data[key]});
            return a;
        },
    })(FormEditorModalData);
};

export default usingFormEditorModalData;