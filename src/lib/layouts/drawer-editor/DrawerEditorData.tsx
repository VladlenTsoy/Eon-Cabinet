import React, {useState} from 'react';
import {SaveOutlined} from '@ant-design/icons';
import {Form, Button, message} from "antd";
import {DrawerActions} from "lib/components";
import moment from "moment";

interface FormDrawerEditorDataProps {
    data: any;
    close: (data?: any, isFetch?: boolean) => void;
    sendData: (value: any) => void;
    franchise_id?: any;
    group_id?: any;
    isFranchise?: boolean;
}

const usingFormDrawerEditorData = (FormItemsComponent: any) => {
    const FormDrawerEditorData: React.FC<FormDrawerEditorDataProps> = (
        {
            data,
            close,
            sendData,
            ...props
        }
    ) => {
        const [form] = Form.useForm();
        const [loading, setLoading] = useState(false);
        const time = moment().format('hmmsssss');

        const [isSaveBtn, setIsSaveBtn] = useState(false);

        const handleSubmit = async (values: any) => {
            setLoading(true);

            try {
                await sendData(values);

                form.resetFields();
                close(null, true);
            } catch (e) {
                setLoading(false);
                if (e.response)
                    message.error(e.response.data.message);
                else
                    message.error('Неизвестная ошибка!');
            }
        };

        return <>
            <Form
                initialValues={data}
                onFinish={handleSubmit}
                id={`FormDrawerEditorData-${time}`}
                layout="vertical"
                form={form}
            >
                <FormItemsComponent form={form} data={data} setIsSaveBtn={setIsSaveBtn} {...props}/>
            </Form>
            <DrawerActions>
                <Button onClick={close} style={{marginRight: 8}}>
                    Отмена
                </Button>
                {isSaveBtn ?
                    <Button
                        htmlType="submit"
                        loading={loading}
                        type="primary"
                        icon={<SaveOutlined/>}
                        form={`FormDrawerEditorData-${time}`}>
                        Сохранить
                    </Button> : null
                }
            </DrawerActions>
        </>;
    };

    return FormDrawerEditorData;
};

export default usingFormDrawerEditorData;