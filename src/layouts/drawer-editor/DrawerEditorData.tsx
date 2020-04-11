import React, {useState} from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message } from "antd";
import {DrawerActions} from "../components";
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
    const FormDrawerEditorData: React.FC<FormDrawerEditorDataProps & FormComponentProps> = (
        {
            form,
            data,
            close,
            sendData,
            ...props
        }
    ) => {
        const [loading, setLoading] = useState(false);
        const time = moment().format('hmmsssss');

        const [isSaveBtn, setIsSaveBtn] = useState(false);

        const handleSubmit = (e: any) => {
            e.preventDefault();
            form.validateFields(async (err: any, values: any) => {
                if (!err) {
                    setLoading(true);

                    try {
                        await sendData(values);

                        close(null, true);
                        form.resetFields();
                    } catch (e) {
                        if (e.response)
                            message.error(e.response.data.message);
                        else
                            message.error('Неизвестная ошибка!');
                    }

                    setLoading(false);
                }
            });
        };

        return <>
            <Form onSubmit={handleSubmit} id={`FormDrawerEditorData-${time}`}>
                <FormItemsComponent form={form} data={data} setIsSaveBtn={setIsSaveBtn} {...props}/>
            </Form>
            <DrawerActions>
                <Button onClick={close} style={{marginRight: 8}}>
                    Отмена
                </Button>
                {isSaveBtn ?
                    <Button
                        htmlType="submit"
                        onClick={handleSubmit}
                        loading={loading}
                        type="primary"
                        icon={<SaveOutlined />}
                        form={`FormDrawerEditorData-${time}`}>
                        Сохранить
                    </Button> : null
                }
            </DrawerActions>
        </>;
    };

    return Form.create<FormDrawerEditorDataProps & FormComponentProps>({
        name: 'drawer-items',
        mapPropsToFields({data}) {
            let a: any = {};
            for (let key in data)
                a[key] = Form.createFormField({value: data[key]});
            return a;
        },
    })(FormDrawerEditorData);
};

export default usingFormDrawerEditorData;