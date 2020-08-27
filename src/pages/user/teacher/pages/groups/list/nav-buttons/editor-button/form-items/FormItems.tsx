import React, {useState} from "react";
import {Select, Form, Button} from "antd";
import {FormItem} from "lib/ui";
import {updateGroup} from "store/access/teacher/group/updateGroup";
import {createGroup} from "store/access/teacher/group/createGroup";
import {Group} from "../../../../../../../../../lib/types/teacher/Group";
import {useTeacherDispatch} from "../../../../../../../../../store/access/teacher/store";
import {useSelectAllCategories} from "../../../../../../../../../store/access/teacher/category/categorySelectors";

const {Option} = Select;

interface FormItemsProps {
    group?: Group;
    close: () => void;
}

const FormItems: React.FC<FormItemsProps> = ({group, close}) => {
    const categories = useSelectAllCategories();
    const [loading, setLoading] = useState(false);
    const dispatch = useTeacherDispatch();

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (group)
            await dispatch(updateGroup({groupId: group.id, data: values}))
        else
            await dispatch(createGroup(values))
        setLoading(false)
        close()
    }

    return <Form
        layout="vertical"
        onFinish={onFinishHandler}
        initialValues={
            group ?
                {
                    title: group.title,
                    category_id: group.category.id,
                } : undefined
        }
    >
        <FormItem
            name="title"
            label="Название"
            requiredMsg="Введите название!"
        />
        <FormItem
            name="category_id"
            label="Категория"
            requiredMsg="Выберите категорию!"
        >
            <Select>
                {
                    categories
                        .map((category) =>
                            <Option key={category.id} value={category.id}>
                                {category.title}
                            </Option>
                        )
                }
            </Select>
        </FormItem>
        <div className="actions-block">
            <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
            <Button onClick={close}>Отмена</Button>
        </div>
    </Form>
};

export default FormItems;