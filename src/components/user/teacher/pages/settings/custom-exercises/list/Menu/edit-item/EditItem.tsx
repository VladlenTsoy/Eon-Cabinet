import React, {useState} from 'react';
import {EditOutlined, SaveOutlined} from '@ant-design/icons'
import {Button, Form, Input, Select} from "antd";
import {DrawerActions, FormItem} from "../../../../../../../../../lib";
import {useAppContext} from "../../../../../../../../../store/context/use-app-context";
import DrawerEditor from "../../../../../../../../../layouts/drawer-editor/DrawerEditor";
import Exercises from "../../editor-category/exercises/Exercises";

const {TextArea} = Input
const {Option} = Select

interface EditItemProps {
    record: any;
    pagination: any;
    setUpdateCategoryId: any;
    categories: any[]
    fetch: (pagination: any) => void;
}

const EditItem: React.FC<EditItemProps> = ({record, categories, fetch, pagination, setUpdateCategoryId}) => {
    const {api} = useAppContext();
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    const handlerSubmit = async (values: any) => {
        setLoading(true)
        const response = await api.user.patch(`teacher/custom-exercises/${record.id}`, values)
        if (response.data.status === 'success') {
            setUpdateCategoryId(values.category_id)
            await fetch(pagination)
        }
        setUpdateCategoryId(null)
        setLoading(false)
        close()
    }

    return <>
        <div onClick={open}>
            <EditOutlined/>
            <span>Редактировать</span>
        </div>
        <DrawerEditor
            title="Редактировать"
            visible={visible}
            close={close}
        >
            <Form
                onFinish={handlerSubmit}
                initialValues={{
                    title: record.title,
                    category_id: record.category_id,
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
                    label="Категория"
                    name="category_id"
                    requiredMsg="Выберите категорию"
                >
                    <Select>
                        {categories.map((category) =>
                            <Option value={category.id} key={category.id}>{category.title}</Option>
                        )}
                    </Select>
                </FormItem>
                <FormItem
                    label="Описание"
                    name="description"
                >
                    <TextArea rows={4}/>
                </FormItem>
                <Exercises record={record}/>
                <DrawerActions>
                    <Button onClick={close} style={{marginRight: 8}}>Отмена</Button>
                    <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined/>}>Сохранить</Button>
                </DrawerActions>
            </Form>
        </DrawerEditor>
    </>
};

export default EditItem;