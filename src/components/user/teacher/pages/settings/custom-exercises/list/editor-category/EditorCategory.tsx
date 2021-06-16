import React, {useState} from 'react';
import {Button, Form, message} from "antd";
import ModalEditor from "../../../../../../../../layouts/modal-editor/ModalEditor";
import {FormItem} from "../../../../../../../../lib";
import {SaveOutlined} from "@ant-design/icons";
import {useAppContext} from "../../../../../../../../store/context/use-app-context";

interface EditorCategory {
    fetch: () => void
    category?: any
    title: string
}

const CreateCategory: React.FC<EditorCategory> = ({title, category, children, fetch}) => {
    const {api} = useAppContext();
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false);

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    const submitHandler = async (values: any) => {
        setLoading(true)
        let response;

        try {
            if (category) {
                response = await api.user.patch(`/teacher/custom-exercises-category/${category.id}`, values);
            } else {
                response = await api.user.post('/teacher/custom-exercises-category', values);
            }
            if (response.data.status === 'success') {
                message.success('Вы успешно создали категорию!')
                setLoading(false)
                setVisible(false)
                fetch()
            }
        } catch (e) {
            console.log(e)
            message.error('Неизвестная ошибка!');
            setLoading(false);
        }
    }

    return <>
        <span onClick={open}>
            {children}
        </span>
        <ModalEditor
            title={title}
            visible={visible}
            onCancel={close}
        >
            <Form
                layout="vertical"
                onFinish={submitHandler}
                initialValues={
                    category ? {
                        title: category.title
                    } : {}
                }
            >
                <FormItem
                    name="title"
                    label="Название"
                    requiredMsg="Введите название"
                />
                <div className="actions-block">
                    <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined/>}>Сохранить</Button>
                    <Button onClick={close}>Отмена</Button>
                </div>
            </Form>
        </ModalEditor>
    </>
};

export default CreateCategory;