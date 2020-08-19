import React, {useState} from 'react';
import {EditOutlined, SaveOutlined} from '@ant-design/icons'
import ModalEditor from "../../../../../../../../../layouts/modal-editor/ModalEditor";
import {Button, Form, Input} from "antd";
import {FormItem} from "../../../../../../../../../lib";
import {useAppContext} from "../../../../../../../../../store/context/use-app-context";

const {TextArea} = Input

interface EditItemProps {
    record: any;
    fetch: () => void;
}

const EditItem: React.FC<EditItemProps> = ({record, fetch}) => {
    const {api} = useAppContext();
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    const handlerSubmit = async (values: any) => {
        setLoading(true)
        const response = await api.user.patch(`teacher/custom-exercises/${record.id}`, values)
        if (response.data.status === 'success')
            fetch()
        setLoading(false)
        close()
    }

    return <>
        <div onClick={open}>
            <EditOutlined/>
            <span>Редактировать</span>
        </div>
        <ModalEditor
            title="Редактировать"
            visible={visible}
            onCancel={close}
        >
            <Form
                onFinish={handlerSubmit}
                initialValues={{
                    title: record.title,
                    description: record.description,
                }}
                layout="vertical"
            >
                <FormItem
                    label="Название"
                    name="title"
                    requiredMsg="Введите название"
                />
                <FormItem
                    label="Описание"
                    name="description"
                >
                    <TextArea rows={4}/>
                </FormItem>
                <div className="actions-block">
                    <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined/>}>Сохранить</Button>
                    <Button onClick={close}>Отмена</Button>
                </div>
            </Form>
        </ModalEditor>
    </>
};

export default EditItem;